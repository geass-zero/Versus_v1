import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


import { getSpotBattleData, enterSpotBattle } from "../../../utils/Contracts";
import { Button, Input } from "@material-ui/core";
const OpenCard = () => {
  const classes = useStyles();
  const [currentPrice, setCurrentPrice] = useState(10000);
  const [targetPrice, setTargetPrice] = useState(0);
  const [longBNB, setLongBNB] = useState(0);
  const [shortBNB, setShortBNB] = useState(0);
  const [currentPool, setCurrentPool] = useState(1);

  // let price = data['targetPrice'].toString();
  // price = price.slice(0, -3);
  // data['targetPrice'] = parseInt(price);

  let currentInfo = {
    longBNB: 0,
    shortBNB: 0
  }

  let btcMarket = '0x5741306c21795FdCBb9b265Ea0255F499DFe515C';

  async function enterBattle(isLonging) {
    let entry = await enterSpotBattle(btcMarket,0,isLonging,false);

  }

  async function getMarketData() {
      let data = await getSpotBattleData(btcMarket);
      console.log(data);
      // currentInfo['longBNB'] = Number(data[0][0]);
      // currentInfo['shortBNB'] = Number(data[0][1]);
      // currentInfo['roundEnd'] = Number(data[0][2]);
      // currentInfo['round'] = Number(data[0][3]);
      
      console.log(currentInfo['targetPrice']);
      setTargetPrice(Number(data[0][4]));
      setLongBNB(Number(data[1][0]));
      setShortBNB(Number(data[1][1]));
      setCurrentPool(Number(data[1][0]) + Number(data[1][1]));
      // setIsEntered(await getEntryStatus());
  }   

  function determinePayout(isLong) {
    if (isLong) {
      if (!longBNB || !shortBNB) {
        return 0;
      } else {return (shortBNB/longBNB) || 0;}
    } else {
      if (!longBNB || !shortBNB) {
        return 0;
      } else {return (longBNB/shortBNB) || 0;}
    }
  }

  useEffect(() => {
          
      async function load() {
        await getMarketData();
      }
      
      load()
  }, []);

  return (
    <SuperEllipse r1={0.05} r2={0.2} className={classes.openCard}>
      <div
        className={classes.cardTitleStyle}
        style={{
          background: "#6E00F8",
        }}
      >
        <Typography className={classes.cardTitle} style={{ color: "white" }}>
          OPEN
        </Typography>
      </div>
      <div className={classes.divUp}>
        <Typography className={classes.cardTitle} style={{ color: "#40CFAA" }}>
          UP
        </Typography>
        <Typography className={classes.payoutText} style={{ color: "#828282" }}>
          {determinePayout(true)}x payout
        </Typography>
      </div>
      <div
        className={classes.divMid}
        style={{ background: "white", justifyContent: "center" }}
      >
        <div
          className={classes.containerMid}
          style={{ alignItems: "center", position: "relative" }}
        >
          <div
            onClick={() => enterBattle(true)}
            style={{
              display: "flex",
              justifyContent: "center",
              background: "#40CFAA",
              borderRadius: " 16px 16px 0px 0px",
              width: "100%",
              height: 53,
              marginBottom: 13,
            }}
          >
            <Typography
              className={classes.cardTitle}
              style={{ fontSize: 16, color: "white", marginTop: 5 }}
            >
              Enter UP
            </Typography>
          </div>
          <div
            style={{
              background: "#FFFFFF",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 32,
              display: "flex",
              width: "50%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 5,
              position: "absolute",
              left: "50%",
              top: "50%" /* Move 50% from left */,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography
              className={classes.globalMidText}
              style={{ fontSize: 12, color: "#828282" }}
            >
              Prize Pool:
            </Typography>
            <Typography
              className={classes.cardTitle}
              style={{ fontSize: 14, color: "#2F3136" }}
            >
              {currentPool} BNB
            </Typography>
          </div>
          <div
            onClick={() => enterBattle(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              background: "#F8574C",
              borderRadius: "0px 0px 16px 16px ",
              width: "100%",
              height: 53,
            }}
          >
            <Typography
              className={classes.cardTitle}
              style={{ fontSize: 16, color: "white", marginBottom: 4 }}
            >
              Enter Down
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.divDown}>
        <Typography className={classes.payoutText} style={{ color: "#828282" }}>
          {determinePayout(true)}x payout
        </Typography>
        <Typography className={classes.cardTitle} style={{ color: "#F8574C" }}>
          DOWN
        </Typography>
      </div>
    </SuperEllipse>
  );
};

export default OpenCard;
