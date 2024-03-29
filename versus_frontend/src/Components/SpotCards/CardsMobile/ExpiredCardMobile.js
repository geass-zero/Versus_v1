import React from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./stylesMobile";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const ExpiredCardMobile = () => {
  const classes = useStyles();

  return (
    <SuperEllipse r1={0.05} r2={0.2} className={classes.expiredCard}>
      <div className={classes.cardTitleStyle}>
        <Typography className={classes.cardTitle}>EXPIRED</Typography>
      </div>
      <div className={classes.divUp}>
        <Typography className={classes.cardTitle}>UP</Typography>
        <Typography className={classes.payoutText}>payout</Typography>
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
          <Typography
            className={classes.globalMidText}
            style={{ fontSize: 28, color: "#828282" }}
          >
            $4564.564
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
              $4564.564
            </Typography>
          </div>
        </Container>
      </div>
      <div className={classes.divDown}>
        <Typography className={classes.payoutText}>payout</Typography>
        <Typography className={classes.cardTitle}>DOWN</Typography>
      </div>
    </SuperEllipse>
  );
};

export default ExpiredCardMobile;
