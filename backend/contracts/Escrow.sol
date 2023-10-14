// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    enum EscrowState { Created, Locked, Released, Canceled }
    
    struct Trade {
        address buyer;
        address seller;
        uint256 assetPrice;
        EscrowState state;
    }
    
    mapping(uint256 => Trade) public trades;
    uint256 public tradeCount;
    
    event TradeCreated(uint256 tradeId, address buyer, address seller, uint256 assetPrice);
    event TradeConfirmed(uint256 tradeId);
    event TradeCanceled(uint256 tradeId);
    
    modifier onlyBuyer(uint256 tradeId) {
        require(msg.sender == trades[tradeId].buyer, "Only the buyer can perform this action");
        _;
    }
    
    modifier onlySeller(uint256 tradeId) {
        require(msg.sender == trades[tradeId].seller, "Only the seller can perform this action");
        _;
    }
    
    modifier inState(uint256 tradeId, EscrowState state) {
        require(trades[tradeId].state == state, "Invalid state for this action");
        _;
    }
    
    constructor() {
        tradeCount = 0;
    }
    
    // Create a trade request
    function createTrade(address _seller) external payable {
        require(msg.value > 0, "Payment must be greater than 0");
        tradeCount++;
        trades[tradeCount] = Trade({
            buyer: msg.sender,
            seller: _seller,
            assetPrice: msg.value,
            state: EscrowState.Created
        });
        emit TradeCreated(tradeCount, msg.sender, _seller, msg.value);
    }
    
    // Both parties agree to the trade so lock it
    function confirmTrade(uint256 tradeId) external inState(tradeId, EscrowState.Created) onlySeller(tradeId) {
        trades[tradeId].state = EscrowState.Locked;
        emit TradeConfirmed(tradeId);
    }
    
    // Upon transaction success, release the held funds to the seller
    function releaseFunds(uint256 tradeId) external inState(tradeId, EscrowState.Locked) onlyBuyer(tradeId) {
        trades[tradeId].state = EscrowState.Released;
        payable(trades[tradeId].seller).transfer(trades[tradeId].assetPrice);
    }
    
    // If transaction fails for some reason, release the held funds back to the buyer (minus the gas fees)
    function cancelTrade(uint256 tradeId) external inState(tradeId, EscrowState.Created) onlyBuyer(tradeId) {
        trades[tradeId].state = EscrowState.Canceled;
        payable(trades[tradeId].buyer).transfer(trades[tradeId].assetPrice);
        emit TradeCanceled(tradeId);
    }
}
