import React from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./stylesMobile";
import Typography from "@material-ui/core/Typography";
import calfire from "../../../img/calfire.gif";
import Card from "react-animated-3d-card";
import level3 from "../../../img/level3.png";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const WelcomeCardMobile = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <SuperEllipse r1={0.01} r2={0.1} className={classes.welcomeCard}>
      <div className={classes.cardTitleStyle}>
        <Typography className={classes.cardTitle}>WELCOME TO VERSUS</Typography>
      </div>
      <div className={classes.divText}>
        <Typography className={classes.text}>
          Versus is the first NFT Game in BSC in which traders predict prices
          and battle each other NFT creatures to earn.
        </Typography>
      </div>
      <Container className={classes.firstContainer}>
        <div style={{ padding: 20 }}>
          <Card
            style={{
              width: 280,
              height: 250,
              borderRadius: 32,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
            }}
          >
            <div className={classes.cardCow}>
              <Typography className={classes.cardTitleCow}>Calfire</Typography>
            </div>
            <img src={calfire} alt="" height={220} />
          </Card>
        </div>
      </Container>
      <Container className={classes.secondContainer}>
        <div className={classes.divText}>
          <Typography className={classes.textLevel}>Level up.</Typography>
          <Typography className={classes.textLevelInfo}>
            Level up your creature for exclusive rewards and bonuses
          </Typography>
        </div>

        <Card
          style={{
            width: 280,
            borderRadius: 32,
            height: 342,
            marginTop: 10,
            marginBottom: 30,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            padding: 10,
          }}
        >
          <img src={level3} alt="" height={250} />
          <Typography className={classes.level}>Level 3</Typography>
        </Card>
      </Container>
    </SuperEllipse>
  );
};

export default WelcomeCardMobile;
