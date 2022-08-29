# Rounding and underflow issues

Currently, pooled Ether and shares can be converted back and forth using `getPooledEthByShares` and `getSharesByPooledEth` functions:

```solidity
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
```

Each of these functions has integer division, which can lead to lost precision (rounding down).
If the conversion is done several times, the error accumulates.

For example, during `submit`, the user's ether first is converted to shares and then, during `balanceOf`, the resulting stETH balance is calculated from shares.

Effectively, making it:
```solidity
userStEthBalance = getPooledEthByShares(getSharesByPooledEth(msg.value))
```

The rounding error depends on the rate (total pooled ether / total stETH shares).
If rate == 1 (total pooled ether == total stETH shares), there is no error.

If the rate goes up slightly, we could solve the problem by adding a multiplier (shares split):

```solidity
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

```

In my undertanding, the rate can be from 0 (apocalyptic slashing) to almost total ETH supply (jackpot MEV).
In that case, no multipliers can help other than making shares rebasable too and rate == 1 (total pooled ether == total stETH shares).





