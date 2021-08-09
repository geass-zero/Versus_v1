const VersusToken = artifacts.require("./contracts/VersusToken.sol");
// const VersusTokenProxy = artifacts.require("./Proxy Contracts/Versus.sol");

const VersusNFT = artifacts.require("./contracts/VersusNFT.sol");
// const VersusNFTProxy = 

module.exports = function (deployer) {
  deployer.deploy(VersusNFT);
};
