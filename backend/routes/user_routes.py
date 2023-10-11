# routes/user_routes.py
import json
from config.blockchain_network_config import GANACHE_RPC_SERVER_URL
from config.contract_address_config import USERACCOUNT_CONTRACT_ADDRESS, CONTRACTS_DEPLOY_ADDRESS
from fastapi import Depends, HTTPException, APIRouter
from web3 import Web3
from pydantic import BaseModel

w3 = Web3(Web3.HTTPProvider(GANACHE_RPC_SERVER_URL))

router = APIRouter()

# Create a Pydantic model for the user data
# Needed because cannott pass parameters of singular type (int,bool,str,etc) directly
# It will be interpreted as a query PARAMETER, but i want it to be as a request BODY
# Source: https://stackoverflow.com/questions/59929028/python-fastapi-error-422-with-post-request-when-sending-json-data
class UserData(BaseModel):
    name: str
    email: str
    biography: str

with open("./artifacts/UserAccount.json", "r") as file:
    fileContent = json.load(file)

# get UserAccount ABI from UserAccount.json
contract_abi = fileContent["contracts"]["UserAccount.sol"]["UserAccount"]["abi"]

# Create an instance of the deployed UserAccount contract
user_contract_instance = w3.eth.contract(address=USERACCOUNT_CONTRACT_ADDRESS, abi=contract_abi)

# Function to get the user's Ethereum address
def get_user_address():
    return CONTRACTS_DEPLOY_ADDRESS

# Route to register user
@router.post("/registerUser")
async def registerUser(userData: UserData, user_address: str = Depends(get_user_address)):
    try:
        # Call the registerUser function
        tx_hash = user_contract_instance.functions.registerUser(userData.name, userData.email, userData.biography).transact({"from": user_address})

        # Wait for the transaction to be mined
        w3.eth.wait_for_transaction_receipt(tx_hash)

        return {"message": "User registered successfully!"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 

# Route to get user info
@router.get("/getUserInfo/{user_address}")
async def readUser(user_address):
    try:
        # Call the getUserInfo function
        user_info = user_contract_instance.functions.getUserInfo().call({'from': user_address})

        # Extract user information
        user_name, user_email, user_biography = user_info

        return {
            "name": user_name,
            "email": user_email,
            "biography": user_biography
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route to update user info
@router.post("/updateUserInfo")
async def updateUser(userData: UserData, user_address: str = Depends(get_user_address)):
    try:
        if(userData.name == ""):
            raise HTTPException(status_code=400, detail="Name cannot be empty")
        
        if(userData.email == ""): 
            raise HTTPException(status_code=400, detail="Email cannot be empty")

        # Call the updateUserInfo function
        tx_hash = user_contract_instance.functions.updateUserInfo(userData.name, userData.email, userData.biography).transact({"from": user_address})

        # Wait for the transaction to be mined
        w3.eth.wait_for_transaction_receipt(tx_hash)

        return {"message": "User information updated successfully!"}
    
    except HTTPException as http_exception:
        raise http_exception  # Re-raise HTTPException with its status code and detail message intact
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
