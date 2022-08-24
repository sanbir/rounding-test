// SPDX-License-Identifier: MIT
pragma solidity 0.4.24;
import "./SafeMath.sol";

contract RoundingTestGeneral {
    using SafeMath for uint256;

    function getA(uint256 d, uint256 c, uint256 b) public view returns (uint256) {
        if (b == 0) {
            return 0;
        } else {
            uint8 bDigits = numDigits(b);
            uint8 cDigits = numDigits(c);

            uint256 dc = d.mul(c);

            uint256 dc1;
            uint256 shift;
            if (bDigits > cDigits) {
                shift = bDigits - cDigits;
                dc1 = dc << shift;
            } else if (cDigits > bDigits) {
                shift = cDigits - bDigits;
                dc1 = dc >> shift;
            }

            uint256 a1 = dc1.div(b);
            return a1;
        }
    }

    function getD(uint256 a, uint256 b, uint256 c) public view returns (uint256) {
        if (c == 0) {
            return 0;
        } else {
            uint8 bDigits = numDigits(b);
            uint8 cDigits = numDigits(c);

            uint256 ab = a.mul(b);

            uint256 ab1;
            uint256 shift;
            if (bDigits > cDigits) {
                shift = bDigits - cDigits;
                ab1 = ab >> shift;
            } else if (cDigits > bDigits) {
                shift = cDigits - bDigits;
                ab1 = ab << shift;
            }

            uint256 d = ab1.div(c);
            return d;
        }
    }

    function getShift(uint256 b, uint256 c) public view returns (int16) {
        int16 bDigits = numDigits(b);
        int16 cDigits = numDigits(c);

        return bDigits - cDigits;
    }

    function numDigits(uint256 number) public view returns (uint8) {
        uint8 digits = 0;
        while (number != 0) {
            number /= 10;
            digits++;
        }
        return digits;
    }
}
