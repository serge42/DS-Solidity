import SimpleStorage from './contracts/SimpleStorage.json'
import ComplexStorage from './contracts/ComplexStorage.json'
import TutorialToken from './contracts/TutorialToken.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [SimpleStorage, ComplexStorage, TutorialToken],
  events: {
    SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 15000
  }
}

export default options

// (0) 0xa3d6beb6c667655c057267f3fd3811489aa149f0f3226b0a22a2eb0b9f526420
// (1) 0xff370470deaeb999facaef0c25f837017ed96f028053aa57643431065fd8c334
// (2) 0xb85674ce3e07a2b19edcebdcc4e129a92f322d2bc96ae6b1b8711e25d2def7c0
// (3) 0x9d186935d42e6696688d8c4084e62395c3cb96aad61313ae72ce99519acac952
// (4) 0xf854ace2a7bf0496e34cb4d3f0575d155179819db9ad561f79baa6977c1376f8
// (5) 0x64f6cefb5c89c57a686370baa819e8962a8e45d6d245f160b1cf163c4cb417df
// (6) 0x7e803904061d45744ff16e87c93c34797d5ee3519793803781c944ea0d95126d
// (7) 0x7641d950228da981155928ed433292feb876cc1ed1f23bb7154a88ba1f4feb98
// (8) 0xd88eada3ae9209f925692c31ac34ae8325321bb5cf5ecc6b4604d9f8f1a1c0dd
// (9) 0x21e5a9fa4c4c36b7ffb543f537779d6ff3692e62ac7b221092ba6890d694ea42