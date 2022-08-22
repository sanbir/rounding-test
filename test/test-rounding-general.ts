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

    it("b << c", async function () {
        const a = ethers.utils.parseEther('1000')
        const b = ethers.BigNumber.from("1")
        const c = ethers.BigNumber.from("4280329281118175371113977000000")

        const d = await testContract.getD(a, b, c)
        const a1 = await testContract.getA(d, c, b)

        console.log(a.toString())
        console.log(a1.toString())

        expect(a).to.equal(a1)
    })
})
