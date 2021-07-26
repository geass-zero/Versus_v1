const Web3Utils = require('web3-utils');
const bigDecimal = require('js-big-decimal');

const toFixed =(num, fixed) => {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

const fromWei = (amount, notation='ether') => {
    return Web3Utils.fromWei(amount, notation)
}

const toWei = (amount, notation='ether') => {
    return Web3Utils.toWei(amount, notation)
}

const getRoundedAndFullBalance = (amount, precision=2) => {
    let weiAmount = Web3Utils.fromWei(amount);
    return {
        full: formatDecimals(weiAmount, 18),
        formatted: formatDecimals(weiAmount, precision)
    }
    //return toFixed(weiAmount, precision);
}

const getRoundedAndFullBalanceForNumber = (amount, precision=2) => {
    let weiAmount = Web3Utils.toWei(amount.toString());
    let formattedAmount = Web3Utils.fromWei(weiAmount);
    return {
        full: formatDecimals(amount,18),
        formatted: formatDecimals(formattedAmount, precision)
    }
}

const formatDecimals = (amount, precision=2) => {
    const decimal = bigDecimal.round(amount, precision,  bigDecimal.RoundingModes.DOWN);
    return decimal;
}

// Export each function
export {
    getRoundedAndFullBalance,
    getRoundedAndFullBalanceForNumber,
    formatDecimals,
    fromWei,
    toWei,
    toFixed
 };
