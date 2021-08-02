import React from "react";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";
import History from "../../Components/History/History";
import { ReactComponent as Coolicon } from "../../img/Coolicon.svg";
import clock from "../../img/clock.png";
import Divider from "@material-ui/core/Divider";
import TokenFrontCard from "../../Components/TokenCards/TokenFrontCard";
import TokenBackCard from "../../Components/TokenCards/TokenBackCard";
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { ReactComponent as Telegram } from "../../img/telegramLogo.svg";
import { ReactComponent as Twitter } from "../../img/twitterLogo.svg";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#FCAC37',
  },
}))(LinearProgress);

const TokenBattle = ({ openHistory, setOpenHistory }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainDiv}>
        <Typography className={classes.title}>Token Battle</Typography>

        <div className={classes.divHeader}>
          <div className={classes.divInfo}>
            <Typography className={classes.titlePrediction}>
              Which Token Will pump More?
            </Typography>
          </div>
          <div className={classes.divSubHeader}>
            <div
              className={classes.divClock}
              onClick={() => setOpenHistory(!openHistory)}
            >
              <Coolicon />
            </div>

            <div className={classes.divTimer}>
              <img src={clock} alt="" width={210} />
              <Typography className={classes.textClock}>Test</Typography>
            </div>
          </div>
        </div>
        <div className={classes.divCenter}>
          <Divider variant="middle" className={classes.divider} />
          <div className={classes.divStarts}>
            <Typography className={classes.textStarts}>
              STARTS IN 05:00
            </Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          <TokenFrontCard />
          <TokenBackCard />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
        <BorderLinearProgress variant="determinate" value={50} style={{width: '80%'}} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            alignItems: "center",
            paddingRight: "6%",
            marginTop: 80
          }}
        >
          <Telegram fill="white" style={{ marginRight: 30 }} />
          <Twitter fill="white" />
        </div>
      </div>
      <History open={openHistory} setOpen={setOpenHistory} />
    </>
  );
};

export default TokenBattle;
