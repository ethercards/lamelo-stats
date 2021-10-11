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
    function fulfill(bytes32 _requestId, bytes memory _data) public
    {
        stats[++statsCount] = _data;
    }

    function getStats(uint256 _id) public view returns (bytes memory) {
        return stats[_id];
    }

    function getHomeOrAway(uint256 _id) public view returns (bytes memory) {
        return stats[_id].slice(0, 4);
    }

    function IsGameOver(uint256 _id) public view returns (bool) {
        return ( stats[_id].slice(4, 1).toUint8(0) == 1);
    }

}