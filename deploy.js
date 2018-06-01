//provider that which will specify the network to connect to and the accounts to use. 
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');


//set provider to new instance with two arguments, account pneumonic and network URL
const provider = new HDWalletProvider(
    ‘grape economy stand shoe gentle dove load property swap scene meadow brain’,
    'https://rinkeby.infura.io/UlvBieevamkPWqB0vIyT'
);

//takes provider, passes it to Web3 constructor and creates new instance of web3 enabled for unlocked rinkbey network
const web3 = new Web3(provider);