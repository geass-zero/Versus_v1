import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { getSpotBattleData } from "../../../utils/Contracts";

const LiveCard = () => {
  const classes = useStyles();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);
  

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

  async function getMarketData() {
      let data = await getSpotBattleData('0x5741306c21795FdCBb9b265Ea0255F499DFe515C');
      console.log(data);
      // currentInfo['longBNB'] = Number(data[0][0]);
      // currentInfo['shortBNB'] = Number(data[0][1]);
      // currentInfo['roundEnd'] = Number(data[0][2]);
      // currentInfo['round'] = Number(data[0][3]);
      
      console.log(currentInfo['targetPrice']);
      
      setTargetPrice(Number(data[0][4]));
      // setIsEntered(await getEntryStatus());
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
      <div className={classes.divUp} style={{ background: "#40CFAA" }}>
        <Typography className={classes.cardTitle} style={{ color: "white" }}>
          UP
        </Typography>
        <Typography className={classes.payoutText} style={{ color: "white" }}>
          payout
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
        <Typography className={classes.payoutText}>payout</Typography>
        <Typography className={classes.cardTitle} style={{ color: "#F8574C" }}>
          DOWN
        </Typography>
      </div>
    </SuperEllipse>
  );
};

export default LiveCard;
