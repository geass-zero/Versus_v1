pragma solidity ^0.6.0;

import "./BEP721.sol";

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
    struct monsterStruct {
        string name;
        string monsterType;
        uint[] levelUpRequirements;
        uint32[] statRanges;
        uint32 evolutionLevel;
        uint32 evolvesInto;
        string rarity;
        string imageLink;
        uint32 yieldBoost;
    }
    mapping(uint32 => monsterStruct) public monster;
    uint32 public topIndex;
} 

contract MonsterList is DataLayout, Proxiable {
    using SafeMath for uint256;
    

    constructor() public {
        
    }

    function MonsterConstructor() public payable {
        require(!initialized);
        owner = msg.sender;
        initialize();
    }

    function updateCode(address newCode) public _onlyOwner delegatedOnly  {
        updateCodeAddress(newCode);
    }

    function setOwner(address _owner) public _onlyOwner delegatedOnly {
        owner = _owner;
    }

    function createMonster(
        string name,
        string monsterType,
        uint[] levelRequirements,
        uint[] statRanges,
        uint32 evolutionLevel,
        uint32 evolvesInto,
        string rarity,
        string imageLink,
        uint32 yieldBoost
    ) public _onlyOwner delegatedOnly {
        monster[topIndex+1].name = name;
        monster[topIndex+1].monsterType = monsterType;
        monster[topIndex+1].levelRequirements = levelRequirements;
        monster[topIndex+1].statRanges = statRanges;
        monster[topIndex+1].evolutionLevel = evolutionLevel;
        monster[topIndex+1].evolvesInto = evolvesInto;
        monster[topIndex+1].rarity = rarity;
        monster[topIndex+1].imageLink = imageLink;
        monster[topIndex+1].yieldBoost = yieldBoost;
        topIndex = topIndex+1;
    }

    function editName(
        uint32 index,
        string name
    ) public _onlyOwner delegatedOnly {
        monster[index].name = name;
    }

    function editType(
        uint32 index,
        string monsterType
    ) public _onlyOwner delegatedOnly {
        monster[index].monsterType = monsterType;
    }

    function editLevelRequirements(
        uint32 index,
        uint[] levelRequirements
    ) public _onlyOwner delegatedOnly {
        monster[index].levelRequirements = levelRequirements;
    }

    function editStatRanges(
        uint32 index,
        uint[] statRanges
    ) public _onlyOwner delegatedOnly {
        monster[index].statRanges = statRanges;
    }

    function editEvolutionLevel(
        uint32 index,
        uint32 evolutionLevel
    ) public _onlyOwner delegatedOnly {
        monster[index].evolutionLevel = evolutionLevel;
    }

    function editEvolvesInto(
        uint32 index,
        uint32 evolvesInto
    ) public _onlyOwner delegatedOnly {
        monster[index].evolvesInto = evolvesInto;
    }

    function editRarity(
        uint32 index,
        string rarity
    ) public _onlyOwner delegatedOnly {
        monster[index].rarity = rarity;
    }

    function editImageLink(
        uint32 index,
        string imageLink
    ) public _onlyOwner delegatedOnly {
        monster[index].imageLink = imageLink;
    }

    function editYieldBoost(
        uint32 index,
        uint32 yieldBoost
    ) public _onlyOwner delegatedOnly {
        monster[index].yieldBoost = yieldBoost;
    }

    function getName(uint32 index) public returns(string memory) {
        return monster[index].name;
    }

    function getMonsterType(uint32 index) public returns(string memory) {
        return monster[index].monsterType;
    }

    function getLevelRequirements(uint32 index) public returns(uint[] memory) {
        return monster[index].levelRequirements;
    }
    
    function getStatRanges(uint32 index) public returns(uint[] memory) {
        return monster[index].statRanges;
    }

    function getEvolutionLevel(uint32 index) public returns(uint32) {
        return monster[index].evolutionLevel;
    }

    function getEvolution(uint32 index) public returns(uint32) {
        return monster[index].evolvesInto;
    }

    function getRarity(uint32 index) public returns(string memory) {
        return monster[index].rarity;
    }

    function getImageLink(uint32 index) public returns(string memory) {
        return monster[index].imageLink;
    }

    function getYieldBoost(uint32 index) public returns(uint32) {
        return monster[index].yieldBoost;
    }


    
}