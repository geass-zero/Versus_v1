import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse from "react-superellipse";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import back from "../../img/back.png";
import { useStyles } from "./styles";

const History = ({ open, setOpen }) => {
  const classes = useStyles();

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
        <SuperEllipse r1={0.02} r2={0.2} className={classes.ellipse}>
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
              <Typography className={classes.cardText}>Your result</Typography>

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
              <Typography className={classes.cardText}>Your result</Typography>

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
  );
};

export default History;
