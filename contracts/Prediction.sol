pragma solidity ^0.6.7;

import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";

contract Versus {
    function rewardPrediction(address user, uint256 amount) public {}
}

contract Prediction {
    address public owner;
    address public versusContract;
    address public versusRewards;
    address public nyanRewards;
    address public devFund;
    address[] public markets;
    
    struct marketData {
        string marketName;
        uint256 startBlock;
        uint256 expirationBlock;
        int currentRound;
        int targetPrice;
        uint256 ETHLong;
        uint256 ETHShort;
        int[] priceHistory;
        uint256[] longHistory;
        uint256[] shortHistory;
    }
    mapping(address => marketData) public eachMarketData;
    
    struct marketPrediction {
        address pair;
        int price;
        int round;
        uint256 ETHUsed;
        bool isLonging;
        uint256 expirationBlock;
    }
    mapping(address => marketPrediction) public userPrediction;
    
    using SafeMath for uint256;
    using SafeMath for uint112;
    using SafeMath for int256;
    
    constructor(address _devFund, address _nyanRewards, address _versusRewards) public {
        owner = msg.sender;
        devFund = _devFund;
        nyanRewards = _nyanRewards;
        versusRewards = _versusRewards;
        
    }
    
    function setVersus(address _versus) public {
        versusContract = _versus;
    }
    
    function createMarket(address pair, string memory marketName) public {
        require(msg.sender == owner);
        markets.push(pair);
        //require token to be on Link price feed<----
        eachMarketData[pair].marketName = marketName;
        eachMarketData[pair].startBlock = block.number;
        eachMarketData[pair].expirationBlock = block.number.add(271);
        eachMarketData[pair].currentRound = 1;
        eachMarketData[pair].targetPrice = getLatestPrice(pair);
        
    }
    
    function getLatestPrice(address pair) public view returns (int) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(pair);
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
    
    function predict(address pair, bool isLonging) public payable {
        require(msg.value > 100, "ETH should be greater than 100 wei");
        require(eachMarketData[pair].startBlock.add(70) > block.number, "Prediction period ended");
        require(userPrediction[msg.sender].pair == address(0));
        userPrediction[msg.sender].pair = pair;
        userPrediction[msg.sender].isLonging = isLonging;
        userPrediction[msg.sender].price = eachMarketData[pair].targetPrice;
        userPrediction[msg.sender].round = eachMarketData[pair].currentRound;
        //fees are 1%
        uint256 fees = msg.value.mul(1).div(100);
        userPrediction[msg.sender].ETHUsed = msg.value.sub(fees);
        handleFees(fees);
        userPrediction[msg.sender].expirationBlock = eachMarketData[pair].expirationBlock;
        if (isLonging) {
            eachMarketData[pair].ETHLong = eachMarketData[pair].ETHLong.add(msg.value);
        } else {
            eachMarketData[pair].ETHShort = eachMarketData[pair].ETHShort.add(msg.value);
        }
        
    }
    
    function handleFees(uint256 ETHAmount) public {
        //send 60% to a Versus rewards contract
        
        //send 10% to a Dev rewards contract
        
        //send 30% to a Nyan-2 rewards contract
        
    }
    
    function expire(address pair) public {
        require(eachMarketData[pair].expirationBlock < block.number);
        eachMarketData[pair].priceHistory.push(eachMarketData[pair].targetPrice);
        eachMarketData[pair].longHistory.push(eachMarketData[pair].ETHLong);
        eachMarketData[pair].shortHistory.push(eachMarketData[pair].ETHShort);
        eachMarketData[pair].startBlock = block.number;
        eachMarketData[pair].expirationBlock = block.number.add(271);
        eachMarketData[pair].currentRound = eachMarketData[pair].currentRound + 1;
        eachMarketData[pair].targetPrice = getLatestPrice(pair);
        //mint the caller a Versus token by calling function from token contract
        Versus(versusContract).rewardPrediction(msg.sender, 1000000000000000000);
    }
    
    function closePrediction() public {
        require(userPrediction[msg.sender].pair != address(0));
        bool longWins;
        //check if current block has passed the prediction expiration
        require(block.number > userPrediction[msg.sender].expirationBlock, "Prediction has not expired.");
        //check if the price is higher than the price history for the round
        address pair = userPrediction[msg.sender].pair;
        if (eachMarketData[pair].priceHistory[uint(userPrediction[msg.sender].round-1)] > userPrediction[msg.sender].price) {
            longWins = true;
        }
        //if isLonged is equal to isLonging, send the user their ETH + ETH from opponents based on pool percentages
        uint256 poolPerc;
        uint256 ETHWon; 
        if (longWins) {
            if (userPrediction[msg.sender].isLonging) {
                poolPerc = userPrediction[msg.sender].ETHUsed
                    .mul(100)
                    .div(eachMarketData[pair].longHistory[uint(userPrediction[msg.sender].round-1)]);
                ETHWon = poolPerc
                            .mul(eachMarketData[pair].shortHistory[uint(userPrediction[msg.sender].round-1)])
                            .div(100);
                //send ETHWon to user
                msg.sender.call{value: ETHWon}("");
            }
        } else {
            if (!userPrediction[msg.sender].isLonging) {
                poolPerc = userPrediction[msg.sender].ETHUsed
                    .mul(100)
                    .div(eachMarketData[pair].shortHistory[uint(userPrediction[msg.sender].round-1)]);
                ETHWon = poolPerc
                            .mul(eachMarketData[pair].longHistory[uint(userPrediction[msg.sender].round-1)])
                            .div(100);
                //send ETHWon to user
                msg.sender.call{value: ETHWon}("");
            }
        }
        
        //mint user Versus(call Versus token)
        Versus(versusContract).rewardPrediction(msg.sender, userPrediction[msg.sender].ETHUsed.div(10));
        
        if (eachMarketData[userPrediction[msg.sender].pair].expirationBlock < block.number) {
            expire(userPrediction[msg.sender].pair);
        }
        
        //reset all fields for the user
        userPrediction[msg.sender].pair = address(0);
        userPrediction[msg.sender].price = 0;
        userPrediction[msg.sender].round = 0;
        userPrediction[msg.sender].ETHUsed = 0;
        userPrediction[msg.sender].isLonging = false;
        userPrediction[msg.sender].expirationBlock = 0;
        
        
    }
    
    function getMarkets() public view returns(address[] memory) {
        return markets;
    }
    
    function getMarketDetails(address market) public view 
        returns(uint256, uint256, int, int, uint256, uint256, string memory) {
        
        return(
            eachMarketData[market].startBlock,
            eachMarketData[market].expirationBlock,
            eachMarketData[market].currentRound,
            eachMarketData[market].targetPrice,
            eachMarketData[market].ETHLong,
            eachMarketData[market].ETHShort,
            eachMarketData[market].marketName
            );
    }
    
   
}