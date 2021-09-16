import React, { useEffect, useState } from "react";
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
import ExpiredCard from "../../Components/SpotCards/Cards/ExpiredCard";
import LiveCard from "../../Components/SpotCards/Cards/LiveCard";
import OpenCard from "../../Components/SpotCards/Cards/OpenCard";
import NextCard from "../../Components/SpotCards/Cards/NextCard";
import GraphView from "../../Components/GraphView/GraphView";

import { getSpotBattleData, expireSpotBattle } from "../../utils/Contracts";

const SpotBattle = ({openHistory, setOpenHistory}) => {
  const classes = useStyles();
  const [roundEnd, setRoundEnd] = useState(0);

  const [openGraph, setOpenGraph] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
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
      currentInfo['longBNB'] = Number(data[0][0]);
      currentInfo['shortBNB'] = Number(data[0][1]);
      currentInfo['roundEnd'] = Number(data[0][2]);
      currentInfo['round'] = Number(data[0][3]);
      currentInfo['targetPrice'] = Number(data[0][4]);
      console.log(currentInfo['targetPrice']);
      setRoundEnd(Number(data[0][2]));
      // setIsEntered(await getEntryStatus());
  }   
  useEffect(() => {
          
      async function load() {
        console.log(123);
        await getMarketData();
        setIsLoaded(true);
        console.log(isLoaded);

      }
      
      load()
  }, []);

  return (
    <>
      <div className={classes.mainDiv}>
        <Typography className={classes.title}>Spot Battle</Typography>

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
                {/* <div className={classes.divArrows}>
                  <BackArrow />
                  <NextArrow />
                </div> */}
                <div className={classes.divTimer}>
                  <img src={clock} alt="" width={210} />
                  <Typography className={classes.textClock}>
                    {Date.now() > roundEnd ? 
                      <div onClick={() => expireSpotBattle('0x5741306c21795FdCBb9b265Ea0255F499DFe515C', 0)}>End The Round!</div>
                      :
                      <div>Counting Down</div>
                    }
                  </Typography>
                </div>
              </div>
            </div>

            {isLoaded ? 
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
                <LiveCard data={currentInfo} />
                <OpenCard />
                {/* <NextCard /> */}
              </div>
              :
              null
            }
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
          {/* <div className={classes.divGraph} onClick={() => setOpenGraph(!openGraph)}>
            <Graph />
          </div> */}
          {/* <div
            style={{ width: "85%", display: "flex", justifyContent: "center" }}
          >
            <img src={claim} alt="" width={300} />
          </div> */}
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
