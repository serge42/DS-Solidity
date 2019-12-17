import SimpleStorage from './contracts/SimpleStorage.json'
// import ComplexStorage from './contracts/ComplexStorage.json'
// import TutorialToken from './contracts/TutorialToken.json'
import SecureTransfer from './contracts/SecureTransfer.json'
import TestContract from './contracts/TestContract.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [SimpleStorage, /* ComplexStorage, TutorialToken, */ SecureTransfer, TestContract],
  events: {
    SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 15000
  }
}

export default options
