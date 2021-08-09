const path = require("path");
require("dotenv").config({path: `${__dirname}/.env`});
const HDWalletProvider = require("./node_modules/@truffle/hdwallet-provider");

const accountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "artifacts"),
  networks: {
    develop: {
      host: "localhost",
      port: 7545,
      network_id: "5777"
    },
    ganache: {
      provider: function () {
        return new HDWalletProvider(process.env.DEVMNEMONIC, "http://127.0.0.1:7545", accountIndex)
      },
      network_id: 5777
    },
    goerli_infura: {
      provider: function () {
        return new HDWalletProvider(process.env.DEVMNEMONIC, "https://goerli.infura.io/v3/83301e4b4e234662b7769295c0f4a2e1", accountIndex)
      },
      network_id: 5,
      skipDryRun: true
    },
    ropsten_infura: {
      provider: function () {
        return new HDWalletProvider(process.env.DEVMNEMONIC, "https://ropsten.infura.io/v3/6162d64a9204425eb2dbe20e893c85d0", accountIndex)
      },
      network_id: 3,
      skipDryRun: true
    },
    mainnet_infura: {
      provider: function () {
        return new HDWalletProvider(process.env.DEVMNEMONIC, "https://mainnet.infura.io/v3/6162d64a9204425eb2dbe20e893c85d0", accountIndex)
      },
      network_id: 1,
      skipDryRun: true,
      gasPrice: 70000000000
    },
    bsc: {
      provider: () => new HDWalletProvider(process.env.DEVMNEMONIC, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc_testnet: {
      provider: () => new HDWalletProvider(process.env.DEVMNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545/`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    bscscan: process.env.BSCSCANAPIKEY
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
