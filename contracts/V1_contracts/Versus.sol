pragma solidity ^0.6.6;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/SafeERC20.sol";

contract NyanV2 {
    function getStakedNyanV2LP(address staker) public view returns(uint256) {}
    function lockNyan(address holder) public {}
    function lockNyanLP(address staker) public returns(uint256) {}
}

contract Versus is ERC20 {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    address owner;
    address predictionContract;
    address nyan = 0xbF4a9A37EcFc21825011285222c36aB35De51F14;
    address nyanLP = 0x944fD50276599807625786FB8EDc9876C54565e8;
    struct claimLock {
        uint256 unlockBlock;
    }
    mapping(address => claimLock) userClaimLock;
    
    constructor() public ERC20("Versus.predict", "Versus") {
        owner = msg.sender;
        uint256 supply = 100;
        _mint(msg.sender, supply.mul(10 ** 18));
        predictionContract = address(0);
    }
    
    function setPredictionContract(address predict) public {
        //can only be set once
        require(predictionContract == address(0));
        require(msg.sender == owner);
        predictionContract = predict;
    }
    
    function rewardPrediction(address user, uint256 amount) public {
        require(msg.sender == predictionContract);
        _mint(user, amount);
    }
    
    function claimAndLock(address user) public {
        require(userClaimLock[user].unlockBlock < block.number);
        userClaimLock[user].unlockBlock = block.number.add(45500);
    }
    
    function transfer(address _recipient, uint256 _amount) public override returns(bool) {    
        require(userClaimLock[msg.sender].unlockBlock < block.number);
        return super.transfer(_recipient, _amount);
    }
    
    function transferFrom(address _sender, address _recipient, uint256 _amount) public override returns(bool) {
        require(userClaimLock[_sender].unlockBlock < block.number);
       
        return super.transferFrom(_sender, _recipient, _amount);
    }
    
    function isNyanEligible(address user) public view returns(bool) {
        bool isEligible;
        uint256 nyanHeld = ERC20(nyan).balanceOf(user);
        uint256 nyanLPStaked = NyanV2(nyanLP).getStakedNyanV2LP(user);
        
        if (nyanHeld > 0) {
            isEligible = true;
            
        }
        if (nyanLPStaked > 0) {
            isEligible = true;
        }
        if (userClaimLock[user].unlockBlock > block.number) {
            isEligible = false;
        }
        return isEligible;
    }
    
    function claimNyanVersus() public {
        require(userClaimLock[msg.sender].unlockBlock < block.number);
        uint256 nyanHeld = ERC20(nyan).balanceOf(msg.sender);
        uint256 nyanLPStaked = NyanV2(nyanLP).getStakedNyanV2LP(msg.sender);
        
        if (nyanHeld > 0) {
            _mint(msg.sender, nyanHeld.div(10));
            //lock Nyan movement for 2 weeks
            NyanV2(nyan).lockNyan(msg.sender);
            
        }
        if (nyanLPStaked > 0) {
            _mint(msg.sender, nyanLPStaked);
            //lock LP unstaking for 2 weeks
            NyanV2(nyan).lockNyanLP(msg.sender);
        }
        userClaimLock[msg.sender].unlockBlock = block.number.add(91000);
    }
    
    receive() external payable {
        
    }
}