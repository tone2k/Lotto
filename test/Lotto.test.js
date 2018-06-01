const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

//ABI and Bytecode Object
const {interface, bytecode} = require('../compile');

let lotto;
let accounts;

beforeEach(async () =>{
    accounts = await web3.eth.getAccounts();

    lotto = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Lotto Contract', () =>{
    it('deploys a contract', () =>{
        assert.ok(lotto.options.address);
    });
});