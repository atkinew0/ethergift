const path = require('path');
const fs = require("fs-extra");
const solc = require("solc");

const CONTRACT = "ethergift.sol";

console.log("Compiling contracts...")

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const codepath = path.resolve(__dirname, "contracts", CONTRACT);
const sourcecode = fs.readFileSync(codepath, "utf8");

console.log("Sourcecode is ", sourcecode)

const input = {
    language: 'Solidity',
    sources: {
      'ethergift.sol': {
        content: sourcecode
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

//here do the compilation
const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

for (var contractName in output.contracts['ethergift.sol']) {
    fs.outputJSONSync(
        path.resolve(buildPath, contractName.replace(":", "")+ "json" ),
        output.contracts['ethergift.sol'][contractName].evm.bytecode.object
    )
        
    
}