import json
from web3 import Web3
from config.blockchain_network_config import GANACHE_RPC_SERVER_URL
from config.blockchain_address_config import USERACCOUNT_CONTRACT_ADDRESS, MAIN_USER_ADDRESS, SELLER_ADDRESS

w3 = Web3(Web3.HTTPProvider(GANACHE_RPC_SERVER_URL))

with open("./artifacts/UserAccount.json", "r") as file:
    fileContent = json.load(file)

# get UserAccount ABI from UserAccount.json
contract_abi = fileContent["contracts"]["UserAccount.sol"]["UserAccount"]["abi"]

# Create an instance of the deployed UserAccount contract
user_contract_instance = w3.eth.contract(address=USERACCOUNT_CONTRACT_ADDRESS, abi=contract_abi)

users_to_register = [
    {
        "name": "SeltradeX", 
        "email": "seltradeX@gmail.com", 
        "biography": "Hey there, I'm Max – your friendly neighborhood NFT and crypto explorer! Join me on my exhilarating journey through the NFT cosmos and the crypto universe – where pixels meet prosperity, and innovation knows no bounds.", 
        "address": MAIN_USER_ADDRESS 
    },
    {
        "name": "s1MR4ndOmNFT", 
        "email": "s1MR4ndOmNFT@example.com", 
        "biography": "I sell stuff",
        "address": SELLER_ADDRESS 
    },
]

for user in users_to_register:
    try:
        # Call the registerUser function
        tx_hash = user_contract_instance.functions.registerUser(user["name"], user["email"], user["biography"]).transact({"from": user["address"]})

        # Wait for the transaction to be mined
        w3.eth.wait_for_transaction_receipt(tx_hash)

        print(f"Account [{user['name']}] initialized at Address <{user['address']}>")

    except Exception as e:
        print("User already registered")