// SPDX-License-Identifier: MIT
pragma solidity 0.4.24;
import "./SafeMath.sol";

contract RoundingTest {
    using SafeMath for uint256;

    uint256 totalShares = 1831;
    uint256 totalPooledEther = 2163;

    uint256 MULTIPLIER = 2;

    function getPooledEthByShares(uint256 _sharesAmount) public view returns (uint256) {
        if (totalShares == 0) {
            return 0;
        } else {
            return _sharesAmount
            .mul(totalPooledEther)
            .div(totalShares)
            .div(MULTIPLIER);
        }
    }

    function getSharesByPooledEth(uint256 _ethAmount) public view returns (uint256) {
        if (totalPooledEther == 0) {
            return 0;
        } else {
            return _ethAmount
            .mul(totalShares)
            .mul(MULTIPLIER)
            .div(totalPooledEther);
        }
    }
}
