// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;
    uint256 public totalReceived;

    event Incremented(address indexed sender, uint256 newCount);
    event Received(address indexed sender, uint256 amount, uint256 newTotal);

    constructor(uint256 _initial) {
        count = _initial;
    }

    // Normal increment (no ETH needed)
    function increment() public {
        count += 1;
        emit Incremented(msg.sender, count);
    }

    // Increment and allow sending ETH
    function incrementWithPayment() public payable {
        require(msg.value > 0, "Must send ETH to use this function");
        count += 1;
        totalReceived += msg.value;
        emit Received(msg.sender, msg.value, totalReceived);
        emit Incremented(msg.sender, count);
    }

    // Read total ETH received by contract
    function getTotalReceived() public view returns (uint256) {
        return totalReceived;
    }

    // Fallback to accept plain ETH transfers (no function call)
    receive() external payable {
        totalReceived += msg.value;
        emit Received(msg.sender, msg.value, totalReceived);
    }
}