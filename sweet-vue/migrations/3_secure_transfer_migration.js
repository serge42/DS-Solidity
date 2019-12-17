const SecureTransfer = artifacts.require("SecureTransfer");
const TestContract = artifacts.require("TestContract");
const web3 = require('web3');

module.exports = function(deployer) {
  deployer.deploy(SecureTransfer);
  deployer.deploy(TestContract);
};
