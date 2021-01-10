import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Image, Nav, Navbar, Button } from 'react-bootstrap';
import { Web3Util, Accounts } from '../utils/index';

import { useGlobal } from 'reactn';

import '../style/Header.css';
import '../style/App.css';

const Header = (props) => {

    const [ web3Instance ] = useGlobal('web3Instance');
    // const [isEligibleForNyanV1toV2Swap, setIsEligibleForV1ToV2Swap] = useState(false);
    // const [isLGEOver, setIsLGEOver] = useState(false);
    // const [nyanBalance, setNyanBalance]  = useState(0);
    let [account, setAccount] = useState(0);

    // init staking page
    useEffect(() => {
        // only fires whenever requestConnectionToWallet is updated.
        async function init() {
            connect();
            // setNyanBalance(await Balances.getMyNyanBalance());  
            // setIsEligibleForV1ToV2Swap(true);
            // setIsLGEOver(Swap.getLGEBool());
            // console.log(isEligibleForNyanV1toV2Swap)
            if (web3Instance) {
                let account = await Accounts.getCurrentAccount();
            }
            
        }
        init()
    }, []);

    async function connect() {
        let instance = await Web3Util.createInstance();
        if (instance) {
            setAccount(await Accounts.getCurrentAccount());
        }
    }

    function disconnectWallet() {
        // account = null;
    }

    return (
        <div className="nav-bg">
            <Link to="/" className="router-link">
                <h1 className="site-title">Versus</h1>
            </Link>

            {
                account ?
                <div className="menu-icon">
                    Wallet:...{account.substring(account.length - 8)}
                    <div onClick={()=> disconnectWallet()} className="disconnect"></div>
                </div>
                :
                <div onClick={() => connect()} className="menu-icon">Connect To Wallet</div>
            }
        </div>
    )
}

export default Header;