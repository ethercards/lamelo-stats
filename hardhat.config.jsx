require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-tracer");

// const config = require("./config.json");
// const OWNER_PRIVATE_KEY = config.pk;

const INFURA_ID = 'e4d8f9fcacfd46ec872c77d66711e1aa';
const OWNER_PRIVATE_KEY = 'b0a09ececd7411c70e96d3ff998086d6e5429bb1af4b2e59793b5b198ecc3dd4';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

/* module.exports = {
  solidity: "0.7.3",
}; */


// const gasPrice = 50000000000; // 50 GWEI
const gasPrice =    2000000000; // 2 GWEI

module.exports = {
  networks: {
    hardhat: {
      gasPrice: gasPrice
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337,
      gasPrice: gasPrice
    },
    ganache: {
      url: 'http://localhost:7545',
      chainId: 1337
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      accounts: [`0x${OWNER_PRIVATE_KEY}`],
      chainId: 1,
      gasPrice: gasPrice
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
      accounts: [`0x${OWNER_PRIVATE_KEY}`],
      chainId: 4,
      gasPrice: gasPrice
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_ID}`,
      accounts: [`0x${OWNER_PRIVATE_KEY}`],
      chainId: 42
    },
  },
  // etherscan: {
  //   url: "https://api-rinkeby.etherscan.io/",
  //   apiKey: "HJFDSKTCKUD4PB8AI48M5RXBDPAVDTCHXG",
  // },
  etherscan: {
    url: "https://api.etherscan.io/",
    apiKey: "HJFDSKTCKUD4PB8AI48M5RXBDPAVDTCHXG",
  },
  solidity: {
    version: "0.7.3",
    compilers: [
      { version: "0.6.6", settings: {} },
      { version: "0.7.5", settings: {} },
      { version: "0.8.0", settings: {} }
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
