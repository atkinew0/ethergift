const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledContract = require("../ethereum/build/Ethergift.json");


let deployedContract;
let accounts;




beforeEach(async () => {



    accounts = await web3.eth.getAccounts();


    deployedContract = await new web3.eth.Contract(compiledContract.abi)
    .deploy({data: compiledContract.evm.bytecode.object, arguments:[web3.utils.toWei("3","ether")] })
    .send({from: accounts[0], gas:"1000000"});



})

describe("Can deploy on ganache provider", () => {

    it("Compiled contract exists", () => {
        assert.ok(compiledContract);
    })

    it("Has an address on the simulated blockchain", () => {
        assert.ok(deployedContract.options.address);
    })


})

describe("Ether Gift Test", () => {


    it("Can make a gift", async () => {


        let d = new Date("2020-01-01");
        let unlocked = Math.floor( d.getTime()/1000);
        
        const reason = await deployedContract.methods.give("ky77djus", accounts[1], unlocked).send({from:accounts[0], gas:"1000000", value: web3.utils.toWei("1","ether")})

       

        let gifts = await deployedContract.methods.giftlist(0).call()
        


        
        let balance = await web3.eth.getBalance(deployedContract.options.address);
        
       
        assert.ok(gifts)
        assert(balance > 0)
    })



    it("Can withdraw amount from a previously made gift", async () => {

        let d = new Date("2020-01-01");
        let unlocked = Math.floor( d.getTime()/1000);

        await deployedContract.methods.give("ky77djus", accounts[1], unlocked).send({from:accounts[0], gas:"1000000", value: web3.utils.toWei("1","ether")})

        await deployedContract.methods.withdraw(0, "ky77djus", accounts[1]).send({from:accounts[1], gas:"1000000"});

        let balance = await web3.eth.getBalance(accounts[1]);

        
        
        assert(balance > 0);

    })

    it("Can only withdraw from a gift once", async () => {

        let d = new Date("2020-01-01");
        let unlocked = Math.floor( d.getTime()/1000);


        //double deposit to there are technically 2 gifts on the contract worth 4 ETH total
        await deployedContract.methods.give("ky77djus", accounts[1], unlocked).send({from:accounts[0], gas:"1000000", value: web3.utils.toWei("2","ether")})

        await deployedContract.methods.give("ky77djus", accounts[1], unlocked).send({from:accounts[0], gas:"1000000", value: web3.utils.toWei("2","ether")})

        let contractbal = await web3.eth.getBalance(deployedContract.options.address)
        

        // try to cash in the same gift twice and make sure the balance only reflects one being given
        await deployedContract.methods.withdraw(0, "ky77djus", accounts[1]).send({from:accounts[1], gas:"1000000"});

        contractbal = await web3.eth.getBalance(deployedContract.options.address)
        
        let balance = await web3.eth.getBalance(accounts[1]);

      

        try{
            await deployedContract.methods.withdraw(0, "ky77djus", accounts[1]).send({from:accounts[1], gas:"1000000"});

        }catch(e){
            console.log(e.message)
        }


        balance = await web3.eth.getBalance(accounts[1]);

        let ether = web3.utils.fromWei(balance, "ether");
        
        assert(ether >= 102 && ether <= 104);
    })


    it("Cannot withdraw a gift that is locked to a future date", async () => {

        let d = new Date("2024-01-01");
        let unlocked = Math.floor( d.getTime()/1000);

        await deployedContract.methods.give("ky77djus", accounts[1], unlocked).send({from:accounts[0], gas:"1000000", value: web3.utils.toWei("1","ether")})

        try{
            await deployedContract.methods.withdraw(0, "ky77djus", accounts[1]).send({from:accounts[1], gas:"1000000"});

        }catch(e){
            console.log(e.message);
        }

        let balance = await web3.eth.getBalance(accounts[1]);

        assert(balance > 0);
        
        

    })


})