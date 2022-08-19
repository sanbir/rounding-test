// SPDX-License-Identifier: MIT
pragma solidity 0.4.24;
import "./SafeMath.sol";

contract RoundingTest {
    using SafeMath for uint256;

    uint256 totalShares = 3954885183194715680671922;
    uint256 totalPooledEther = 4280329281118175371113977;

    function getPooledEthByShares(uint256 _sharesAmount) public view returns (uint256) {
        if (totalShares == 0) {
            return 0;
        } else {
            return _sharesAmount
            .mul(totalPooledEther)
            .div(totalShares);
        }
    }

    function getSharesByPooledEth(uint256 _ethAmount) public view returns (uint256) {
        if (totalPooledEther == 0) {
            return 0;
        } else {
            return _ethAmount
            .mul(totalShares)
            .div(totalPooledEther);
        }
    }
}
