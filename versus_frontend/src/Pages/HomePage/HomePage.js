import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Header from "../../Components/Header/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import SpotBattle from "../SpotBattle/SpotBattle";
import TokenBattle from "../TokenBattle/TokenBattle";
import Leaderboard from "../Leaderboard/Leaderboard";
import MyNFTs from "../MyNFTs/MyNFTs";
import StarterClaim from "../../Components/StarterClaim/StarterClaim";
import { getUserData, getEquippedInfo, getRewardsAccrued } from "../../utils/Contracts";

const classStyle = makeStyles((theme) => ({
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "#828282",
  },
  cardTitleStyle: {
    boxShadow: "inset 0px -4px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: "0px 0px 16px 16px",
    background: "#F2F2F2",
    minWidth: 176,
    textAlign: "center",
  },
  divUp: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    marginTop: 12,
    height: 85,
    background: "#F2F2F2",
    borderRadius: "32px 32px 8px 8px",
  },
  divDown: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    marginTop: 12,
    height: 85,
    background: "#F2F2F2",
    borderRadius: "8px 8px 32px 32px",
    marginBottom: 19,
  },
  payoutText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
    color: "#E0E0E0",
  },
  divMid: {
    display: "flex",
    flexDirection: "column",
    background: "#F2F2F2",
    borderRadius: "16px",
    width: "90%",
    marginTop: 12,
    height: 127,
  },
  globalMidText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
  },
  containerMid: {
    display: "flex",
    flexDirection: "column",
  },
  divMidContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const HomePage = () => {
  const { typeId } = useParams();
  const [openHistory, setOpenHistory] = useState(false);
  const [equippedNFT, setEquippedNFT] = useState({});
  const [equippedImage, setEquippedImage] = useState('');
  const [equippedRewards, setEquippedRewards] = useState(1);
  const [refreshTimer, setRefreshTimer] = useState(10000);
  const classes = classStyle();
  const NFTbox = {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
    fontFamily: "Arial",
    position: "fixed",
    bottom: "-410px",
    width: "100%",
    height: "450px",
    zIndex: "100",
    boxShadow: "0px -20px 15px rgba(0, 0, 0, 0.16)",
    borderTopRightRadius: "54px",
    transition: ".4s ease-out"
  };

  const NFTImage = {
    backgroundColor: "gray",
    padding: "10px",
    fontFamily: "Arial",
    position: "absolute",
    top: "50px",
    left: "20px",
    width: "200px",
    height: "260px",
    zIndex: "100"
  };

  const NFTName = {
    position: "absolute",
    top: "50px",
    left: "280px",
    zIndex: "100",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    color: "#828282",
  };

  const NFTStatBox = {
    backgroundColor: "gray",
    padding: "10px",
    position: "absolute",
    top: "80px",
    left: "280px",
    width: "600px",
    height: "130px",
    zIndex: "100"
  };

  const ATK = {
    color: "white",
    top: 10,
    position: 'absolute'
  }

  const DEF = {
    color: "white",
    top: 35,
    position: 'absolute'
  }

  const SPD = {
    color: "white",
    top: 60,
    position: 'absolute'
  }

  const SPATK = {
    color: "white",
    top: 10,
    left: 180,
    position: 'absolute'
  }

  const SPDEF = {
    color: "white",
    top: 35,
    left: 180,
    position: 'absolute'
  }

  const StakedTitle = {
    position: "absolute",
    top: "225px",
    left: "280px",
    zIndex: "100",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    color: "#828282",
  };

  const AccruedTitle = {
    position: "absolute",
    top: "255px",
    left: "280px",
    zIndex: "100",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    color: "#828282",
  };

  const Stake = {
    backgroundColor: "gray",
    color: "white",
    position: "absolute",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "35px",
    paddingRight: "35px",
    top: "285px",
    left: "280px",
    zIndex: "100",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer"
  };

  const UnStake = {
    backgroundColor: "gray",
    color: "white",
    position: "absolute",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "35px",
    paddingRight: "35px",
    top: "285px",
    left: "450px",
    zIndex: "100",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer"
  };

  const Claim = {
    backgroundColor: "gray",
    color: "white",
    position: "absolute",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "35px",
    paddingRight: "35px",
    top: "285px",
    left: "648px",
    zIndex: "100",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer"
  };

  const Close = {
    borderRadius: "25px",
    backgroundColor: "red",
    position: "absolute",
    right: "20px",
    top: "15px",
    zIndex: "100",
    width: "50px",
    height: "20px",
    cursor: "pointer"
  }

  function toggleBox() {
    if (document.getElementById('NFT-B').style.bottom == '-410px') {
      document.getElementById('NFT-B').style.bottom = '0px';
    } else {
      document.getElementById('NFT-B').style.bottom = '-410px';
    }
    
  }

  function getJSON(url) {
    var resp ;
    var xmlHttp ;

    resp  = '' ;
    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null)
    {
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
    }

    return resp ;
}

  async function refreshEquipped() {
    let userData = await getUserData();
    if (userData && userData['NFTID']) {
      
      let NFTData = await getEquippedInfo(userData['NFTID']);
      console.log(NFTData);
      let rewardsAccrued = await getRewardsAccrued(userData['NFTID']);
      console.log(rewardsAccrued);
      let json = JSON.parse(getJSON(NFTData[4]));
      setEquippedImage(json.image);
      setEquippedNFT(NFTData);
      setEquippedRewards(rewardsAccrued)
    }
    // setTimeout(refreshEquipped(), refreshTimer);
  }

  useEffect(() => {
          
    async function load() {
      await refreshEquipped();
      
      let interval = setInterval(function () {
        refreshEquipped();
      }, refreshTimer)
    }
    
    load()
  }, []);

  return (
    <div>
      
      <div id="NFT-B" style={NFTbox}>
        <Typography className={classes.cardTitle}>My Equipped Monster</Typography>
        <div style={NFTImage}>
          <img style={{height: '100%'}} src={equippedImage}></img>
        </div>
        <Typography style={NFTName}>{equippedNFT[1]}</Typography>
        <div style={NFTStatBox}>
          <div style={ATK}><div style={{display:'inline-block'}}>ATK:</div> {equippedNFT[3] ? <div style={{display:'inline-block'}}>{equippedNFT[3][0]}</div> : null}</div>
          <div style={DEF}><div style={{display:'inline-block'}}>DEF:</div> {equippedNFT[3] ? <div style={{display:'inline-block'}}>{equippedNFT[3][1]}</div> : null}</div>
          <div style={SPD}><div style={{display:'inline-block'}}>SPD:</div> {equippedNFT[3] ? <div style={{display:'inline-block'}}>{equippedNFT[3][2]}</div> : null}</div>
          <div style={SPATK}><div style={{display:'inline-block'}}>SP.ATK:</div> {equippedNFT[3] ? <div style={{display:'inline-block'}}>{equippedNFT[3][3]}</div> : null}</div>
          <div style={SPDEF}><div style={{display:'inline-block'}}>SP.DEF:</div> {equippedNFT[3] ? <div style={{display:'inline-block'}}>{equippedNFT[3][4]}</div> : null}</div>
        </div>
        <Typography style={StakedTitle}>Versus Staked: {equippedNFT[2]}</Typography>
        <Typography style={AccruedTitle}>Versus Accrued: {equippedNFT[2]}</Typography>
        <Typography style={Stake}>Stake</Typography>
        <Typography style={UnStake}>UnStake</Typography>
        <Typography style={Claim}>Claim</Typography>
        <div onClick={() => toggleBox()} style={Close}></div>
      </div>
      <Header />
      {typeId === "spotBattle" && (
        <SpotBattle openHistory={openHistory} setOpenHistory={setOpenHistory} />
      )}
      {typeId === "tokenBattle" && (
        <TokenBattle
          openHistory={openHistory}
          setOpenHistory={setOpenHistory}
        />
      )}
      {typeId === "leaderboard" && <Leaderboard />}
      {typeId === "mynfts" && <MyNFTs />}
    </div>
  );
};

export default HomePage;
