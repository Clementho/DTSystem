# DEPLOY.PY
# Script to deploy compiled Solidity smart contracts onto a specified blockchain address
# Program will print out the addresses of each deployed smart contract
# Copy them and paste them in each smart contract's CONSTANT VARIABLE in ../config/contract_address_config.py

import os, json
from web3 import Web3

# HARDCODED CONFIGS
GANACHE_RPC_SERVER_URL = "HTTP://127.0.0.1:7545"
CHAIN_ID = 1337
GANACHE_MNEMONIC = "rain promote winner saddle merry merry anchor liberty glimpse nut tourist priority"
CONTRACTS_DEPLOY_ADDRESS = "0xA7cC6ec64a6C9051283C330d19699E25cB2ECEF3"
CONTRACTS_DEPLOY_ADDRESS_PRIVATE_KEY = "0x7b286d6ac232155f32e6d8cd79e4922ba05ddd52e339b6e4281883d57e4cd9d3"

w3 = Web3(Web3.HTTPProvider(GANACHE_RPC_SERVER_URL))

artifacts_dir = "../artifacts"

# List all JSON files in the artifacts folder
artifact_files = [f for f in os.listdir(artifacts_dir) if f.endswith(".json")]

for artifact in artifact_files:
    with open(os.path.join(artifacts_dir, artifact), "r") as file:
        fileContent = json.load(file)

    base_name = os.path.splitext(artifact)[0]

    # get abi from json
    contract_abi = fileContent["contracts"][f"{base_name}.sol"][f"{base_name}"]["abi"]

    # get bytecode from json
    contract_bytecode = fileContent["contracts"][f"{base_name}.sol"][f"{base_name}"]["evm"][
        "bytecode"
    ]["object"]

    # Prepare smart contract deployment transaction
    SmartContract = w3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

    nonce = w3.eth.get_transaction_count(CONTRACTS_DEPLOY_ADDRESS)

    transaction = SmartContract.constructor().build_transaction(
        {
            "chainId": CHAIN_ID,
            "gasPrice": w3.eth.gas_price,
            "from": CONTRACTS_DEPLOY_ADDRESS,
            "nonce": nonce,
        }
    )
    transaction.pop('to')

    # smart contract deployment
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=CONTRACTS_DEPLOY_ADDRESS_PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    print(f"{base_name} - {tx_receipt.contractAddress}")

print("Smart contracts deployed!")