const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiled = require('./build/Ethergift.json');
const config = require('../config.json');

if(Web3.utils.isAddress(config.contract_address)){
    console.log(`CANNOT DEPLOY: Contract already deployed at address ${config.contract_address} to deploy new contract, set contract_address to \"\" (empty string) in config.json  then run deploy` );
    process.exit();
}

//we are using a free infura account to deploy our contract
const provider = new HDWalletProvider(
    config.mnemonic,
    config.infuraAPI
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0])

    const result = await new web3.eth.Contract(compiled.abi)
    .deploy({data:compiled.evm.bytecode.object, arguments:[web3.utils.toWei(".1","ether")] })
    .send({ gas: '1000000', from: accounts[0]})


    console.log("Contract deployed to", result.options.address);

};
deploy();