const path = require('path')
module.exports = {
  
  networks: {
    development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*",
    }
  },

  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "vapp/src/contracts"),

};
