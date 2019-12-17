pragma solidity >=0.4.21 <0.6.0;

contract SecureTransfer {

    uint public price;
    // uint public offer;
    address payable public seller;
    address payable public buyer;
    bool public active;
    bool public locked;

    event Abort();
    event Accepted();
    event BuyerEnd();
    event SellerPaid();

    constructor() public payable {
        require(msg.value > 0, "price has to be > 0");
        price = msg.value;
        // offer = 0;
        active = true;
        locked = false;
        seller = msg.sender;
    }

    function makeDeposit() public payable {
        require(msg.sender != address(0), "invalide buyer address");
        require(active && !locked, "An offer has already been accepted or canceld.");
        require(msg.value == 2 * price, "buyer should deposit twice the price.");
        buyer = msg.sender;
        locked = true;
        emit Accepted();
    }

    function confirmReceipt() public payable {
        require(msg.sender == buyer, "can only be called by buyer");
        require(active && locked, "transaction was canceld");
        emit BuyerEnd();
        active = false;
        buyer.transfer(price);
    }

    function refundSeller() public payable {
        require(msg.sender == seller, "can only be called by seller");
        require(!active && locked, "cannot refund a canceld transaction");
        emit SellerPaid();
        locked = false;
        seller.transfer(3 * price);
    }

    function cancelOffer() public payable {
        require(msg.sender == seller, "only seller can cancel.");
        require(active && !locked, "offer has been accepted, or is already canceld.");
        active = false;
        emit Abort();
    }
}