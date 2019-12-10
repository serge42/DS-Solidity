pragma solidity ^0.5.8;

contract SecureTransfer {

    uint256 price;
    uint256 offer;
    address seller;
    address buyer;
    bool sellerAccept;

    constructor(uint256 _price) public {
        price = _price;
        offer = 0;
        sellerAccept = false;
        seller = msg.sender;
    }

    function makeDeposit(address _buyer) public payable {
        require(_buyer != address(0), "invalide buyer address");
        require(msg.value >= price, "amount is too small");
        buyer = _buyer;
        offer = msg.value;
    }

    function acceptOffer() public {
        require(msg.sender == seller, "");
        require(offer >= price, "can't accept offer below initial price");
        sellerAccept = true;
    }

    function endTransactionBuyer(address payable beneficiary) public {
        require(msg.sender == buyer, "");
        require(sellerAccept, "");

        beneficiary.transfer(offer);
    }

    function endTransaction(address payable beneficiary) public {
        require(msg.sender == seller, "");
        require(sellerAccept, "");
        //require(enough time has passed);
        beneficiary.transfer(offer);
    }

    function checkDeposit() public view returns(uint256) {
        return offer;
    }

    function checkBuyer() public view returns(address) {
        return buyer;
    }
}