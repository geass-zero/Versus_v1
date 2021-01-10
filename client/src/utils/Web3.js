//import Web3 from "web3";
//https://github.com/CharlesStover/reactn
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { setGlobal, getGlobal } from 'reactn';


 /**
  * Check to see if there's a web3 instance to use
  */
 
const createInstance = async() => {

  const providerOptions = createProviderOptions()
  const web3Modal = createModal(providerOptions)
  
  // check if current instance is present
  let provider = false;
    try {
      provider = await web3Modal.connect();
    } catch (exception){
      console.log('exception thrown while instantiating web3modal');
      console.log(exception)
      return false
    }

    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    setGlobals(web3, accounts, web3Modal);
  
    return web3;
}

const createProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "83301e4b4e234662b7769295c0f4a2e1" // required
      }
    }
  };
  return providerOptions
}

const createModal = (providerOptions) => {
  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required,
    theme: {
      background: "rgb(253, 250, 250)",
      main: "rgb(33, 37, 41)",
      secondary: "rgb(136, 136, 136)",
      border: "rgba(195, 195, 195, 0.14)",
      hover: "rgb(252,163,220)"
    }
  });
  return web3Modal;
}

const getInstance = async() => {
    const web3Instance = getGlobal().web3Instance;    
    if(!web3Instance){
      return await createInstance();
    }
    return web3Instance
}

const setGlobals = (web3, accounts, web3Modal) => {
  setGlobal({
    web3Instance: web3,
    accounts: accounts,
    web3Modal: web3Modal
  });
}

// Export each function
export {
  createInstance,
  getInstance
  //checkWeb3IsPresent,
  //getAccounts,
  //getNetworkId
};

