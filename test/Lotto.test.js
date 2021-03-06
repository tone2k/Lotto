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
    it('allows an account to enter', async () =>{
        await lotto.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        const players = await lotto.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });
    it('allows mutiple accounts to enter', async () => {
        await lotto.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lotto.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lotto.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lotto.methods.enter().send({
            from: accounts[3],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lotto.methods.enter().send({
            from: accounts[4],
            value: web3.utils.toWei('0.02', 'ether')
        });
        const players = await lotto.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(accounts[3], players[3]);
        assert.equal(accounts[4], players[4]);
        assert.equal(5, players.length);
    });
    it('requires a minimum amount of ether to enter', async () => {
       try { 
        await lotto.methods.enter().send({
            from: accounts[0],
            value: 0
        });
        assert(false);
       } catch(err) {
            assert(err);
        }
    });
    it('should only allow the manager to pick winner', async () =>{
        try {
            await lotto.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch(err) {
            assert(err);
        }
    });
    it('sends money to winner and resets', async () =>{
        //enter a player into the contract 
        await lotto.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });
        //set the initial balance to the balance of an player account 
        const intialBalance = await  web3.eth.getBalance(accounts[0]);

        //pick a winner in the contract and send back balance
        await lotto.methods.pickWinner().send({from: accounts[0]});

        //set the final balance to the balance of the player account
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        console.log(finalBalance - intialBalance);
        //compare the difference between initial and final
        const difference  = finalBalance - intialBalance;
        assert(difference > web3.utils.toWei('1.8', 'ether'));
    })
});