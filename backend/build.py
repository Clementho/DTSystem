# BUILD.PY
# Script to compile Solidity smart contract files into json
# Build location is in "artifacts" directory
# Run "python build.py" in terminal/console to build smart contract files

import os, json
from solcx import compile_standard, install_solc

# LIST OF ALL SMART CONTRACT FILES TO COMPILE
contract_files = [
    "./contracts/AssetPurchase.sol",
    "./contracts/UserAccount.sol",
    "./contracts/Escrow.sol"
]

output_dir = "./artifacts"

# make the artifacts direccory if it doesnt exist
os.makedirs(output_dir, exist_ok=True)

install_solc("0.8.0")

# dictionary to store compiled contract artifacts
# name as key, artifact as value
compiled_contracts = {}

print("Compiling contracts....")

# Compile each contract and save the artifacts
for contract in contract_files:
    with open(contract, "r") as file:
        fileContent = file.read()

    base_name = os.path.splitext(os.path.basename(contract))[0]

    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {f"{base_name}.sol": {"content": fileContent}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.8.0",
    )

    # Save the compiled contract artifacts to the output directory
    output_file = os.path.join(output_dir, f"{base_name}.json")
    with open(output_file, "w") as file:
        json.dump(compiled_sol, file)

print("Contract compilation completed.")