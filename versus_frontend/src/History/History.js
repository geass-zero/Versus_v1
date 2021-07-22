import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import history from "../img/history.png";
import back from '../img/back.png';

const classStyle = makeStyles((theme) => ({
  cardStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 100,
  },
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "#393E49",
  },
  cardText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
    color: "#242937",
  },
  globalDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  directionDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "3px 20px 3px 20px",
    borderRadius: 32,
  },
  paper: {
    borderRadius: "32px 0px 0px 32px",
    border: "3px solid #FCAC37"
  }
}));

const History = () => {
  const classes = classStyle();
  const [open, setOpen] = useState(false);
  return (
    <div style={{position: 'absolute', right: 0, top: 0, marginTop: 200, marginRight: 100}}>
      <img src={history} alt="" onClick={() => setOpen(!open)} />
      <Drawer classes={{paper : classes.paper}} anchor="right" open={open} onClose={() => setOpen(!open)}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 15}}>
            <img src={back} alt="" onClick={() => setOpen(!open)}/>
          <Typography
            className={classes.cardText}
            style={{ fontSize: 28, color: "#393E49", marginLeft:  10 }}
          >
            History
          </Typography>
          </div>
          <SuperEllipse
            r1={0.02}
            r2={0.2}
            style={{
              minWidth: 457,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: 10,
            }}
          >
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Typography className={classes.cardTitle}>Round 10</Typography>
              <Typography
                className={classes.cardTitle}
                style={{ fontSize: 16, color: "#828282" }}
              >
                Your result: +0.6
              </Typography>
              <div className={classes.globalDiv} style={{ marginTop: 20 }}>
                <Typography className={classes.cardText}>
                  Your Direction
                </Typography>
                <div
                  className={classes.directionDiv}
                  style={{ background: "#40CFAA" }}
                >
                  <Typography
                    className={classes.cardTitle}
                    style={{ color: "white", fontSize: 16 }}
                  >
                    UP
                  </Typography>
                </div>
              </div>
              <div className={classes.globalDiv} style={{ marginTop: 20 }}>
                <Typography className={classes.cardText}>
                  Your position
                </Typography>

                <Typography className={classes.cardText}>+0.8</Typography>
              </div>
              <div className={classes.globalDiv} style={{ marginTop: 10 }}>
                <Typography className={classes.cardText}>
                  Your result
                </Typography>

                <Typography className={classes.cardText}>+0.8</Typography>
              </div>
              <Divider style={{ marginTop: 10, marginBottom: 5 }} />
              <div className={classes.globalDiv} style={{ marginTop: 10 }}>
                <Typography className={classes.cardText}>
                  Closing price
                </Typography>

                <Typography className={classes.cardText}>$600.00</Typography>
              </div>
              <div className={classes.globalDiv} style={{ marginTop: 10 }}>
                <Typography className={classes.cardText}>
                  Your result
                </Typography>

                <Typography className={classes.cardText}>70.5 BNB</Typography>
              </div>
              <Divider style={{ marginTop: 10, marginBottom: 5 }} />
              <div className={classes.globalDiv} style={{ marginTop: 10 }}>
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
              </div>
            </Container>
          </SuperEllipse>
        </Container>
      </Drawer>
    </div>
  );
};

export default History;
