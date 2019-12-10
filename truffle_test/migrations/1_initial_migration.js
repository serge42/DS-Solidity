const Notarized = artifacts.require("NotarizedDocument");

module.exports = function(deployer) {
  deployer.deploy(Notarized);
};
