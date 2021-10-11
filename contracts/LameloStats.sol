//SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.0 <0.8.0;

import "./BytesLib.sol";
import "hardhat/console.sol";

contract LameloStats {

    using BytesLib for bytes; 

    mapping(uint256 => bytes) stats;
    uint256 public statsCount = 0;

    /**
     * Receive the response in the form of bytes[]
     */ 

    // "0x1234567890123456789012345678901234567890012345678901234567890123", "0x6177617900ffffffff000100020003000400050006000700080009000a000b000c000d000e000f00100011"
    // gas: 112048
    function fulfill(bytes32 _requestId, bytes memory _data) public
    {
        stats[++statsCount] = _data;
    }

    function getStats(uint256 _id) public view returns (bytes memory) {
        return stats[_id];
    }

    function getHomeOrAway(uint256 _id) public view returns (bool) {
        return ( stats[_id].slice(0, 1).toUint8(0) == 1);
    }

    function IsGameOver(uint256 _id) public view returns (bool) {
        return ( stats[_id].slice(1, 1).toUint8(0) == 1);
    }

}