import json
import os
from config.blockchain_network_config import GANACHE_RPC_SERVER_URL
from fastapi import FastAPI, HTTPException
from web3 import Web3
import user_routes, asset_routes

# Initialize a Web3 instance
w3 = Web3(Web3.HTTPProvider(GANACHE_RPC_SERVER_URL))

# Check if Ganache server is connected
if not w3.is_connected():
    raise HTTPException(status_code=500, detail="Ganache server is not connected.")
else:
    print("Ganache server up and running")

app = FastAPI()

# Include the route modules
app.include_router(user_routes.router, prefix="/api/user")
app.include_router(asset_routes.router, prefix="/api/asset")
