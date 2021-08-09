pragma solidity ^0.8.0;

import "./BEP20.sol";
import "./CakeInterface.sol";

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
    address public wBNB;

    struct marketStruct {
        uint256 round;
        address[] tokens;
        address[] pairs;
        uint256[] startBalance;
        uint256[] BNBWaged;
        uint256 roundStart;
        
        address[] nextTokens;
        address[] nextPairs;
        uint256[] nextBNBWaged;
    }
    mapping(address => marketStruct) public battleData; 

    struct marketHistory {
        address[] tokens;
        address winningToken;
        uint256[] startBalance;
        uint256[] endBalance;
        uint256[] roundStart;
        uint256[] roundEnd;
        uint256[] BNBWaged;
    }
    mapping(uint256 => marketHistory) public battleHistory;

    address[] public futureTokenList;
    address[] public futureTokenPairs;

    struct userStruct {
        address[] tokenHistory;
        uint256[] round;
        uint256[] BNBAmount;
        uint256[] predictionWinnings;
        bool[] isFreePrediction;
        bool[] isChecked;
        uint32 totalPredictions;
    }
    mapping(address => userStruct) public userHistory;

    mapping(address => bool) public isAdmin;

    address public pancakeSwapV2;
}

contract TokenBattle is DataLayout, Proxiable{
    
    using SafeMath for uint256;

    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        
    }

    receive() external payable {
        
    }

    function battleConstructor(address _versusToken) public {
        require(!initialized, "Contract is already initialized");
        owner = msg.sender;
        versusToken = _versusToken;
        initialize();
    }

    function updateCode(address newCode) public _onlyOwner delegatedOnly  {
        updateCodeAddress(newCode);
    }


    //add initial tokens(max 10)
    function initialiseBattle(address[] memory tokens, address[] memory pairs) public {
        require(isAdmin[msg.sender]); //centralize admins at versus token
        require(tokens.length <= 10);
        futureTokenList = tokens;
        futureTokenPairs = pairs;
        battleData[address(this)].round = 1;
        battleData[address(this)].tokens = tokens;
        battleData[address(this)].pairs = pairs;
        battleData[address(this)].roundStart = block.number;
        for (uint32 i; i < tokens.length; i++) {
            battleData[address(this)].startBalance[i] = IBEP20(pairs[i]).balanceOf(tokens[i]);//set start Balance
            battleData[address(this)].BNBWaged.push(0);

            battleData[address(this)].nextTokens.push(tokens[i]);
            battleData[address(this)].nextPairs.push(pairs[i]);
            battleData[address(this)].nextBNBWaged.push(0);

        }
    }


    //change one token, based on index
    function changeNextToken(uint32 index, address newToken, address newPair) public {
        require(isAdmin[msg.sender]);
        //futuretoken
        futureTokenList[index] = newToken;
        futureTokenPairs[index] = newPair;

    }

    //expire round
    function expireRound() public {
        require(battleData[address(this)].roundStart.add(1000) < block.number); //determine blocks
        address winningToken;
        uint256 highestBNBChange;
        address leastLossToken;
        uint256 leastLoss;
        uint256 currentRound = battleData[address(this)].round;
        for (uint i; i < markets.length; i++) {
            uint256 startBalance = battleData[address(this)].startBalance[i]; 
            uint256 tokenBalance = IBEP20(battleData[address(this)].pairs[i]).balanceOf(markets[i]);

            //set battleHistory data for the round
            battleHistory[currentRound].tokens.push(markets[i]);
            battleHistory[currentRound].startBalance.push(startBalance);
            battleHistory[currentRound].endBalance.push(tokenBalance);
            battleHistory[currentRound].roundStart.push(battleData[address(this)].roundStart);
            battleHistory[currentRound].roundEnd.push(block.number);
            battleHistory[currentRound].BNBWaged.push(battleData[address(this)].BNBWaged[i]);

            
            if (tokenBalance < startBalance) {
                if (leastLoss == 0) {
                    leastLoss = startBalance.sub(tokenBalance);
                    leastLossToken = markets[i];
                } else if (startBalance.sub(tokenBalance) < leastLoss) {
                    leastLoss = startBalance.sub(tokenBalance);
                    leastLossToken = markets[i];
                }
            }

            if (tokenBalance > startBalance) {
                if (highestBNBChange == 0) {
                    highestBNBChange = tokenBalance.sub(startBalance);
                    winningToken = markets[i];
                } else if (highestBNBChange < tokenBalance.sub(startBalance)) {
                    highestBNBChange = tokenBalance.sub(startBalance);
                    winningToken = markets[i];
                }
            }

            //set endBalance in history
            battleHistory[currentRound].endBalance[i] = IBEP20(battleData[address(this)].pairs[i]).balanceOf(markets[i]);

            battleData[address(this)].startBalance[i] = IBEP20(battleData[address(this)].pairs[i]).balanceOf(battleData[address(this)].pairs[i]);//set start Balance
            battleData[address(this)].BNBWaged.push(0);

            //update tokens to futuretokens
            battleData[address(this)].nextTokens.push(futureTokenList[i]);
            battleData[address(this)].nextPairs.push(futureTokenPairs[i]);
            battleData[address(this)].nextBNBWaged.push(0);
        }

        //check if winningToken exists
        //or for leastLossToken
        //save info in marketHistory
        //update tokens for next round
        if (winningToken != address(0)) {
            battleHistory[currentRound].winningToken = winningToken;
        } else if (leastLossToken != address(0)) {
            battleHistory[currentRound].winningToken = leastLossToken;
        } 
        
        //load in next round
        battleData[address(this)].tokens = battleData[address(this)].nextTokens;
        battleData[address(this)].pairs = battleData[address(this)].nextPairs;
        battleData[address(this)].round = battleData[address(this)].round.add(1);
        battleData[address(this)].BNBWaged = battleData[address(this)].nextBNBWaged;
 
    }

    //enter a round(free prediction usable)
    function enterBattle(address _token, uint tokenIndex, bool isFreePrediction) payable public {
        require(markets[tokenIndex] == _token);

        //check if user has placed prediction in next round
        uint256[] memory userRound = userHistory[msg.sender].round;
        require(userRound[userRound.length-1] < battleData[address(this)].round+1);
        uint256 currentValue;
        if (isFreePrediction) {
            require(msg.value == 0);
            //check if user has staked long enough for a free prediction
            currentValue = VersusToken(versusToken).hasFreePrediction(msg.sender);
        } else {
            require (msg.value > 0);
            currentValue = msg.value;
        }

        uint256 BNBAmount = currentValue;
        //send 3% of value to token contract as fees
        uint256 fees = BNBAmount.mul(3).div(100);
        VersusToken(versusToken).returnPredictionFees{value: fees}();

        battleData[address(this)].BNBWaged[tokenIndex] = battleData[address(this)].BNBWaged[tokenIndex].add(msg.value);
        userHistory[msg.sender].tokenHistory.push(_token);
        userHistory[msg.sender].round.push(battleData[address(this)].round+1);
        userHistory[msg.sender].isChecked.push(false);
        userHistory[msg.sender].BNBAmount.push(msg.value);

    }

    //claim wins
    function claimWins(uint32 index) public {
        require(!userHistory[msg.sender].isChecked[index], "Entry has been finalized");
        //use BNB waged to determine user payout, if winner, else 0
        //if winner, check if prediction was free
        //if winner, update user wins
        uint256 round = userHistory[msg.sender].round[index];
        if(battleHistory[round].winningToken == userHistory[msg.sender].tokenHistory[index]) {
            uint256 userPayout = (userHistory[msg.sender].BNBAmount[index] * 100) / battleHistory[round].BNBWaged[index];
            payable(msg.sender).transfer(userPayout);
            userHistory[msg.sender].isChecked[index] = true;
        }
       
        //update the lastCheckedIndex
    }

}

interface VersusToken {
    function hasFreePrediction(address user) external returns(uint256);
    function returnPredictionFees() payable external;
    function returnFreeBNB() payable external;
    function updateStats(address user, uint256 volume) external;
    function updateUserWins(address _user, bool _isWin) external;
}
