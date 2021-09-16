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
import { getUserData } from "../../utils/Contracts";

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
  const classes = classStyle();
  const NFTbox = {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
    fontFamily: "Arial",
    position: "fixed",
    bottom: "-310px",
    width: "100%",
    height: "350px",
    zIndex: "100",
    borderTopRightRadius: "54px",
    transition: "1s ease-in-out"
  };

  const NFTImage = {
    backgroundColor: "gray",
    padding: "10px",
    fontFamily: "Arial",
    position: "absolute",
    bottom: "50px",
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

  const Stake = {
    backgroundColor: "gray",
    color: "white",
    position: "absolute",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "35px",
    paddingRight: "35px",
    top: "255px",
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
    top: "255px",
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
    top: "255px",
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
    if (document.getElementById('NFT-B').style.bottom == '-310px') {
      document.getElementById('NFT-B').style.bottom = '0px';
    } else {
      document.getElementById('NFT-B').style.bottom = '-310px';
    }
    
  }



  useEffect(() => {
          
    async function load() {
      
    }
    
    load()
  }, []);

  return (
    <div>
      
      <div id="NFT-B" style={NFTbox}>
        <Typography className={classes.cardTitle}>My Equipped Monster</Typography>
        <div style={NFTImage}></div>
        <Typography style={NFTName}>NFT Name</Typography>
        <div style={NFTStatBox}></div>
        <Typography style={StakedTitle}>Versus Staked: 0</Typography>
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
