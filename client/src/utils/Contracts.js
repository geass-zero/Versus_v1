import { Web3Util, Accounts } from './index';
import ERC20 from "../contracts/ERC20.json";
import Prediction from "../contracts/Prediction.json";

let kovanPrediction = "0xD1941ABd389b5Ca4EbdA34c987a4d1245909F45c";
async function getPredictionContractInstance(){
    if(!window.predictionCI) {
        
    }
    const instance = await Web3Util.getInstance();
    console.log(kovanPrediction);
    window.predictionCI = new instance.eth.Contract(
        Prediction.abi,
        kovanPrediction
    );
    return window.predictionCI
}

async function getVersusMarkets(){
    let account = await Accounts.getCurrentAccount();
    let instance = await getPredictionContractInstance();

    let markets = await instance.methods.getMarkets().call();
    return markets;
}

async function getMarketDetails(market){
    let account = await Accounts.getCurrentAccount();
    let instance = await getPredictionContractInstance();

    let marketDetails = await instance.methods.getMarketDetails(market).call();
    return marketDetails;
}

async function getUserPrediction() {
    let account = await Accounts.getCurrentAccount();
    let instance = await getPredictionContractInstance();
    let userPrediction = await instance.methods.userPrediction(account).call();
    return userPrediction;
}

async function getCurrentPairPrice(pair) {
    let instance = await getPredictionContractInstance();
    let price = await instance.methods.getLatestPrice(pair).call();
    return price;
}

async function makePrediction(pair, amount, isLonging) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getPredictionContractInstance();
    await instance.methods.predict(pair, isLonging).send({
        from: account,
        value: amount
    });
}

async function expireMarket(pair) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getPredictionContractInstance();
    await instance.methods.expire(pair).send({
        from: account,
    })
}

async function closePrediction() {
    let account = await Accounts.getCurrentAccount();
    let instance = await getPredictionContractInstance();
    await instance.methods.closePrediction().send({
        from: account
    })
}

  export {
    getVersusMarkets,
    getMarketDetails,
    getUserPrediction,
    getCurrentPairPrice,
    makePrediction,
    expireMarket,
    closePrediction
}