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
    uint256[] public monthlyVolume;

    address[] public topAllTime;
    uint256[] public topAllTimeVolume;
}

contract VersusStats is DataLayout, Proxiable {
    
    using SafeERC20 for IBEP20;
    using SafeMath for uint256;

    constructor() public {
        
    }

    function statsConstructor() public {
        require(!initialized);
        owner = msg.sender;
        initialize();
    }
    
    function updateCode(address newCode) public _onlyOwner delegatedOnly  {
        updateCodeAddress(newCode);
    }
    
    function getStats() public view returns(uint256, address[] memory, uint256[] memory, address[] memory, uint256[] memory) {
        
    }

    function adjustMontlyLeaders(address user, uint256 volume) public {
        //require call come from Nyan token
        //if (monthlyVolumeLeaders[monthlyVolumeLeaders.length-1].volume >= volume) return false;

        bool volumePlaced;
        for (uint256 i; i < topMonthly.length; i++) {
            require(!volumePlaced);
            if (volume > monthlyVolume[i]) {
                address tempUser;
                uint256 tempVolume;

                tempUser = topMonthly[i];
                tempVolume = monthlyVolume[i];

                topMonthly[i] = user;
                monthlyVolume[i] = volume;
                volumePlaced = true;

                //shift other users down
                for (uint j = i+1; j < topMonthly.length; j++) {
                    
                }
            }


        }

        
    }

    function adjustAllTimeLeaders(address user, uint256 volume) public {
        //require call come from Nyan token
        
    }
    
}