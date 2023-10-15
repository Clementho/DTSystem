# routes/asset_routes.py

import json
import os
from config.blockchain_network_config import GANACHE_RPC_SERVER_URL, CHAIN_ID
from config.blockchain_address_config import ASSETPURCHASE_CONTRACT_ADDRESS, ESCROW_CONTRACT_ADDRESS, MAIN_USER_ADDRESS, MAIN_USER_ADDRESS_PRIVATE_KEY
from fastapi import APIRouter, HTTPException
from datetime import datetime
from web3 import Web3
from pydantic import BaseModel

router = APIRouter()

w3 = Web3(Web3.HTTPProvider(GANACHE_RPC_SERVER_URL))

# Create a Pydantic model for the user data
# Needed because cannot pass parameters of singular type (int,bool,str,etc) directly
# It will be interpreted as a query PARAMETER, but i want it to be as a request BODY
# Source: https://stackoverflow.com/questions/59929028/python-fastapi-error-422-with-post-request-when-sending-json-data
class PurchaseData(BaseModel):
    assetName: str
    assetPrice: float
    buyer: str
    seller: str

## ASSETPURCHASE.SOL
with open("./artifacts/AssetPurchase.json", "r") as file:
    asset_purchase_file_content = json.load(file)

# get AssetPurchase ABI from AssetPurchase.json
contract_abi = asset_purchase_file_content["contracts"]["AssetPurchase.sol"]["AssetPurchase"]["abi"]

# Create an instance of the deployed AssetPurchase contract
asset_contract_instance = w3.eth.contract(address=ASSETPURCHASE_CONTRACT_ADDRESS, abi=contract_abi)

## ESCROW.SOL
with open("./artifacts/Escrow.json", "r") as file:
    escrow_file_content = json.load(file)

# get Escrow ABI from Escrow.json
escrow_contract_abi = escrow_file_content["contracts"]["Escrow.sol"]["Escrow"]["abi"]

# Create an instance of the deployed Escrow contract
escrow_contract_instance = w3.eth.contract(address=ESCROW_CONTRACT_ADDRESS, abi=escrow_contract_abi)

# Route to handle an asset purchase request
@router.post("/handlePurchase/{asset_id}")
async def handleAssetPurchase(asset_id: int, purchaseData: PurchaseData):
    try:
        # Unpack contents here just for easier readability
        asset_id = int(asset_id)
        asset_name = purchaseData.assetName
        asset_price = w3.to_wei(purchaseData.assetPrice, "ether")
        buyer = purchaseData.buyer
        seller = purchaseData.seller
        nonce = w3.eth.get_transaction_count(MAIN_USER_ADDRESS)

        # Escrow trade created event listener
        escrow_event_filter = escrow_contract_instance.events.TradeCreated.create_filter(fromBlock='latest')

        if w3.eth.get_balance(buyer) < asset_price:
            raise Exception("Insufficient balance to complete the trade.")

        # Create an escrow trade
        create_trade_transaction = escrow_contract_instance.functions.createTrade(seller).build_transaction(
            {
                "chainId": CHAIN_ID,
                "gasPrice": w3.eth.gas_price,
                "value": asset_price,
                "from": buyer,
                "nonce": nonce
            }
        )

        signed_txn = w3.eth.account.sign_transaction(create_trade_transaction, private_key=MAIN_USER_ADDRESS_PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        
        # Wait for the transaction to be mined
        w3.eth.wait_for_transaction_receipt(tx_hash)

        escrow_event_logs = escrow_event_filter.get_new_entries()

        # Capture the trade ID from the emitted event
        trade_id = escrow_event_logs[0]['args']['tradeId']


        # Check if the buyer's balance is sufficient
        if w3.eth.get_balance(buyer) >= asset_price:
            # Confirm the trade using the captured trade ID
            escrow_contract_instance.functions.confirmTrade(trade_id).transact({'from': seller})

            # Release funds from the escrow contract
            escrow_contract_instance.functions.releaseFunds(trade_id).transact({'from': buyer})

            # Record the purchase in the asset purchase contract
            asset_contract_instance.functions.recordPurchase(
                trade_id,
                asset_id,
                asset_name,
                asset_price,
                seller
            ).transact({"from": buyer})

            return {"message": "Asset purchased successfully!"}
        
        else:
            # Cancel the trade
            escrow_contract_instance.functions.cancelTrade(trade_id).transact({'from': buyer})
            raise Exception("Insufficient balance to complete the trade.")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Route to get the total count of purchase transactions for an account
@router.get("/getPurchaseCount/{account_address}")
async def get_purchase_count(account_address: str):
    try:
        count = asset_contract_instance.functions.getPurchaseCount().call({'from': account_address})
        return {"purchaseCount": count}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Route to get all the purchase transactions ever recorded for an account   
@router.get("/getAllPurchase/{account_address}")
async def get_all_purchase(account_address: str):
    try:
        # Call the smart contract function to get all purchase transactions
        purchase_list = asset_contract_instance.functions.getAllPurchase().call({'from': account_address})
        
        # Format returned response to become JSON objects
        # Otherwise will be difficult to call values in the frontend if its accessed by index not by property name
        formatted_purchase_list = []
        for purchase in purchase_list:
            formatted_purchase = {
                "tradeID": purchase[0],
                "assetID": purchase[1],
                "assetName": purchase[2],
                "assetPrice": w3.from_wei(purchase[3], "ether"),  # Convert from wei to ETH
                "purchasedTime": datetime.utcfromtimestamp(purchase[4]).isoformat(),  # Format timestamp
                "buyer": purchase[5],
                "seller": purchase[6]
            }
            formatted_purchase_list.append(formatted_purchase)

        return {"purchaseList": formatted_purchase_list}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Route to get a specified purchase transaction by its index
@router.get("/getPurchase/{account_address}/{index}")
async def get_purchase(account_address: str, index: int):
    try:
        # Call the smart contract function to get a specified purchase transaction
        purchase = asset_contract_instance.functions.getPurchase(index).call({'from': account_address})

        # Format the response
        formatted_purchase = {
            "tradeID": purchase[0],
            "assetID": purchase[1],
            "assetName": purchase[2],
            "assetPrice": w3.from_wei(purchase[3], "ether"),  # Convert from wei to ETH
            "purchasedTime": datetime.utcfromtimestamp(purchase[4]).isoformat(),  # Format timestamp
            "buyer": purchase[5],
            "seller": purchase[6]
        }

        return { "purchase": formatted_purchase }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
