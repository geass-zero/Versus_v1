pragma solidity ^0.8.0;

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
    address public owner;
    address public versusToken;
    address public monsterList;
    uint256 _tokenIds;
    
    struct details {
        uint32 monsterID;
        uint32 NFTLevel;
        uint32 totalWins;
        uint32[] stats;
        address equippedTo;
        uint256 blockChecked;
        uint256 versusStaked;
        uint32 move1;
        uint32 move2;
        uint32 move3;
        uint32 move4;
    }
    mapping(uint256 => details) public NFTDetails;
    mapping(uint256 => mapping(uint32 => uint32[])) public NFTStatsHistory;
    mapping(address => bool) whitelistedContracts; 
} 

contract VersusNFT is BEP721, DataLayout, Proxiable {
    using SafeMath for uint256;
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        
    }

    function NFTConstructor(address _versusToken) public payable {
        require(!initialized);
        owner = msg.sender;
        versusToken = _versusToken;
        constructor1("Versus.cx Creature", "VMON");
        initialize();
    }

    function setVersusToken(address _versusToken) public onlyOwner delegatedOnly {
        versusToken = _versusToken;
    }

    function setMonsterList(address _monsterList) public onlyOwner delegatedOnly {
        monsterList = _monsterList;
    }

    function updateCode(address newCode) public onlyOwner delegatedOnly  {
        updateCodeAddress(newCode);
    }

    function setOwner(address _owner) public onlyOwner delegatedOnly {
        owner = _owner;
    }

    function whiteListContract(address _contract, bool _direction) public onlyOwner {
        whitelistedContracts[_contract] = _direction;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        //use tokenId to determine NFT level
        uint256 tokenLevel = NFTDetails[tokenId].NFTLevel;
        return super.tokenURI(tokenLevel);
    }

    function setLevelURI(uint256 level, string memory _tokenURI) public {
        require(msg.sender == owner);
        _setTokenURI(level, _tokenURI);
    }
    
    /** @notice Creates a new Versus NFT.
      * @param _claimer Address of the claiming user.
      * @param _monsterID Name of the NFT tier.
      */
    function createNFT(address _claimer, uint32 _monsterID) public delegatedOnly returns(uint256) {
        require(whitelistedContracts[msg.sender]);
        uint256 newItemId = _tokenIds.add(1);
        _tokenIds = _tokenIds.add(1);
        _mint(_claimer, newItemId);
        NFTDetails[newItemId].monsterID = _monsterID;
        // NFTDetails[newItemId].stats = //get base stats from monsterList
        MonsterList(monsterList).getStatRanges(_monsterID);
        
        return newItemId;
    }

    
    function getNFTDetails(uint256 id) public view delegatedOnly returns(uint32, uint256, string memory) {
        return(NFTDetails[id].NFTLevel,
               NFTDetails[id].versusStaked,
               tokenURI(id));
    }

    function equipMonster(uint256 id, address _owner) public delegatedOnly {
        //only whitelisted contracts
        require(whitelistedContracts[msg.sender]);
        //check that owner owns NFT with that id
        //set to owner
        NFTDetails[id].equippedTo =  _owner;
    }

    function unEquipMonster(uint256 id, address _owner) public delegatedOnly {
        //only whitelisted contracts
        require(whitelistedContracts[msg.sender]);
        //check that owner owns NFT with that id
        //set to owner
        NFTDetails[id].equippedTo =  address(0);
    }

    function growMonster(uint256 id) public delegatedOnly {
        //only whitelisted contracts
        require(whitelistedContracts[msg.sender]);
        //increase monster level wins
        NFTDetails[id].totalWins = NFTDetails[id].totalWins + 1;
        //check if monster's wins meet or exceed requirements to level up
        //if so, increase each monster stat with random number generator
        
    }

    //stake
    function stakeNFT() public {

    }

    //unstake
    function unstakeNFT() public {

    }
    
    //super transfer(unstake on transfer)
    
    
}

interface MonsterList {
    function getStatRanges(uint32 index) external returns(uint[] memory);
} 