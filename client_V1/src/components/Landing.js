import React, { useEffect, useState, Component } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Badge } from 'react-bootstrap';
import { Web3Util, Accounts, Contracts } from '../utils/index';


import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default class Landing extends Component {


    componentDidMount = async () => {

    }

    render() {
        return(
            <div>
                <div className="enter-versus">Get in here!</div>
                <div className="more-info">More Info</div>
            </div>
        )
    }
}

// export default Landing;