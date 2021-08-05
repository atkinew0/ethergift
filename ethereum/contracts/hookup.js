import web3 from './web3'
import contract from '../build/Ethergift.json'



export default (address) => {

    return new web3.eth.Contract(
        contract.abi,
        address
    )



} 