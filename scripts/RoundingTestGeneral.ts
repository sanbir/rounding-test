import { ethers, getNamedAccounts } from "hardhat"
import {RoundingTestGeneral__factory} from '../typechain-types'

async function main() {
  const { deployer } = await getNamedAccounts()
  console.log(deployer)

  const signer = await ethers.getSigner(deployer)
  const factory = new RoundingTestGeneral__factory(signer)
  const testContract = await factory.deploy()

  try {
      const a = ethers.utils.parseEther('1000')
      const b = ethers.BigNumber.from("1")
      const c = ethers.BigNumber.from("4280329281118175371113977000000")

      const d = await testContract.getD(a, b, c, {gasLimit: 200000})
      const a1 = await testContract.getA(d, c, b, {gasLimit: 200000})
      console.log(a.toString())
      console.log(a1.toString())
  } catch (err: any) {
      console.log(err)
  }

  console.log("Done!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
