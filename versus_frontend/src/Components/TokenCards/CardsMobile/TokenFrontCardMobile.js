import React from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import akita from "../../../img/akita.png";
import { useStyles } from "./stylesMobile";

const TokenFrontCardMobile = () => {
  const classes = useStyles();

  return (
    <SuperEllipse r1={0.05} r2={0.2} className={classes.frontCard}>
      <div style={{ marginTop: 12, marginBottom: 5 }}>
        <img src={akita} alt="" />
      </div>
      <Typography
        className={classes.cardTitle}
        style={{ fontSize: 20, color: "#242937" }}
      >
        AKITA INU
      </Typography>
      <div className={classes.divMid} style={{ marginTop: 5 }}>
        <Container
          className={classes.containerMid}
          style={{ marginTop: 5, marginBottom: 5 }}
        >
          <Typography
            className={classes.globalMidText}
            style={{ fontSize: 12, color: "#393E49" }}
          >
            PRICE
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
              style={{ fontSize: 28, color: "#F8574C" }}
            >
              $4564.564
            </Typography>
          </div>
          <Divider style={{ marginTop: 5, marginBottom: 5 }} />
          <div className={classes.divMidContainer}>
            <Typography
              className={classes.globalMidText}
              style={{ color: "#393E49" }}
            >
              Prize Pool:
            </Typography>
            <Typography
              className={classes.globalMidText}
              style={{ color: "#393E49" }}
            >
              800BNB
            </Typography>
          </div>
        </Container>
      </div>
      <div
        className={classes.divDown}
        style={{
          background: "linear-gradient(180deg, #FFC979 0%, #FCAC37 100%)",
          height: 57,
        }}
      >
        <Typography className={classes.payoutText} style={{ color: "white" }}>
          payout
        </Typography>
        <Typography className={classes.cardTitle} style={{ color: "white" }}>
          SEND IT
        </Typography>
      </div>
    </SuperEllipse>
  );
};

export default TokenFrontCardMobile;
