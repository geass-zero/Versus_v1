import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


import { getSpotBattleData } from "../../../utils/Contracts";
import { Button, Input } from "@material-ui/core";

const NextCard = () => {
  const classes = useStyles();
  const [currentPrice, setCurrentPrice] = useState(10000);
  const [targetPrice, setTargetPrice] = useState(0);
  const [currentPool, setCurrentPool] = useState(1);

  // let price = data['targetPrice'].toString();
  // price = price.slice(0, -3);
  // data['targetPrice'] = parseInt(price);

  let currentInfo = {
    longBNB: 0,
    shortBNB: 0
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
      setCurrentPool(data[1][0] + data[1][1]);
      // setIsEntered(await getEntryStatus());
  }   
  useEffect(() => {
          
      async function load() {
        await getMarketData();
      }
      
      load()
  }, []);

  return (
    <SuperEllipse r1={0.05} r2={0.2} className={classes.nextCard}>
      <div className={classes.cardTitleStyle} style={{ background: "#FCAC37" }}>
        <Typography className={classes.cardTitle}  style={{ color: "white" }}>NEXT</Typography>
      </div>
      <div className={classes.divUp}>
        <Typography className={classes.cardTitle}>ENTER UP</Typography>
        <Typography className={classes.payoutText}>payout</Typography>
      </div>
      <div className={classes.divMid}>
        <Container
          className={classes.containerMid}
          style={{ marginTop: 5, marginBottom: 5 }}
        >
          {/* <Typography
            className={classes.globalMidText}
            style={{ fontSize: 12, color: "#393E49" }}
          >
            LAST PRICE
          </Typography>
          <Typography
            className={classes.globalMidText}
            style={{ fontSize: 28, color: "#828282" }}
          >
            $4564.564
          </Typography> */}
          <Divider style={{ marginTop: 5, marginBottom: 5 }} />
          <input type="number" placeholder='Enter BNB wager'></input>
          {/* <div className={classes.divMidContainer}>
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
              $4564.564
            </Typography>
          </div> */}
        </Container>
      </div>
      <div className={classes.divDown}>
        <Typography className={classes.payoutText}>payout</Typography>
        <Typography className={classes.cardTitle}>ENTER DOWN</Typography>
      </div>
    </SuperEllipse>
  );
};

export default NextCard;
