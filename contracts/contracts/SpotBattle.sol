pragma solidity ^0.8.0;

import "./BEP20.sol";

// pragma solidity >=0.6.2;

interface IUniswapV2Router01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

   

    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}



// pragma solidity >=0.6.2;

interface IUniswapV2Router02 is IUniswapV2Router01 {
    
}

contract Proxiable {
    // Code position in storage is keccak256("PROXIABLE") = "0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7"

    function updateCodeAddress(address newAddress) internal {
        require(
            bytes32(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7) == Proxiable(newAddress).proxiableUUID(),
            "Not compatible"
        );
        assembly { // solium-disable-line
            sstore(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7, newAddress)
        }
    }
    function proxiableUUID() public pure returns (bytes32) {
        return 0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7;
    }
}

contract LibraryLockDataLayout {
  bool public initialized = false;
}

contract LibraryLock is LibraryLockDataLayout {
    // Ensures no one can manipulate the Logic Contract once it is deployed.
    // PARITY WALLET HACK PREVENTION

    modifier delegatedOnly() {
        require(initialized == true, "The library is locked. No direct 'call' is allowed");
        _;
    }
    function initialize() internal {
        initialized = true;
    }
}

contract DataLayout is LibraryLock {
    address[] public markets;
    address public owner;
    address public versusToken;
    address public usdcAddress;
    address public router;

    struct marketStruct {
        uint256 round;
        uint256 targetPrice;
        uint256 longBNB;
        uint256 shortBNB;
        uint256 roundEnd;
        address[] currentEntrants;
        uint256 nextRoundLong;
        uint256 nextRoundShort;
        address[] nextEntrants;
        uint256[] targetHistory;
        uint256[] longHistory;
        uint256[] shortHistory;
        uint256[] closingHistory;
    }
    mapping(address => marketStruct) public marketData; 
    mapping(address => mapping(uint256 => mapping(address => bool))) public entrantData;

    struct userStruct {
        address[] tokenHistory;
        uint256[] round;
        uint256[] BNBAmount;
        bool[] isLonging;
        bool[] isFreePrediction;
        bool[] winClaimed;
        uint256[] predictionWinnings;
        uint256 currentIndex;

    }
    mapping(address => userStruct) public userHistory;
}



