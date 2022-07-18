const { expect } = require('chai')

// run the test
// npx hardhat test ./test/N4-Padlock-medium.js
describe('CTF #4 Padlock', function () {
  before(async function () {
    ;[deployer] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('N4Padlock')
    challengeInstance = await Challenge.deploy({ value: ethers.utils.parseEther('0.0001') })
    await challengeInstance.deployed()
  })

  it('Should recover all funds', async function () {
    // Your code goes here

    await challengeInstance.pick1(420)
    console.log(await challengeInstance.tumbler1())

    await challengeInstance.pick2({ value: 33 })
    console.log(await challengeInstance.tumbler2())

    await challengeInstance.pick3('0x69420000000000000000000000000000')
    console.log(await challengeInstance.tumbler3())

    await challengeInstance.recoverFunds()

    expect(await ethers.provider.getBalance(challengeInstance.address)).to.equal('0')
  })
})
