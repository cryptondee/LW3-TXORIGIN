const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, waffle } = require("hardhat");

describe("attack", function () {
  it("attack.sol will be able to change contract owner", async function () {
    const [_, addr1] = await ethers.getSigners();
    const goodContract = await ethers.getContractFactory("Good");
    const _goodContract = await goodContract.connect(addr1).deploy();
    await _goodContract.deployed();
    console.log(`Good contract address: ${_goodContract.address}`);

    const attackContract = await ethers.getContractFactory("Attack");
    const _attackContract = await attackContract.deploy(_goodContract.address);
    await _attackContract.deployed();
    console.log(`Attack contract address: ${_attackContract.address}`);

    let tx = await _attackContract.connect(addr1).attack();
    await tx.wait();
    expect(await _goodContract.owner()).to.equal(_attackContract.address);
  });
});
