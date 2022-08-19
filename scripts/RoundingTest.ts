import { Signer } from "ethers"
import { ethers, getNamedAccounts, deployments } from "hardhat"
import {RoundingTest__factory} from '../typechain-types/factories/RoundingTest__factory'

async function main() {
  const { deployer } = await getNamedAccounts()
  console.log(deployer)

  const signer = await ethers.getSigner(deployer)
  const factory = new RoundingTest__factory(signer)
  const testContract = await factory.deploy()

  try {
      const amount = ethers.utils.parseEther('10')
      const result = await testContract.getPooledEthByShares(amount, {gasLimit: 200000})
      const result2 = await testContract.getSharesByPooledEth(result, {gasLimit: 200000})
      console.log(amount.toString())
      console.log(result2.toString())
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
