# HyperETH: Decentralized NFT Trading Platform

HyperETH is a decentralized trading platform designed to transform the peer-to-peer trading of digital assets, specifically Non-Fungible Tokens (NFTs). Built on blockchain technology and leveraging smart contracts, HyperETH prioritizes security, transparency, and a seamless user experience. By eliminating intermediaries, it enables trustless and efficient transactions while upholding the principles of decentralization.

This project is developed for **learning purposes only** and serves as a simulation of real-world blockchain transactions. All Ethereum blockchain configurations and transaction accounts are hardcoded to replicate blockchain functionality in a controlled environment.

## Languages, Libraries & Frameworks
<img src="https://skillicons.dev/icons?i=html,css,js,react,tailwind,materialui,py,fastapi,solidity&perline=10" alt="Languages, Libraries and Frameworks" />

## Tools & Services
<img src="https://skillicons.dev/icons?i=ai,ps,xd,anaconda,mysql&perline=10" alt="Tools and Services" />

## Design & Prototyping
The initial UI/UX design for HyperETH was created in Adobe XD. You can view the design prototype here:  
[🔗 View Adobe XD Prototype](https://xd.adobe.com/view/2211c85e-4f93-4a8b-9b69-dd05ba73a74f-7742/)

## Key Features & Modules
* **Asset Discovery**: Easily browse and view digital assets available for trading. This feature simplifies asset exploration, making it convenient for users to find items of interest.
* **Search and Filter Functionality**: Robust search and filter options allow users to pinpoint specific assets based on preferences, enhancing the overall user experience.
* **Smart Contract Escrow**: Smart contracts act as escrow agents during trades, ensuring the security of assets by holding them in escrow until a trade is successfully completed or canceled.
* **Transaction History**: Users can access a detailed transaction history to review and track their trading activities, adding transparency and improving usability.

## Prerequisites
* [Ganache](https://archive.trufflesuite.com/ganache/)
* Python 3.11.5

## Installation & Setup Guide

### SQL Database Setup
An existing SQL dump file can be found in `backend/db_setup/dtsystem_db.sql`.

<br/>

### Ganache Ethereum Workspace Setup
This section specifies how to setup a local Ganache Ethereum workspace:
1. Open the file `backend/config/blockchain_network_config.py` & copy the contents of **GANACHE_MNEMONIC**
2. Launch [Ganache](https://archive.trufflesuite.com/ganache/) & select `New Workspace - Ethereum`
3. Navigate to `Accounts & Keys` and paste the copied mnemonic
4. Click `Start` to finish creating the Ethereum workspace.

**Note:** The guide above is intended for users who are new to Ganache and setting up local Ethereum workspaces. The **MNEMONIC** is a series of unique keywords used to recreate the exact blockchain environment used during the project's development. If you are already familiar with using Ganache and configuring Ethereum workspaces, feel free to follow your own setup process.

<br/>

### Smart Contract Build & Deployment
This section specifies how to setup the application’s Python backend, build and deploy smart contracts, and perform any remaining initialization steps onto the local Ethereum blockchain by executing the respective python scripts.
1. Install the required Python dependencies from the `backend/requirements.txt` file:
    ```bash
    $ pip install -r requirements.txt
    ```

2. Compile & build the smart contract JSON artifacts:
    ```bash
    $ python build.py
    ```

3. Deploy the smart contracts onto the local Ethereeum blockchain on Ganache:
    ```bash
    $ python deploy.py
    ```

4. Once the script finishes the deployment, it will output the smart contract’s addresses on the local Ethereum blockchain. Copy each address and replace the following constant variables in `backend/config/blockchain_address_config.py`:
    * `ASSETPURCHASE_CONTRACT_ADDRESS`
    * `ESCROW_CONTRACT_ADDRESS`
    * `USERACCOUNT_CONTRACT_ADDRESS`

<br/>

### Application Accounts Setup
1. Two user accounts will be created for the purpose of simulating transactions on the platform. To create them, execute the following script from the terminal:
    ```bash
    $ python init_users.py
    ```
<br/>

### React Frontend Setup
1. Navigate to `frontend` & install the application's React frontend NPM packages:
    ```bash
    $ npm install
    ```
<br/>

## Usage Guide
1. Open up 2 terminal/console windows, each in the `frontend` and `backend` directories respectively:
2. To start the Python backend server:
    ```bash
    $ uvicorn main:app --reload
    ```
3. To start the React frontend:
    ```bash
    $ npm start
    ```

## Disclaimer
This project is a prototype for educational purposes only. It does not implement a payment gateway, and no real funds or assets are exchanged on the platform. All asset listings and transactions are mock implementations and do not reflect actual NFTs or real-world marketplaces.

While the platform is designed to simulate blockchain interactions, it is not intended for production use or actual NFT trading. Always use caution and verify platforms when engaging in real blockchain transactions.
