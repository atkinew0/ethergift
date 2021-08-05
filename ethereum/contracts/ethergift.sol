pragma solidity ^0.8.6;
// SPDX-License-Identifier: MIT

contract Ethergift {

    address manager;
    uint256 maxcontrib;   //in test version limit gifts to .01 ETH ( 10000000000000000 wei)
    Gift[] public giftlist;

    struct Gift {
        bytes32 password;
        uint256 amt;
        bool paid;
    }

    event Deposit(address indexed from, uint256 giftNumber);

    constructor(uint256 max) {
        maxcontrib = max;
        manager = msg.sender;
    }


    function give(string memory password ) public payable  {

        require(msg.value <= maxcontrib, "In test version cannot contribute more than maxcontrib Eth ");
        
        Gift memory newgift;
        newgift.password = keccak256(abi.encode(password ));
        
        newgift.paid = false;
        newgift.amt = msg.value;

        giftlist.push(newgift);

        emit Deposit(msg.sender, giftlist.length -1);
        
    }

    function withdraw(uint256 giftNumber, string memory password, address payable to) public {

        require(keccak256(abi.encode(password)) == giftlist[giftNumber].password, "Incorrect password");
        require(giftlist[giftNumber].paid == false);

        giftlist[giftNumber].paid = true;

        to.transfer(giftlist[giftNumber].amt);


    }

    receive() external payable {

    }


}