// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AssetPurchase {
    struct Purchase {
        uint256 assetID;
        string assetName;
        uint256 assetPrice;
        uint256 purchasedTime;
        address owner; // Store the owner's address
    }

    mapping(address => Purchase[]) private purchases;

    event PurchaseRecorded(address indexed user, string assetName, uint256 assetPrice, uint256 purchasedTime);

    // Record a new purchase transaction and transfer the asset's price to another account
    function recordPurchase(uint256 _assetID, string memory _assetName, uint256 _assetPrice, address _receiver) public {
        require(msg.sender.balance >= _assetPrice, "Insufficient balance"); // Check the sender's balance
        require(_receiver != address(0), "Invalid receiver address"); // No receiver address means no one to actually make the payment to

        // Transfer the asset's price to the receiver
        payable(_receiver).transfer(_assetPrice);

        Purchase memory purchase = Purchase({
            assetID: _assetID,
            assetName: _assetName,
            assetPrice: _assetPrice,
            purchasedTime: block.timestamp,
            owner: msg.sender // Set the buyer as the new owner
        });
        purchases[msg.sender].push(purchase);
        emit PurchaseRecorded(msg.sender, _assetName, _assetPrice, block.timestamp);
    }

    // Get the total count of purchase transactions made by an account
    function getPurchaseCount(address account) public view returns (uint) {
        return purchases[account].length;
    }

    // Get a specified purchase transaction by its index
    function getPurchase(address account, uint index) public view returns (string memory, uint256, uint256, address) {
        Purchase memory purchase = purchases[account][index];
        return (purchase.assetName, purchase.assetPrice, purchase.purchasedTime, purchase.owner);
    }
}
