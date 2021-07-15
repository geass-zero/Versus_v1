import React from "react";
import { Route, Redirect } from 'react-router-dom';
import Landing from "./Landing";
import Predict from "./Predict";

import { useGlobal } from 'reactn';

const Routes = (props) => {
    
    const [ web3Instance ] = useGlobal('web3Instance');
    
    return (
            <div className="application-body">
                <Route exact path='/' component={Predict}/>
                <Route exact path='/predict' component={Predict}/>
            </div>
    )
}

export default Routes