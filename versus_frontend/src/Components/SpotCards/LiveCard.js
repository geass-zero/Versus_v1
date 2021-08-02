import React from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const LiveCard = () => {
  const classes = useStyles();

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
            LAST PRICE
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
              $4564.564
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
                $4564.564
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
              $4564.564
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
