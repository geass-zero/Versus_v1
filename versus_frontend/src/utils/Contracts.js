/** All interations with the contracts */
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import VersusToken from "../ABIs/Versus.json";
import VersusNFT from "../ABIs/VersusNFT.json";
import SpotBattle from "../ABIs/SpotBattle.json";
import TokenBattle from "../ABIs/TokenBattle.json";



// formatter
let myWeb3;
const Web3Utils = require('web3-utils');
const tokenAddress = '';
const NFTAddress = '';
const spotBattleAddress = '';
const tokenBattleAddress = '';

const loadWeb3 = async() => 
 new Promise((resolve, reject) => {
   // Wait for loading completion to avoid race conditions with web3 injection timing.
   let web3;
   async function web3Check() {
     // Modern dapp browsers...
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
         
          return resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        web3 = window.web3;
        console.log("Injected web3 detected.");
      
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");

        resolve(web3);
      }
   }
   web3Check().then((res) => {
       return res;
   });

 });



async function connectWallet() {
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
               56: 'https://bsc-dataseed1.defibit.io/'
            },
            network: 'binance',
          }
        }
    };
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
    let provider = await web3Modal.connect();

    const modalWeb3 = new Web3(provider);
    
    if (modalWeb3) {
        myWeb3 = modalWeb3;
    } else {
        myWeb3 = await loadWeb3();
    }

    if (!myWeb3 && window.ethereum && window.ethereum.isMetaMask) {
        window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    return await myWeb3.eth.getAccounts();
}

//get versus balance
async function getVersusBalance() {
    if (myWeb3) {
        let userAddress = await myWeb3.eth.getAccounts();
        const versusContract = new myWeb3.eth.Contract(VersusToken.abi, tokenAddress);
        let tokenBalance = await versusContract.methods.balanceOf(userAddress[0]).call();
        let balance = myWeb3.utils.fromWei(tokenBalance.toString());
        return balance;
    } else {
        return 0;
    }
}

//get user data
//returns the user data struct in the token contract
async function getUserData() {
    if (myWeb3) {
        let userAddress = await myWeb3.eth.getAccounts();
        const versusContract = new myWeb3.eth.Contract(VersusToken.abi, tokenAddress);
        let data = await versusContract.methods.userData(userAddress[0]).call();
        return data;
    }
}

//get user NFTs
async function getUserNFTs() {
    if (myWeb3) {
        let userAddress = await myWeb3.eth.getAccounts();
        const NFTContract = new myWeb3.eth.Contract(VersusNFT.abi, NFTAddress);
        //let data = await NFTContract.
        return data;
    }
}

//claim starter
async function claimStarter() {
    if (myWeb3) {
        let userAddress = await myWeb3.eth.getAccounts();
        const versusContract = new myWeb3.eth.Contract(VersusToken.abi, tokenAddress);
        let data = await versusContract.methods.claimFirstStarter().send({
            from: userAddress[0]
        });
        return data;
    }
}

//enter spot battle
async function enterSpotBattle(token, index, isLonging, isFreePrediction) {
    if (myWeb3) {
        let userAddress = await myWeb3.eth.getAccounts();
        const spotContract = new myWeb3.eth.Contract(SpotBattle.abi, spotBattleAddress);
        let data = await spotContract.methods.nextRoundPrediction(token, index, isLonging, isFreePrediction).send({
            from: userAddress[0]
        });
        return data;
    }
}

//expire spot battle round
async function expireSpotBattle(token, index) {
    if (myWeb3) {
        let userAddress = await myWeb3.eth.getAccounts();
        const spotContract = new myWeb3.eth.Contract(SpotBattle.abi, spotBattleAddress);
        let data = await spotContract.methods.expireRound(token, index).send({
            from: userAddress[0]
        });
        return data;
    }
}

// claim spot battle win or should claims be automatic

// enter token battle

// expire token battle round

// claim token battle win



//  Export each function
 export {
    connectWallet,
    getVersusBalance,
    getUserData,
    getUserNFTs,
    claimStarter,
    enterSpotBattle,
    expireSpotBattle
 };