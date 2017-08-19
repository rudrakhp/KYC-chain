web3 = require('web3');
fs = require('fs');
web3 = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('kyc.sol').toString();
contract = web3.eth.compile.solidity(code);

function after2Delay() {
    contractInstance = kycContract.at(deployedContract.address);
    console.log(contractInstance.address);
}

function afterDelay() {
    kycContract = web3.eth.contract(contract.info.abiDefinition);
    deployedContract = kycContract.new({data: contract.code, from: web3.eth.accounts[0], gas: 4700000});
    setTimeout(after2Delay, 3000);
}

setTimeout(afterDelay, 8000);