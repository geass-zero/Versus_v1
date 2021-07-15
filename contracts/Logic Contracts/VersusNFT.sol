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
    address public owner;
    address public versusToken;
    uint256 _tokenId;
    
    struct details {
        string name;
        uint32 NFTLevel;
        uint32 bonus;
        bool isStaked;
    }
    mapping(uint256 => details) nftDetails; 
} 

contract VersusNFT is BEP721, DataLayout, Proxiable {
    using SafeMath for uint256;
    

    constructor() public payable BEP721("Versusmon", "VMON") {
        
    }

    function NFTConstructor(address _versusToken) public payable {
        require(!initialized);
        owner = msg.sender;
        versusToken = _versusToken;
        constructor1("Versusmon", "VMON");
        initialize();
    }

    function updateCode(address newCode) public _onlyOwner delegatedOnly  {
        updateCodeAddress(newCode);
    }

    function setOwner(address _owner) public _onlyOwner delegatedOnly {
        owner = _owner;
    }


    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        //use tokenId to determine NFT level
        uint256 tokenLevel = nftDetails[tokenId].NFTLevel;
        return super.tokenURI(tokenLevel);
    }

    function setLevelURI(uint256 level, string memory _tokenURI) public {
        require(msg.sender == owner);
        _setTokenURI(level, _tokenURI);
    }
    
    /** @notice Creates a new Versus NFT.
      * @param _claimer Address of the claiming user.
      * @param _level Name of the NFT tier.
      */
    function createNFT(address _claimer, uint256 _level) public delegatedOnly returns(bool) {
        require(msg.sender == versusToken);
        uint256 newItemId = _tokenIds.add(1);
        _tokenIds = _tokenIds.add(1);
        _mint(_claimer, newItemId);
        nftDetails[newItemId].level = _level;
        //add bonus
        //is staked
        
        return newItemId;
    }
    
    function getNFTDetails(uint256 id) public view delegatedOnly returns(uint32, uint32, bool, string memory) {
        return(nftDetails[id].level, 
               nftDetails[id].bonus, 
               nftDetails[id].isStaked,
               tokenURI(id));
    }

    //stake
    function stakeNFT() {

    }

    //unstake
    function unstakeNFT() {

    }
    
    //super transfer(unstake on transfer)
    
    
}