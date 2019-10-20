const Splitter = artifacts.require("Splitter");
const UserSplitter = artifacts.require("UserSplitter");

module.exports = async function (deployer, network, accounts) {
    const cbiSplitter = accounts[1];

    await deployer.deploy(UserSplitter);
    const tbiSplitter = await UserSplitter.deployed();

    await deployer.deploy(UserSplitter);
    const xsSplitter = await UserSplitter.deployed();

    await deployer.deploy(Splitter);
    const splitter = await Splitter.deployed();

    await splitter.setSplit(40, 40);

    await splitter.setTBIGiver(tbiSplitter.address);
    await splitter.setCBIGiver(cbiSplitter);
    await splitter.setXSGiver(xsSplitter.address);
}
