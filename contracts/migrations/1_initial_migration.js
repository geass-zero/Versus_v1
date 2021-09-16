const VersusToken = artifacts.require("./contracts/VersusToken.sol");
// const VersusTokenProxy = artifacts.require("./Proxy Contracts/Versus.sol");
const SpotBattle = artifacts.require("./contracts/SpotBattle.sol");
const VersusNFT = artifacts.require("./contracts/VersusNFT.sol");
const MonsterList = artifacts.require("./contract/MonsterList.sol");
// const VersusNFTProxy = 

module.exports = function (deployer) {
  deployer.deploy(SpotBattle);
};
