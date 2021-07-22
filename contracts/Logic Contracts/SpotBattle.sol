pragma solidity ^0.6.6;

import "./BEP20.sol";

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

    using SafeERC20 for IBEP20;
    using SafeMath for uint256;

    constructor() public {
        owner = msg.sender;
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
    
    function addMarket(address token) public {
        require(msg.sender == owner);
        markets.push(token);
        marketData[token].round = 1;
        marketData[token].targetPrice = 0; // get price from Link
        marketData[token].roundEnd = marketData[token].roundEnd.add(5 minutes);//block.number + 5 mins in blocks(or use timestamp?)

        marketData[token].targetHistory.push(marketData[token].targetPrice);

    }

    function nextRoundPrediction(address token, uint32 index, bool isLonging, bool freePrediction) public payable {
        require(markets[index] == token);
        //check if user has placed prediction in market
        //dont't loop, save something in user mapping instead
        bool hasPosition;
        for (uint256 i; i < marketData[token].nextEntrants.length; i++) {
            if (marketData[token].nextEntrants[i] == msg.sender) {
                hasPosition = true;
            }
        }
        require(!hasPosition);
        
        if (freePrediction) {
            require(msg.value == 0);
            //check if user has staked long enough for a free prediction
            uint256 contractBNB = address(this).balance;
            VersusToken(versusToken).hasFreePrediction(msg.sender);
            msg.value = address(this).balance.sub(contractBNB);
            
        }
        require (msg.value > 0);
        uint256 BNBAmount = msg.value;
        //send 3% of value to token contract as fees
        uint256 fees = BNBAmount.mul(3).div(100);
        VersusToken(versusToken).returnPredictionFees(){value: fees};

        userHistory[msg.sender].tokenHistory.push(token);
        userHistory[msg.sender].round.push(marketData[token].round + 1);
        userHistory[msg.sender].BNBAmount.push(BNBAmount.sub(fees));
        userHistory[msg.sender].isLonging.push(isLonging);
        userHistory[msg.sender].isChecked.push(false);
        userHistory[msg.sender].isFreePrediction.push(freePrediction);
        userHistory[msg.sender].currentIndex = userHistory[msg.sender].currentIndex.add(1);

        marketData[token].nextEntrants.push(msg.sender);

        VersusToken(versusToken).updateStats(msg.sender, BNBAmount.sub(fees));
    }

    function expireRound(address token, uint32 index) public {
        require(markets[index] == token);
        require(block.timestamp >= marketData[token].roundEnd);
        marketData[token].longHistory.push(marketData[msg.sender].longBNB);
        marketData[token].shortHistory.push(marketData[msg.sender].shortBNB);
        uint256 closingPrice; //get current closing price
        marketData[token].closingHistory.push(closingPrice);

        marketData[token].longBNB = marketData[msg.sender].nextRoundLong;
        marketData[token].nextRoundLong = 0;
        marketData[token].shortBNB = marketData[msg.sender].nextRoundShort;
        marketData[token].nextRoundShort = 0;
        marketData[token].currentEntrants = marketData[token].nextEntrants;
        marketData[token].nextEntrants = [];

        marketData[token].round = marketData[token].round + 1;
        marketData[token].roundEnd = 0;//block.number + 5 mins in blocks
        //reward function caller with amount of versus

    }

    function getUserMarketHistory(address user) public view returns(address[],uint256[],uint256[],bool[],bool[]) {
        return(
            userHistory[user].tokenHistory,
            userHistory[user].round,
            userHistory[user].BNBAmount,
            userHistory[user].isLonging,
            userHistory[user].isChecked
        );
    }

    function claim(address user) public {
        uint32 userIndex = userHistory[user].currentIndex-1;
        address token = userHistory[user].tokenHistory[userIndex];
        uint32 round = userHistory[user].round[userIndex];

        if (!userHistory[user].isChecked[userIndex]) {
            bool longWon = marketData[token].targetHistory[round-1] > marketData[token].closingHistory[round-1];
        
            if (userHistory[user].isLonging[userIndex] != longWon) {
                userHistory[user].isChecked[userIndex] = true;
                VersusToken(versusToken).updateUserWins(user, false);
                return false;
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
                VersusToken(versusToken).returnFreeBNB(user){value: winnings.mul(99).div(100)};
                //reduce winnings by 99%
                winnings = winnings.sub(winnings.mul(99).div(100));
            }
            msg.sender.call{value: winnings}("");

            //send user Versus as reward, if not free prediction, how much though?

            userHistory[user].isChecked[userIndex] = true;
            VersusToken(versusToken).updateUserWins(user, true);
            return true;
        } 

    }
    
}

interface VersusToken {
    function hasFreePrediction(address user) external returns(uint256);
    function returnPredictionFees() external;
    function returnFreeBNB(address user) external;
    function updateStats(address user, uint256 volume) external;
    function updateUserWins(address _user, bool _isWin) external;
}