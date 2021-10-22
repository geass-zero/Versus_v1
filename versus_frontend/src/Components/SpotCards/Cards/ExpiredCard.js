import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { getSpotBattleData } from "../../../utils/Contracts";

const ExpiredCard = () => {
  const classes = useStyles();
  const [closingPrice, setClosingPrice] = useState('0');
  const [targetPrice, setTargetPrice] = useState(0);
  const [longBNB, setLongBNB] = useState(0);
  const [shortBNB, setShortBNB] = useState(0);
  let pastInfo = {
    longBNB: 0,
    shortBNB: 0,
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

  async function getMarketData() {
      let data = await getSpotBattleData('0x5741306c21795FdCBb9b265Ea0255F499DFe515C');
  
      pastInfo['longBNB'] = Number(data[2][0]);
      pastInfo['shortBNB'] = Number(data[2][1]);
      let cPrice = addDecimal(trimPrice(data[2][2]));
   
      setClosingPrice(numberWithCommas(cPrice));
      setTargetPrice(0);
      setLongBNB(Number(data[2][0]));
      setShortBNB(Number(data[2][1]));
      // setIsEntered(await getEntryStatus());
  }   
  useEffect(() => {
          
      async function load() {
        await getMarketData();
      }
      
      load()
  }, []);
  console.log('fight');
  return (
    <SuperEllipse r1={0.05} r2={0.2} className={classes.expiredCard}>
      <div className={classes.cardTitleStyle}>
        <Typography className={classes.cardTitle}>Past</Typography>
      </div>
      <div className={classes.divUp}>
        <Typography className={classes.cardTitle}>UP</Typography>
        <Typography className={classes.payoutText} style={{ color: "#828282" }}>{determinePayout(true)}x payout</Typography>
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
            CLOSING PRICE
          </Typography>
          <Typography
            className={classes.globalMidText}
            style={{ fontSize: 28, color: "#828282" }}
          >
            <div>${closingPrice}</div>
          </Typography>
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
              {'$'+targetPrice}
            </Typography>
          </div>
        </Container>
      </div>
      <div className={classes.divDown}>
        <Typography className={classes.payoutText} style={{ color: "#828282" }}>{determinePayout(false)}x payout</Typography>
        <Typography className={classes.cardTitle}>DOWN</Typography>
      </div>
    </SuperEllipse>
  );
};

export default ExpiredCard;
