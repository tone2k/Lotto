const path = require('path');
//helps build path from current directory to .sol file, we are guranteed crossed platform compatibility

const solc = require('solc');
const fs = require('fs');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
//this will take you from the home directory on machine to inbox and contracts folder.

const source = fs.readFileSync(inboxPath, 'utf8');
//reads raw source code from our contract by creating source using fs module. 

module.exports = solc.compile(source, 1).contracts[':Inbox'];
//exports objects details (contracts property inbox) for direct access.
//return value will always be an object, top level contracts{ inbox...}
//provides bytecode and interface (ABI) - list out all functions that can be called, arguements, return values, etc. 