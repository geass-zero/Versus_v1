import React from "react";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./stylesMobile";
import Typography from "@material-ui/core/Typography";

const OpenCardMobile = () => {
  const classes = useStyles();

  return (
    <SuperEllipse r1={0.05} r2={0.2} className={classes.openCard}>
      <div
        className={classes.cardTitleStyle}
        style={{
          background: "#6E00F8",
        }}
      >
        <Typography className={classes.cardTitle} style={{ color: "white" }}>
          OPEN
        </Typography>
      </div>
      <div className={classes.divUp}>
        <Typography className={classes.cardTitle} style={{ color: "#40CFAA" }}>
          UP
        </Typography>
        <Typography className={classes.payoutText} style={{ color: "#828282" }}>
          2.5x payout
        </Typography>
      </div>
      <div
        className={classes.divMid}
        style={{ background: "white", justifyContent: "center" }}
      >
        <div
          className={classes.containerMid}
          style={{ alignItems: "center", position: "relative" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              background: "#40CFAA",
              borderRadius: " 16px 16px 0px 0px",
              width: "100%",
              height: 53,
              marginBottom: 13,
            }}
          >
            <Typography
              className={classes.cardTitle}
              style={{ fontSize: 16, color: "white", marginTop: 5 }}
            >
              Enter UP
            </Typography>
          </div>
          <div
            style={{
              background: "#FFFFFF",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 32,
              display: "flex",
              width: "50%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 5,
              position: "absolute",
              left: "50%",
              top: "50%" /* Move 50% from left */,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography
              className={classes.globalMidText}
              style={{ fontSize: 12, color: "#828282" }}
            >
              Prize Pool:
            </Typography>
            <Typography
              className={classes.cardTitle}
              style={{ fontSize: 14, color: "#2F3136" }}
            >
              $4654.654 BNB
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              background: "#F8574C",
              borderRadius: "0px 0px 16px 16px ",
              width: "100%",
              height: 53,
            }}
          >
            <Typography
              className={classes.cardTitle}
              style={{ fontSize: 16, color: "white", marginBottom: 4 }}
            >
              Enter Down
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.divDown}>
        <Typography className={classes.payoutText} style={{ color: "#828282" }}>
          payout
        </Typography>
        <Typography className={classes.cardTitle} style={{ color: "#F8574C" }}>
          DOWN
        </Typography>
      </div>
    </SuperEllipse>
  );
};

export default OpenCardMobile;
