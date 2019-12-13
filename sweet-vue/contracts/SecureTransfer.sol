pragma solidity >=0.4.21 <0.6.0;

contract SecureTransfer {

    uint public price;
    uint public offer;
    address payable public seller;
    address public buyer;
    bool public sellerAccept;

    constructor() public {
        price = 0;
        offer = 0;
        sellerAccept = false;
        seller = msg.sender;
    }

    function setPrice(uint _price) public {
        require(msg.sender == seller, "price can only be set by seller");
        require(_price > 0, "price should be larger than 0");
        require(!sellerAccept, "an offer has already been accepted");
        price = _price;
    }

    function makeDeposit(uint amt) public payable {
        require(msg.sender != address(0), "invalide buyer address");
        require(price > 0 && amt >= price && amt > offer, "amount is too small");
        require(!sellerAccept, "An offer has already been accepted");
        buyer = msg.sender;
        offer = amt;
    }

    function acceptOffer() public {
        require(msg.sender == seller, "only seller can accept an offer");
        require(price > 0 && offer >= price, "can't accept offer below initial price");
        sellerAccept = true;
    }

    function endTransactionBuyer(address payable beneficiary) public {
        require(msg.sender == buyer, "only buyer can use this");
        require(seller == beneficiary, "beneficiary has to be == seller");
        require(sellerAccept, "seller has to accept the offer first");

        beneficiary.transfer(offer);
    }

    function endTransaction(address payable beneficiary) public {
        require(msg.sender == seller, "only seller can use this");
        require(sellerAccept, "seller has to accept the offer first");
        //require(enough time has passed, "has to wait longer");
        beneficiary.transfer(offer);
    }

    // function checkDeposit() public view returns (uint) {
    //     return offer;
    // }

    // function checkBuyer() public view returns (address) {
    //     return buyer;
    // }
}