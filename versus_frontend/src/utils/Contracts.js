/** All interations with the contracts */
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import VersusToken from "../ABIs/Versus.json";
import VersusNFT from "../ABIs/VersusNFT.json";
import SpotBattle from "../ABIs/SpotBattle.json";
// import TokenBattle from "../ABIs/TokenBattle.json";



// formatter
let myWeb3;
const Web3Utils = require('web3-utils');
const tokenAddress = '0x9348D1d35b7DFd940cDD224ae97cBb018d509470';
const NFTAddress = '';
const spotBattleAddress = '0x87C42F812b9134d046Aa02cEed5B7dBb272850BD';
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
        console.log(versusContract);
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
        // return data;
    }
}

//claim starter
async function claimStarter(index) {
    if (myWeb3) {
        let userAddress = await myWeb3.eth.getAccounts();
        const versusContract = new myWeb3.eth.Contract(VersusToken.abi, tokenAddress);
        let data = await versusContract.methods.claimFirstMonster(index).send({
            from: userAddress[0]
        });
        return data;
    }
}

//holds retrieved spot battle data
let spotInfoData = {0:[],1:[],2:[],3:[],4:[]};

async function getSpotBattleData(token) {
    if (spotInfoData[0].length == 0) {
        const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
        let userAddress = await web3.eth.getAccounts();
        userAddress = token;
        const spotContract = new web3.eth.Contract(SpotBattle.abi, spotBattleAddress);
        let data = await spotContract.methods.getSpotInfo(token, userAddress).call();
        spotInfoData[0] = [...data[0]];
        spotInfoData[0][0] = web3.utils.fromWei(spotInfoData[0][0].toString());
        spotInfoData[0][1] = web3.utils.fromWei(spotInfoData[0][1].toString());
        spotInfoData[1] = [...data[1]];
        spotInfoData[1][0] = web3.utils.fromWei(spotInfoData[1][0].toString());
        spotInfoData[1][1] = web3.utils.fromWei(spotInfoData[1][1].toString());
        spotInfoData[2] = [...data[2]];
        spotInfoData[3] = [...data[3]];
        spotInfoData[4] = [...data[4]];
        
        console.log(spotInfoData);
        // data[] = current round,
        // data[] = current targetPrice,
        // data[] = currentInfo[longBNB, shortBNB, roundEnd(unix timestamp)],
        // data[] = nextInfo[longBNB, shortBNB],
        // data[] = pastInfo[longBNB, shortBNB, closingPrice],
        // data[] = userInfo,
        // data[] = userPosition
        return spotInfoData;
    } else {
        return spotInfoData
    }
}

async function getUserSpotBattleHistory() {
    if (myWeb3) {
        console.log('history');
        let userAddress = await myWeb3.eth.getAccounts();
        const spotContract = new myWeb3.eth.Contract(SpotBattle.abi, spotBattleAddress);
        let userIndex = await spotContract.methods.userCurrentIndex(userAddress[0]).call();
        let data = await spotContract.methods.getUserMarketHistory(
            userAddress[0],
            userIndex,
            5
        ).call();
        console.log(data);
        // data[] = current round,
        // data[] = current targetPrice,
        // data[] = currentInfo[longBNB, shortBNB, roundEnd(unix timestamp)],
        // data[] = nextInfo[longBNB, shortBNB],
        // data[] = pastInfo[longBNB, shortBNB, closingPrice],
        // data[] = userInfo,
        // data[] = userPosition
        data['userIndex'] = userIndex;
        return data;
    } else {
        return {}
    }
}

//enter spot battle
async function enterSpotBattle(token, index, isLonging, isFreePrediction) {
    if (myWeb3) {
        let userAddress = await myWeb3.eth.getAccounts();
        const spotContract = new myWeb3.eth.Contract(SpotBattle.abi, spotBattleAddress);
        let data = await spotContract.methods.nextRoundPrediction(token, index, isLonging, isFreePrediction).send({
            from: userAddress[0],
            value: myWeb3.utils.toWei(String(0.01))
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



// expire token battle round

// claim token battle win
async function claimWin(index) {
    if (myWeb3) {
        let userAddress = await myWeb3.eth.getAccounts();
        const spotContract = new myWeb3.eth.Contract(SpotBattle.abi, spotBattleAddress);
        let data = await spotContract.methods.claim(userAddress[0], index).send({
            from: userAddress[0]
        });
        return data;
    }
}



//  Export each function
 export {
    connectWallet,
    getVersusBalance,
    getUserData,
    getUserNFTs,
    claimStarter,
    enterSpotBattle,
    expireSpotBattle,
    getSpotBattleData,
    getUserSpotBattleHistory,
    claimWin
 };