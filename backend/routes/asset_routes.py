# routes/asset_routes.py

import json
import os
from config.blockchain_network_config import GANACHE_RPC_SERVER_URL
from config.contract_address_config import ASSETPURCHASE_CONTRACT_ADDRESS, CONTRACTS_DEPLOY_ADDRESS
from fastapi import APIRouter, Depends, HTTPException
from web3 import Web3
from pydantic import BaseModel

router = APIRouter()

w3 = Web3(Web3.HTTPProvider(GANACHE_RPC_SERVER_URL))

# Create a Pydantic model for the user data
# Needed because cannott pass parameters of singular type (int,bool,str,etc) directly
# It will be interpreted as a query PARAMETER, but i want it to be as a request BODY
# Source: https://stackoverflow.com/questions/59929028/python-fastapi-error-422-with-post-request-when-sending-json-data
class PurchaseData(BaseModel):
    assetID: int
    assetName: str
    assetPrice: int
    receiver: str

with open("./artifacts/AssetPurchase.json", "r") as file:
    fileContent = json.load(file)

# get AssetPurchase ABI from AssetPurchase.json
contract_abi = fileContent["contracts"]["AssetPurchase.sol"]["AssetPurchase"]["abi"]

# Create an instance of the deployed AssetPurchase contract
asset_contract_instance = w3.eth.contract(address=ASSETPURCHASE_CONTRACT_ADDRESS, abi=contract_abi)

# Function to get the user's Ethereum address
def get_user_address():
    return CONTRACTS_DEPLOY_ADDRESS

# Route to record a new purchase transaction
@router.post("/recordPurchase/{asset_id}")
async def recordAssetPurchase(purchaseData: PurchaseData, user_address: str = Depends(get_user_address)):
    print(purchaseData)
    try:
        # Unpack contents here just for easier readability
        asset_id = purchaseData.assetID
        asset_name = purchaseData.assetName
        asset_price = w3.to_wei(purchaseData.assetPrice, "ether")
        receiver = purchaseData.receiver

        # Call the recordPurchase function on the smart contract
        tx_hash = asset_contract_instance.functions.recordPurchase(asset_id, asset_name, asset_price, receiver).transact({"from": user_address})

        # Wait for the transaction to be mined
        w3.eth.wait_for_transaction_receipt(tx_hash)

        return {"message": "Purchase recorded successfully!"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Route to get the total count of purchase transactions for an account
@router.get("/getPurchaseCount/{account}")
async def get_purchase_count(account: str, user_address: str = Depends(get_user_address)):
    try:
        count = asset_contract_instance.functions.getPurchaseCount(account).call({'from': user_address})
        return {"purchase_count": count}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Route to get a specified purchase transaction by its index
@router.get("/getPurchase/{account}/{index}")
async def get_purchase(account: str, index: int, user_address: str = Depends(get_user_address)):
    try:
        asset_name, asset_price, purchased_time, owner = asset_contract_instance.functions.getPurchase(account, index).call({'from': user_address})
        return {
            "asset_name": asset_name,
            "asset_price": asset_price,
            "purchased_time": purchased_time,
            "owner": owner
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
