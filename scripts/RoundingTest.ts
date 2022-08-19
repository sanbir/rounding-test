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
    const transactionResponse = await testContract.getPooledEthByShares({gasLimit: 200000})
    await transactionResponse.wait(1)
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
