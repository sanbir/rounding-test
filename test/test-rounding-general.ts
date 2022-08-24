import { expect } from "chai"
import {ethers, getNamedAccounts} from "hardhat"
import {RoundingTestGeneral, RoundingTestGeneral__factory} from '../typechain-types'

describe("RoundingTestGeneral", function () {
    let testContract: RoundingTestGeneral
    let factory: RoundingTestGeneral__factory

    before(async () => {
        const { deployer } = await getNamedAccounts()
        const signer = await ethers.getSigner(deployer)
        factory = new RoundingTestGeneral__factory(signer)
        testContract = await factory.deploy()
    })

    it("b == c", async function () {
        const a = ethers.utils.parseEther('1000')
        const b = ethers.BigNumber.from("4280329281118175371113977000000")
        const c = ethers.BigNumber.from("4280329281118175371113977000000")

        const d = await testContract.getD(a, b, c)
        const a1 = await testContract.getA(d, c, b)

        expect(a).to.equal(a1)
    })

    it("numDigits", async function () {
        const a = ethers.BigNumber.from("1")
        const b = ethers.BigNumber.from("12345")
        const c = ethers.BigNumber.from("1000000000")

        const aDigits = await testContract.numDigits(a)
        expect(aDigits).to.equal(1)

        const bDigits = await testContract.numDigits(b)
        expect(bDigits).to.equal(5)

        const cDigits = await testContract.numDigits(c)
        expect(cDigits).to.equal(10)
    })

    it("getShift", async function () {
        const b = ethers.BigNumber.from("12345")
        const c = ethers.BigNumber.from("1000000000")

        const shift = await testContract.getShift(b, c)
        expect(shift).to.equal(-5)
    })

    it("b << c", async function () {
        const a = ethers.utils.parseEther('10')
        const b = ethers.BigNumber.from("3954885183194715680671922")
        const c = ethers.BigNumber.from("42803292811181753711139770")

        const d = await testContract.getD(a, b, c)
        const a1 = await testContract.getA(d, c, b)

        // console.log(a.toString())
        // console.log(a1.toString())

        expect(a).to.equal(a1)
    })
})
