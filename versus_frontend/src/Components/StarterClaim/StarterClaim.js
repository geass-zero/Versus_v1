import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { claimStarter } from "../../utils/Contracts";

const StarterClaim = () => {
  const classes = useStyles();
  const container = {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
    fontFamily: "Arial",
    position: "fixed",
    top: "30%",
    width: "100%",
    height: "450px",
    zIndex: "100",
    borderRadius: 10,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "1s ease-in-out"
  };

  const NFTImage = {
    backgroundColor: "gray",
    padding: "10px",
    fontFamily: "Arial",
    position: "relative",
    display: 'inline-block',
    margin: '0 auto',
    marginTop: 50,
    marginRight: 10,
    width: "200px",
    height: "260px",
    zIndex: "100",
    cursor: 'pointer'
  };
//   const [currentPrice, setCurrentPrice] = useState(10000);
//   const [targetPrice, setTargetPrice] = useState(0);
  

  async function claimMonster(index) {
    await claimStarter(index);
      
      // setIsEntered(await getEntryStatus());
  }   
  useEffect(() => {
          
      async function load() {

      }
      
      load()
  }, []);

  return (
    <div style={container}>
        <Typography className={classes.cardTitle} >Claim your starter monster!</Typography>
        <div onClick={() => claimMonster(1)} style={NFTImage}></div>
        <div onClick={() => claimMonster(2)} style={NFTImage}></div>
        <div onClick={() => claimMonster(3)} style={NFTImage}></div>
    </div>
  );
};

export default StarterClaim;
