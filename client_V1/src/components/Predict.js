import React, { useEffect, useState, Component } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Badge } from 'react-bootstrap';
import { Web3Util, Accounts, Contracts } from '../utils/index';
// import ERC20 from "../contracts/ERC20.json";


import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default class Predict extends Component {
    state = {
        myETHBalance: 0,
        userHasPrediction: false,
        userPredictionExp: 0,
        userPredictionPair: "",
        userPredictionPrice: 0,
        userPredictionPosition: false, 
        markets: [],
        currentBlock: 0
    };
    
    componentDidMount = async () => {
        var web3 = new Web3(new Web3.providers.HttpProvider(
            'https://kovan.infura.io/v3/6162d64a9204425eb2dbe20e893c85d0'
        ));
        console.log(Web3Util.getInstance());
        let myAccount = await Accounts.getCurrentAccount();
        this.setState({myETHBalance: web3.utils.fromWei(await web3.eth.getBalance(myAccount))});

        let markets = await Contracts.getVersusMarkets();
        let marketsWithDetails = [];
        for (let i = 0; i < markets.length; i++) {
            let details = await Contracts.getMarketDetails(markets[i]);

            marketsWithDetails.push({
               address:  markets[i],
               name: details[6],
               startblock: details[0],
               endblock: details[1],
               currentround: details[2],
               targetprice: details[3],
               ETHLong: web3.utils.fromWei(details[4]),
               ETHShort: web3.utils.fromWei(details[5])
            });
            console.log(details[1]);
        }
        this.setState({markets: marketsWithDetails});
        this.setState({currentBlock: await web3.eth.getBlockNumber()});
        console.log(this.state.currentBlock);
        await this.hasUserPredicted();
    }

    formatPrice(name, price) {
        var web3 = new Web3(new Web3.providers.HttpProvider(
            'https://kovan.infura.io/v3/6162d64a9204425eb2dbe20e893c85d0'
        ));

        if (name.split('/')[1] == " ETH") {
            return web3.utils.fromWei(price.toString()) + " ETH";
        }
    }

    populateMarkets() {
        let arr = [];
        for (let i = 0; i < this.state.markets.length; i++) {
            arr.push(
                <div className="each-market">
                    <div className="market-name">{this.state.markets[i].name}</div>
                    <div className="market-target">
                        Target Price: 
                        <span className="target-price">
                            {this.formatPrice(this.state.markets[i].name, this.state.markets[i].targetprice)}
                        </span>
                    </div>

                    {this.state.currentBlock > this.state.markets[i].endblock ?
                        <div onClick={() => this.expireMarket(this.state.markets[i].address)} className="market-expired">Expire!</div>
                        :
                        <div className="market-expiration">Expires in: {this.state.markets[i].endblock - this.state.currentBlock} blocks</div>
                    }

                    <div className="predict-container">
                        <div className="short-box">
                            <input id={"short-input-" + i} placeholder="Enter ETH to stake" type="number" className="predict-input">

                            </input>
                            <div onClick={() => this.makePrediction(i, this.state.markets[i].address, 'short')} id={"short-button-" + i} className="short-button">SHORT</div>
                            <div className="ETH-pooled">{this.state.markets[i].ETHShort} ETH pooled</div>
                        </div>
                        <div className="long-box">
                            <input id={"long-input-" + i} placeholder="Enter ETH to stake" type="number" className="predict-input">

                            </input>
                            <div onClick={() => this.makePrediction(i, this.state.markets[i].address, 'long')} id={"long-button-" + i} className="short-button">LONG</div>
                            <div className="ETH-pooled">{this.state.markets[i].ETHLong} ETH pooled</div>
                        </div>
                    </div>
                </div>
            )
        }
        return arr;
    }

    makePrediction = async (index, pair, direction) => {
        let web3 = new Web3();
        if (direction == 'long') {
            let amount = document.getElementById('long-input-'+index).value;
            Contracts.makePrediction(pair, web3.utils.toWei(amount.toString()), true);
        } else {
            let amount = document.getElementById('short-input-'+index).value;
            Contracts.makePrediction(pair, web3.utils.toWei(amount.toString()), false);
        }
    }

    expireMarket = async (pair) => {
        Contracts.expireMarket(pair);
    }

    closeUserPrediction = async () => {
        Contracts.closePrediction();
    }

    isUserWinning = async () => {
        let isWinning = false;
        let price = await Contracts.getCurrentPairPrice(this.state.userPredictionPair);
        if (price > this.state.userPredictionPrice) {
            if (!this.state.userPredictionPosition) {
                isWinning = true;
            }
        } else {
            if (this.state.userPredictionPosition) {
                isWinning = true;
            }
        }
        return isWinning;
    }

    hasUserPredicted = async () => {
        let userPrediction = await Contracts.getUserPrediction();
        console.log(userPrediction);
        if (userPrediction[0] === "0x0000000000000000000000000000000000000000") {
            this.setState({userHasPrediction: false})
        } else {
            this.setState({userHasPrediction: true, 
                           userPredictionPair: userPrediction[0], 
                           userPredictionExp: userPrediction[5],
                           userPredictionPosition: userPrediction[4]})
        }
    }

    render() {
        return(
            <div className="predict-body">
                <div className="my-versus">
                    My Versus: 0
                </div>
                <div className="my-ETH">ETH in Wallet: {this.state.myETHBalance}</div>
                <a className="profit-href" target="_blank" href="https://nyanfinance.medium.com/versus-decentralized-price-prediction-markets-91a88fcbc0aa">
                    <div className="how-to-profit">What is Versus?</div>
                </a>

                <h2 className="market-header">Markets</h2>
                <div className="divider"></div>

                {this.state.userHasPrediction ?
                    <div className="each-market">
                        <div className="market-name">My Active Prediction</div>
                        <div className="market-name">Pair Name: ETH/???</div>
                        <div className="market-target">Target Price: <span className="target-price">$0</span></div>
                        {this.state.currentBlock > this.state.userPredictionExp ?
                            <div className="market-expired">Expire!</div>
                            :
                            <div className="market-expiration">Expires in: {this.state.userPredictionExp-this.state.currentBlock} blocks</div>
                        }
                        <div className="prediction-status">
                            {this.isUserWinning() ?
                                <div className="user-winning">
                                    <div className="p-s-text">Currently Winning!</div>
                                </div>
                                :
                                <div className="user-losing">
                                    <div className="p-s-text">Currently Losing</div>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    null
                }

                {this.populateMarkets()}
     
            </div>
        )
    }
}

// export default Landing;