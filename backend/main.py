import json
import os
from web3 import Web3
import routes.user_routes as user_routes
import routes.asset_routes as asset_routes
import routes.db_routes as db_routes
from config.blockchain_network_config import GANACHE_RPC_SERVER_URL
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Initialize a Web3 instance
w3 = Web3(Web3.HTTPProvider(GANACHE_RPC_SERVER_URL))

# Check if Ganache server is connected
if not w3.is_connected():
    raise HTTPException(status_code=500, detail="Ganache server is not connected.")
else:
    print("Ganache server up and running")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the route modules
app.include_router(user_routes.router, prefix="/api/user")
app.include_router(asset_routes.router, prefix="/api/asset")
app.include_router(db_routes.router, prefix="/api/db")

@app.get("/")
async def ping():
    return "Hello world"