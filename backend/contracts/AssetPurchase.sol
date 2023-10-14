// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AssetPurchase {
    struct Purchase {
        uint256 tradeID;
        uint256 assetID;
        string assetName;
        uint256 assetPrice;
        uint256 purchasedTime;
        address buyer; 
        address seller;
    }

    mapping(address => Purchase[]) private purchases;

    event PurchaseRecorded(
        uint256 tradeID,
        uint256 assetID,
        string assetName,
        uint256 assetPrice,
        uint256 purchasedTime,
        address indexed buyer,
        address indexed seller
    );

    // Record a new purchase transaction and transfer the asset's price to another account
    function recordPurchase(uint256 _tradeID, uint256 _assetID, string memory _assetName, uint256 _assetPrice, address _seller) external {

        
        Purchase memory purchase = Purchase({
            tradeID: _tradeID,
            assetID: _assetID,
            assetName: _assetName,
            assetPrice: _assetPrice,
            purchasedTime: block.timestamp,
            buyer: msg.sender,
            seller: _seller
        });

        purchases[msg.sender].push(purchase);
        emit PurchaseRecorded(
            _tradeID,
            _assetID,
            _assetName,
            _assetPrice,
            block.timestamp,
            msg.sender,
            _seller
        );
    }

    // Get the total count of purchase transactions made by an account
    function getPurchaseCount() external view returns (uint) {
        return purchases[msg.sender].length;
    }

    // Get all purchase transactions made by an account
    function getAllPurchase() external view returns (Purchase[] memory) {

        return purchases[msg.sender];
    }

    // Get a specified purchase transaction by its index
    function getPurchase(uint index) external view returns (Purchase memory) {

        return purchases[msg.sender][index];
    }
}
