const path = require('path');
const solc = require('solc');
const fs = require('fs');

const lottoPath = path.resolve(__dirname, 'contracts', 'Lotto.sol')
const source = fs.readFileSync(lottoPath, 'utf8');


module.exports = solc.compile(source, 1).contracts[':Lotto'];