const SecureTransfer = artifacts.require("SecureTransfer");
// const web3 = require('web3');

module.exports = function(deployer) {
  deployer.deploy(SecureTransfer, { value: 100 });
};
