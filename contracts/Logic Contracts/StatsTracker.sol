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
    address public owner;
    address public versusToken;

    uint256 public totalBNBVolume;

    address[] public topMonthly;
    uint256[] public monthlyWins;

    address[] public topAllTime;
    uint256[] public topAllTimeWins;
}

contract VersusStats is DataLayout, Proxiable {
    
    using SafeERC20 for IBEP20;
    using SafeMath for uint256;

    modifier onlyVersus() {
        require(msg.sender == versusToken);
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        
    }

    function statsConstructor() public {
        require(!initialized);
        owner = msg.sender;
        initialize();
    }

    function setAddresses(address _versusToken) public onlyOwner {
        versusToken = _versusToken;
    }
    
    function updateCode(address newCode) public onlyOwner delegatedOnly  {
        updateCodeAddress(newCode);
    }
    
    function getStats() public view returns(uint256, address[] memory, uint256[] memory, address[] memory, uint256[] memory) {
        return(
            totalBNBVolume,
            topMonthly,
            monthlyWins,
            topAllTime,
            topAllTimeWins
        );
    }

    function updateVolume(uint256 _volume) public onlyVersus {
        totalBNBVolume = totalBNBVolume.add(_volume);
    }

    function adjustMontlyLeaders(address user, uint256 wins) public onlyVersus {

        if (topMonthly.length < 10) {
            monthlyWins.push(volume);
            topMonthly.push(user);
            return;
        } else {
            uint lowestIndex;
            uint256 lowestWins;
            for (uint256 i; i < topMonthly.length; i++) {
                if (lowestWins == 0) {
                    lowestIndex = i;
                    lowestWins = monthlyWins[i]; 
                } else if (monthlyWins[i] < lowestWins) {
                    lowestIndex = i;
                    lowestWins = i;
                }
            }
            topMonthly[lowestIndex] = user;
            monthlyWins[lowestIndex] = wins;
        }

    }

    function adjustAllTimeLeaders(address user, uint256 wins) public onlyVersus {

        if (topAllTime.length < 10) {
            topAllTimeWins.push(wins);
            topAllTime.push(user);
            return;
        } else {
            uint lowestIndex;
            uint256 lowestWins;
            for (uint256 i; i < topAllTime.length; i++) {
                if (lowestWins == 0) {
                    lowestIndex = i;
                    lowestWins = topAllTimeWins[i]; 
                } else if (topAllTimeWins[i] < lowestWins) {
                    lowestIndex = i;
                    lowestWins = i;
                }
            }
            topAllTime[lowestIndex] = user;
            topAllTimeWins[lowestIndex] = wins;
        }
    }
    
}