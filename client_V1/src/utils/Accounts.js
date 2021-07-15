/** All interations with the contracts */
import Web3 from "web3";
import { getGlobal } from 'reactn';
import { Web3Util } from './index';

const getCurrentAccount = async() => {
    const accounts = getGlobal().accounts;
    if(!accounts){
        let web3 = await Web3Util.getInstance()
        if(web3){
            let accounts = await web3.eth.getAccounts();
            return accounts[0];
        }
    }
    console.log(accounts[0]);
    return accounts[0];
}

// Export each function
export {
    getCurrentAccount
 };