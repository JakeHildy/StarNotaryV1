// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract StarNotary {
    
    string public starName;
    address public starOwner;
    
    event starClaimed(address owner);
    
    constructor()  {
        starName = "Jakes awesome star";
    }
    
    function claimStar() public {
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }

    function changeName(string memory newName) public {
        starName = newName;
    }
}