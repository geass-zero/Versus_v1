pragma solidity ^0.6.6;

import "./BEP20.sol";

// pragma solidity >=0.6.2;

interface IUniswapV2Router01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH);
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}



// pragma solidity >=0.6.2;

interface IUniswapV2Router02 is IUniswapV2Router01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
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
    using SafeERC20 for IBEP20;
    using SafeMath for uint256;

    address public owner;
    address public wBNB;
    IUniswapV2Router02 public uniswapV2Router;
    address public tokenStorage;

    struct userStruct {
        uint256 amountStaked; //deprecated?
        uint256 timeChecked; //timestamp
        uint128 winStreak;
        bool usingFreePrediction;
        uint256 totalVolume;
        uint32 currentLevel;
        uint32[] NFTsUnlocked;
    }
    mapping(address => userStruct) public userData; 

    uint32[] public levelStreakRequirements;

    uint256 public totalBNB;
    uint256 public totalBNBVolume;
    uint256 public freeBNBReturned;
    uint256 public predictionFees;

    mapping(address => bool) whitelistedContracts;
} 

contract ERCStorage {
    address versus;
    constructor () public {
        versus = msg.sender;
    }
    
    function sendBNB(uint256 amount) public {
        require(msg.sender == versus);
        versus.send(amount);
    }
}


contract Versus is BEP20, DataLayout, Proxiable {
    
    
    constructor() public payable BEP20("Versus.cx", "Versus"){
        
    }

    function versusConstructor() public {
        require(!initialized);
        owner = msg.sender;
        wBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
        IUniswapV2Router02 uniswapV2Router = IUniswapV2Router02(0x10ED43C718714eb63d5aA57B78B54704E256024E);
        tokenStorage = address(new ERCStorage());
        constructor1("Versus.cx", "Versus");
        initialize();
    }

    receive() external payable {
        
    }

    function updateCode(address newCode) public _onlyOwner delegatedOnly  {
        updateCodeAddress(newCode);
    }
    
    function setLevels(uint32[] memory requirements) public {
        require(msg.sender == owner);
        levelStreakRequirements = requirements;
    }

    function transfer(address recipient, uint256 amount) public override {
        uint256 fee = amount.mul(10).div(100);
        switchToBNB(fee);
        super.transfer(recipient, amount.sub(fee));
        userData[msg.sender].timeChecked = userData[msg.sender].timeChecked.add(30 minutes);
    }

    function switchToBNB(uint256 amount) internal {
        uint256 contractBNB = address(this).balance;
        // generate the uniswap pair path of token -> weth
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = wBNB; 

        _approve(address(this), address(uniswapV2Router), amount);

        // make the swap
        try uniswapV2Router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amount,
            0, // accept any amount of BNB
            path,
            tokenStorage,
            block.timestamp
        ) {
            //log new BNB
            uint256 newBNB = address(this).balance(contractBNB);
            totalBNB = totalBNB.add(newBNB);

        } catch (bytes memory failErr) {
            emit SwapFailed(failErr);
        }
    }

    function hasFreePrediction(address user) public returns(uint256) {
        require(userData[msg.sender].timeChecked >= block.timestamp, "No free prediction yet");
        require(!userData[msg.sender].usingFreePrediction, "Already using free prediction");
        uint256 userStack = address(this).balanceOf(user);
        uint256 bnbAllowed = userStack.mul(totalBNB).div(totalSupply);
        userData[msg.sender].usingFreePrediction = true;
        return bnbAllowed;
    }
    
    function returnFreeBNB(address user) public payable {
        require(whitelistedContracts[msg.sender], "Unauthorized contract");
        userData[user].usingFreePrediction = false;
        freeBNBReturned = freeBNBReturned.add(msg.value);
    }

    function returnPredictionFees() public payable {
        predictionFees = predictionFees.add(msg.value);
    }

    function useFees() public {
        
    }

    function updateStats(address user, uint256 volume) public {
        require(whitelistedContracts[msg.sender]);
        userData[user].totalVolume = userData[user].totalVolume.add(1);
        //increase total Versus volume
        totalBNBVolume = totalBNBVolume.add(volume);
    }

    function updateUserWins(address _user, uint32[] wins) public {
        require(whitelistedContracts[msg.sender]);
        
        for (uint i; i < wins.length; i++) {
            userData[_user].winStreak = userData[_user].winStreak.add(wins[i]);
            if (levelStreakRequirements[userData[_user].userLevel] < userData[_user].winStreak) {
                userData[_user].winStreak = userData[_user].winStreak.sub(levelStreakRequirements[userData[_user].userLevel]);
                userData[_user].userLevel = userData[_user].userLevel.add(1);
                userData[_user].NFTsUnlocked.push(userData[_user].userLevel);

                //need to deal with streak rollover
            }
        }
    }

    function mintNFT(address _user) public {
        
    
    }

    function whiteListContract(address _contract, bool _direction) public {
        require(msg.sender == owner);
        whitelistedContracts[_contract] = _direction;
    }
    
}

interface NyanDev {
    
}
