import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse from "react-superellipse";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import back from "../../img/back.png";
import { useStyles } from "./styles";

import { getUserSpotBattleHistory, claimWin } from "../../utils/Contracts";
import { Button } from "@material-ui/core";

const History = ({ open, setOpen }) => {
  const classes = useStyles();
  const [historyLength, setHistoryLength] = useState(0);
  const [historyData, setHistoryData] = useState({});

  async function getHistoryData() {
    let data = await getUserSpotBattleHistory();
    if (data[0]) {
      setHistoryData(data);
      setHistoryLength(data[0].length);
    }
    console.log(historyData);
    console.log(historyLength);
  }

  useEffect(() => {     
    async function load() {
      await getHistoryData();
    }
    
    load()
  }, []);

  function populateHistory() {
    let arr = []
    for (let i = 0; i < historyLength; i++) {
      arr.push(
        <SuperEllipse r1={0.02} r2={0.2} className={classes.ellipse}>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Typography className={classes.cardTitle}>Round {historyData[1][i]}</Typography>
            <Typography
              className={classes.cardTitle}
              style={{ fontSize: 16, color: "#828282" }}
            >
              Your result: +0.0
            </Typography>
            <div className={classes.globalDiv} style={{ marginTop: 20 }}>
              <Typography className={classes.cardText}>
                Your Direction
              </Typography>
              <div
                className={classes.directionDiv}
                style={{ background: "#40CFAA" }}
              >
                {historyData[3][i]?
                  <Typography
                    className={classes.cardTitle}
                    style={{ color: "white", fontSize: 16 }}
                  >
                    UP
                  </Typography>
                  :
                  <Typography
                    className={classes.cardTitle}
                    style={{ color: "white", fontSize: 16 }}
                  >
                    Down
                  </Typography>
                }
              </div>
            </div>
            <div className={classes.globalDiv} style={{ marginTop: 20 }}>
              <Typography className={classes.cardText}>
                Your position
              </Typography>

              <Typography className={classes.cardText}>{historyData[2][i]}</Typography>
            </div>
            <div className={classes.globalDiv} style={{ marginTop: 10 }}>
              <Typography className={classes.cardText}>Your result</Typography>

              <Typography className={classes.cardText}>+0.0</Typography>
            </div>
            <Divider style={{ marginTop: 10, marginBottom: 5 }} />
            {/* <div className={classes.globalDiv} style={{ marginTop: 10 }}>
              <Typography className={classes.cardText}>
                Closing price
              </Typography>

              <Typography className={classes.cardText}>$600.00</Typography>
            </div>
            <div className={classes.globalDiv} style={{ marginTop: 10 }}>
              <Typography className={classes.cardText}>Your result</Typography>

              <Typography className={classes.cardText}>70.5 BNB</Typography>
            </div> */}
            <Divider style={{ marginTop: 10, marginBottom: 5 }} />
            <Button
              onClick={() => claimWin(historyData['userIndex']-i)}
              className={classes.cardTitle}
              style={{ color: "gray", fontSize: 16 }}
            >
              Claim
            </Button>
            {/* <div className={classes.globalDiv} style={{ marginTop: 10 }}>
              <Typography className={classes.cardText}>
                Opening block
              </Typography>

              <Typography className={classes.cardText}>1000</Typography>
            </div>
            <div className={classes.globalDiv} style={{ marginTop: 10 }}>
              <Typography className={classes.cardText}>
                Closing block
              </Typography>

              <Typography className={classes.cardText}>2000</Typography>
            </div> */}
          </Container>
        </SuperEllipse>
      )
    }
    return arr;
  }

  return (
    <Drawer
      transitionDuration={800}
      classes={{ paper: classes.paper }}
      anchor="right"
      open={open}
      onClose={() => setOpen(!open)}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 15 }}
        >
          <img src={back} alt="" onClick={() => setOpen(!open)} />
          <Typography
            className={classes.cardText}
            style={{ fontSize: 28, color: "#393E49", marginLeft: 10 }}
          >
            History
          </Typography>
        </div>
        <div
          onClick={() => getHistoryData()}
          className={classes.directionDiv}
          style={{ background: "#40CFAA" }}
        >
          <Typography
            className={classes.cardTitle}
            style={{ color: "white", fontSize: 16 }}
          >
            Refresh History
          </Typography>
        </div>
        {populateHistory()}
      </Container>
    </Drawer>
  );
};

export default History;
