//import some libraries 

const assert = require('assert');
const ganache = require('ganache-cli');
//use constructor to make instances the web3 library, each instance connects to networks.
const Web3 = require('web3');
//connect to this specific test network on local machine
const provider = ganache.provider();
const web3 = new Web3(provider);

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
        .send({from: accounts[0], gas: '1000000'});

    inbox.setProvider(provider);
});

//checks for address on contract to validate contract has deployed. 
describe('Inbox', () =>{
    it('deploys a contract', () =>{
    assert.ok(inbox.options.address);
    });
    it('has a default message', async () =>{
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });
    it('can change the message', async () =>{
        await inbox.methods.setMessage('bye.').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye.');
    });
});