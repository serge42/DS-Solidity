const SecureTransfer = artifacts.require("SecureTransfer");
const web3 = require('web3');

module.exports = function(deployer) {
  deployer.deploy(SecureTransfer, web3.utils.toWei('100', 'ether'));
};
