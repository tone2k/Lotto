//import some libraries 

const assert = require('assert');
const ganache = require('ganache-cli');
//use constructor to make instances the web3 library, each instance connects to networks.
const Web3 = require('web3');
//connect to this specific test network on local machine
const web3 = new Web3(ganache.provider());
const {interface , bytecode } = require('../compile');

//Mocha refresher 

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// //runs before next it function

// let car; 

// beforeEach(() => {
//      car = new Car();
// });

// describe('Car', () =>{
//     it('should park', () =>{
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () =>{
//         assert.equal(car.drive(), 'vroom');
//     });
// });
let accounts;
let inbox;
beforeEach(async () =>{
    //Get list of accounts
   accounts = await web3.eth.getAccounts()
        
    //Use account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there!']})
        .send({from: accounts[0], gas: '1000000'})
});

describe('Inbox', () =>{
    it('deploys a contract', () =>{
        console.log(inbox);
    });
});