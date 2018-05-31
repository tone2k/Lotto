//import some libraries 

const assert = require('assert');
const ganache = require('ganache-cli');
//use constructor to make instances the web3 library, each instance connects to networks.
const Web3 = require('web3');
//connect to this specific test network on local machine
const web3 = new Web3(ganache.provider());

//Mocha refresher 

class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

//runs before next it function

let car; 

beforeEach(() => {
     car = new Car();
});

describe('Car', () =>{
    it('should park', () =>{
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () =>{
        assert.equal(car.drive(), 'vroom');
    });
});