contract SpotBattle is DataLayout, Proxiable{

 
    using SafeMath for uint256;

    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        
    }

    function updateCode(address newCode) public _onlyOwner delegatedOnly  {
        updateCodeAddress(newCode);
    }

    receive() external payable {
        
    }

    function battleConstructor() public {
        require(!initialized, "Contract is already initialized");
        owner = msg.sender;
        initialize();
    }

    function getUSDCPrice(address token) public returns(uint256) {
        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = usdcAddress;
        uint256[] memory amountsOut = IUniswapV2Router02(router).getAmountsOut(1 ** IBEP20(token).decimals(), path);
        return amountsOut[amountsOut.length-1];
    }
    
    function addMarket(address token) public {
        require(msg.sender == owner);
        markets.push(token);
        marketData[token].round = 1;
        marketData[token].targetPrice = getUSDCPrice(token); // get price from usdc quote
        marketData[token].roundEnd = block.timestamp.add(5 minutes);//block.timestamp + 5 mins in blocks

        marketData[token].targetHistory.push(marketData[token].targetPrice);

    }

    function nextRoundPrediction(address token, uint32 index, bool isLonging, bool freePrediction) public payable {
        require(markets[index] == token);
        //check if user has placed prediction in market
        //dont't loop, save something in user mapping instead
        bool hasPosition = entrantData[token][marketData[token].round+1][msg.sender];
        require(!hasPosition);
        uint256 BNBAmount;

        if (freePrediction) {
            require(msg.value == 0);
            //check if user has staked long enough for a free prediction
            uint256 contractBNB = address(this).balance;
            VersusToken(versusToken).hasFreePrediction(msg.sender);
            BNBAmount = address(this).balance.sub(contractBNB);
        }

        if (!freePrediction) {
            require (msg.value > 0);
            BNBAmount = msg.value;
        }
        
        //send 3% of value to token contract as fees
        uint256 fees = BNBAmount.mul(3).div(100);
        VersusToken(versusToken).returnPredictionFees{value: fees}();

        userHistory[msg.sender].tokenHistory.push(token);
        userHistory[msg.sender].round.push(marketData[token].round + 1);
        userHistory[msg.sender].BNBAmount.push(BNBAmount.sub(fees));
        userHistory[msg.sender].isLonging.push(isLonging);
        userHistory[msg.sender].winClaimed.push(false);
        userHistory[msg.sender].isFreePrediction.push(freePrediction);
        userHistory[msg.sender].currentIndex = userHistory[msg.sender].currentIndex.add(1);

        entrantData[token][marketData[token].round+1][msg.sender];
        // claim(msg.sender);
        VersusToken(versusToken).updateStats(msg.sender, BNBAmount.sub(fees));
    }

    function expireRound(address token, uint32 index) public {
        require(markets[index] == token);
        require(block.timestamp >= marketData[token].roundEnd);
        marketData[token].longHistory.push(marketData[msg.sender].longBNB);
        marketData[token].shortHistory.push(marketData[msg.sender].shortBNB);
        uint256 closingPrice = getUSDCPrice(token); //get current closing price
        marketData[token].closingHistory.push(closingPrice);

        marketData[token].longBNB = marketData[msg.sender].nextRoundLong;
        marketData[token].nextRoundLong = 0;
        marketData[token].shortBNB = marketData[msg.sender].nextRoundShort;
        marketData[token].nextRoundShort = 0;
        // marketData[token].currentEntrants = marketData[token].nextEntrants;
        // marketData[token].nextEntrants = [];

        marketData[token].round = marketData[token].round + 1;
        marketData[token].roundEnd = marketData[token].roundEnd.add(5 minutes);//block.number + 5 mins in blocks
        //reward function caller with amount of versus

    }

    function getUserMarketHistory(address user) public view returns(address[] memory,uint256[] memory,uint256[] memory,bool[] memory,bool[] memory) {
        return(
            userHistory[user].tokenHistory,
            userHistory[user].round,
            userHistory[user].BNBAmount,
            userHistory[user].isLonging,
            userHistory[user].winClaimed
        );
    }

    function claim(address user, uint256 userIndex) public {
        address token = userHistory[user].tokenHistory[userIndex];
        uint256 round = userHistory[user].round[userIndex];

        // make sure user has not claimed index yet
        if (!userHistory[user].winClaimed[userIndex]) {
            bool longWon = marketData[token].targetHistory[round-1] > marketData[token].closingHistory[round-1];

            //if user guessed wrong
            if (userHistory[user].isLonging[userIndex] != longWon) {
                userHistory[user].winClaimed[userIndex] = true;
                // VersusToken(versusToken).updateUserWins(user, false);
                return;
            }
            
            uint256 BNBUsed = userHistory[user].BNBAmount[userIndex];
            uint256 percentageOwned;
            if (longWon) {
                percentageOwned = BNBUsed.mul(100).div(marketData[token].longHistory[round-1]);
            } else {
                percentageOwned = BNBUsed.mul(100).div(marketData[token].shortHistory[round-1]);
            }

            uint256 winnings;
            if (longWon) {
                winnings = marketData[token].longHistory[round-1].mul(percentageOwned).div(100);
            } else {
                winnings = marketData[token].shortHistory[round-1].mul(percentageOwned).div(100);
            }

            //send winnings to user after free prediction check and fees
            if (userHistory[user].isFreePrediction[userIndex]) {
                //send 99% to token contract
                VersusToken(versusToken).returnFreeBNB{value: winnings.mul(99).div(100)}(user);
                //reduce winnings by 99%
                winnings = winnings.sub(winnings.mul(99).div(100));
            }
            msg.sender.call{value: winnings}("");

            //send user Versus as reward, if not free prediction, how much though?

            userHistory[user].winClaimed[userIndex] = true;
            VersusToken(versusToken).updateUserWins(user, true);
            return;
        } 

    }
    
}

interface VersusToken {
    function hasFreePrediction(address user) external returns(uint256);
    function returnPredictionFees() payable external;
    function returnFreeBNB(address user) payable external;
    function updateStats(address user, uint256 volume) external;
    function updateUserWins(address _user, bool _isWin) external;
}