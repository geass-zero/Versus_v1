import React, { useState } from "react";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";
import tokens from "../../img/tokens.png";
import { ReactComponent as Coolicon } from "../../img/Coolicon.svg";
import { ReactComponent as BackArrow } from "../../img/BackArrow.svg";
import { ReactComponent as NextArrow } from "../../img/NextArrow.svg";
import { ReactComponent as Telegram } from "../../img/telegramLogo.svg";
import { ReactComponent as Twitter } from "../../img/twitterLogo.svg";
import { ReactComponent as Graph } from "../../img/Graph.svg";
import clock from "../../img/clock.png";
import claim from "../../img/claim.png";
import History from "../../Components/History/History";
import ExpiredCard from "../../Components/SpotCards/ExpiredCard";
import LiveCard from "../../Components/SpotCards/LiveCard";
import OpenCard from "../../Components/SpotCards/OpenCard";
import NextCard from "../../Components/SpotCards/NextCard";
import GraphView from "../../Components/GraphView/GraphView";

const SpotBattle = ({openHistory, setOpenHistory}) => {
  const classes = useStyles();

  const [openGraph, setOpenGraph] = useState(true);

  return (
    <>
      <div className={classes.mainDiv}>
        <Typography className={classes.title}>SpotBattle</Typography>

        {openGraph ? (
          <>
            <div className={classes.divHeader}>
              <img src={tokens} alt="" width={300} height="auto" />
              <div className={classes.divSubHeader}>
                <div className={classes.divPrediction}>
                  <Typography className={classes.titlePrediction}>
                    Free Prediction
                  </Typography>
                </div>
                <div
                  className={classes.divClock}
                  onClick={() => setOpenHistory(!openHistory)}
                >
                  <Coolicon />
                </div>
                <div className={classes.divArrows}>
                  <BackArrow />
                  <NextArrow />
                </div>
                <div className={classes.divTimer}>
                  <img src={clock} alt="" width={210} />
                  <Typography className={classes.textClock}>Test</Typography>
                </div>
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
              <ExpiredCard />
              <LiveCard />
              <OpenCard />
              <NextCard />
            </div>
          </>
        ) : (
          <GraphView />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: 50,
            marginLeft: "6%",
          }}
        >
          <div className={classes.divGraph} onClick={() => setOpenGraph(!openGraph)}>
            <Graph />
          </div>
          <div
            style={{ width: "85%", display: "flex", justifyContent: "center" }}
          >
            <img src={claim} alt="" width={300} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            alignItems: "center",
            paddingRight: "6%",
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

export default SpotBattle;
