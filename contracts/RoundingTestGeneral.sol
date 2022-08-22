// SPDX-License-Identifier: MIT
pragma solidity 0.4.24;
import "./SafeMath.sol";

contract RoundingTestGeneral {
    using SafeMath for uint256;

    function getD(uint256 a, uint256 b, uint256 c) public view returns (uint256) {
        if (c == 0) {
            return 0;
        } else {
            return a
            .mul(b)
            .div(c);
        }
    }

    function getA(uint256 d, uint256 c, uint256 b) public view returns (uint256) {
        if (b == 0) {
            return 0;
        } else {
            return d
            .mul(c)
            .div(b);
        }
    }
}
