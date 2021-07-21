pragma solidity ^0.8.6;
// SPDX-License-Identifier: MIT

contract Ethergift {

    address manager;
    Gift[] giftlist;

    struct Gift {
        bytes32 password;
        uint256 amt;
        bool paid;
    }

    constructor() {
        manager = msg.sender;
    }


    function give(string memory password ) public payable returns( uint256 ) {
        
        Gift memory newgift;
        newgift.password = keccak256(abi.encode(password ));
        
        newgift.paid = false;
        newgift.amt = msg.value;

        giftlist.push(newgift);

        return giftlist.length -1;
        
    }

    function withdraw(uint256 giftNumber, string memory password, address payable to) public {

        require(keccak256(abi.encode(password)) == giftlist[giftNumber].password, "Incorrect password");
        require(giftlist[giftNumber].paid = false);

        giftlist[giftNumber].paid = true;

        to.transfer(giftlist[giftNumber].amt);


    }

    receive() external payable {

    }


}