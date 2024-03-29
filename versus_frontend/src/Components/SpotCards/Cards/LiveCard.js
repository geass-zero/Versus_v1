import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { getSpotBattleData, getTokenPrice } from "../../../utils/Contracts";

const LiveCard = () => {
  const classes = useStyles();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [targetPrice, setTargetPrice] = useState('0');
  const [longBNB, setLongBNB] = useState(0);
  const [shortBNB, setShortBNB] = useState(0);
  

  // let price = data['targetPrice'].toString();
  // price = price.slice(0, -3);
  // data['targetPrice'] = parseInt(price);

  let currentInfo = {
    longBNB: 0,
    shortBNB: 0,
    roundEnd: 100,
    round: 0,
    targetPrice: 100
  }

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  
  
  function addDecimal(x) {
    return x.substring(0, x.length - 2) + '.' + x.substring(x.length - 2);
  }

  function trimPrice(x) {
    return x.substring(0, x.length - 6)
  }

  async function refreshCurrentPrice() {
    let tokenPrice = await getTokenPrice('0x5741306c21795FdCBb9b265Ea0255F499DFe515C');
      var tokPrice = addDecimal(trimPrice(tokenPrice));
      setCurrentPrice(numberWithCommas(tokPrice));
      setTimeout(refreshCurrentPrice, 20000);
  }

  async function getMarketData() {
      let data = await getSpotBattleData('0x5741306c21795FdCBb9b265Ea0255F499DFe515C');
      await refreshCurrentPrice();
      
      // currentInfo['longBNB'] = Number(data[0][0]);
      // currentInfo['shortBNB'] = Number(data[0][1]);
      // currentInfo['roundEnd'] = Number(data[0][2]);
      // currentInfo['round'] = Number(data[0][3]);
      
      var tarPrice = addDecimal(trimPrice(data[0][4]));
      
      setTargetPrice(numberWithCommas(tarPrice));
      setLongBNB(Number(data[0][0]));
      setShortBNB(Number(data[0][1]));
      // setIsEntered(await getEntryStatus());
  }   

  function determinePayout(isLong) {
    if (isLong) {
      if (!longBNB || !shortBNB) {
        return 1;
      } else {return (shortBNB/longBNB).toFixed(2) || 1;}
    } else {
      if (!longBNB || !shortBNB) {
        return 1;
      } else {return (longBNB/shortBNB).toFixed(2) || 1;}
    }
  }

  useEffect(() => {
          
      async function load() {
        await getMarketData();
      }
      
      load()
  }, []);

  return (
    <SuperEllipse r1={0.05} r2={0.2} className={classes.liveCard}>
      <div className={classes.cardTitleStyle} style={{ background: "#F8574C" }}>
        <Typography className={classes.cardTitle} style={{ color: "white" }}>
          LIVE
        </Typography>
      </div>
      <div className={classes.divUp} >
        <Typography className={classes.cardTitle} style={{ color: "#40CFAA" }}>
          UP
        </Typography>
        <Typography className={classes.payoutText} style={{ color: "#828282" }} >
          {determinePayout(true)}x payout
        </Typography>
      </div>
      <div className={classes.divMid}>
        <Container
          className={classes.containerMid}
          style={{ marginTop: 5, marginBottom: 5 }}
        >
          <Typography
            className={classes.globalMidText}
            style={{ fontSize: 12, color: "#393E49" }}
          >
            CURRENT PRICE
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              className={classes.globalMidText}
              style={{ fontSize: 28, color: "#40CFAA" }}
            >
              ${currentPrice}
            </Typography>
            <div
              style={{
                padding: "5px 34px 5px 34px",
                background: "#40CFAA",
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: 96,
              }}
            >
              <Typography
                className={classes.globalMidText}
                style={{ fontSize: 14, color: "white" }}
              >
                $-
              </Typography>
            </div>
          </div>
          <Divider style={{ marginTop: 5, marginBottom: 5 }} />
          <div className={classes.divMidContainer}>
            <Typography
              className={classes.globalMidText}
              style={{ color: "#828282" }}
            >
              Target Price:
            </Typography>
            <Typography
              className={classes.globalMidText}
              style={{ color: "#828282" }}
            >
              ${targetPrice}
            </Typography>
          </div>
        </Container>
      </div>
      <div className={classes.divDown}>
        <Typography className={classes.payoutText} style={{ color: "#828282" }}>{determinePayout(true)}x payout</Typography>
        <Typography className={classes.cardTitle} style={{ color: "#F8574C" }}>
          DOWN
        </Typography>
      </div>
    </SuperEllipse>
  );
};

export default LiveCard;
