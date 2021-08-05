import React from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import shibachu from "../../../img/shibachu.gif";
import calfire from "../../../img/calfire.gif"
import Card from "react-animated-3d-card";
import level1 from "../../../img/level1.png";
import level2 from "../../../img/level2.png";
import level3 from "../../../img/level3.png";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const WelcomeCard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesMd = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <SuperEllipse r1={0.01} r2={0.1} className={classes.welcomeCard}>
      <div className={classes.cardTitleStyle}>
        <Typography className={classes.cardTitle} style={{ color: "white" }}>
          WELCOME TO VERSUS
        </Typography>
      </div>
      <div className={classes.divText}>
        <Typography className={classes.text}>
          Versus is the first NFT Game in BSC in which traders predict prices
          and battle each other NFT creatures to earn.
        </Typography>
      </div>
      <Container className={classes.firstContainer}>
        <Card
          style={{
            width: matches ? 420 : 350,
            height: matches ? 458 : 400,
            borderRadius: 32,
            marginTop: 50,
            marginBottom: 50,
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            background: "white",
          }}
        >
          <img src={calfire} alt="" height={matches ? 500 : 400} />
        </Card>
        <Card
          style={{
            width: matches ? 420 : 350,
            height: matches ? 458 : 400,
            borderRadius: 32,
            marginTop: matches? 50 : 20,
            marginBottom: 50,
            display: "flex",
            justifyContent: "center",
            flexDirection: 'column',
            alignItems: "center",
            background: "white",
          }}
        >
          <img src={shibachu} alt="" height={matches ? 500 : 400} />
        </Card>
      </Container>
      <Container className={classes.secondContainer}>
        <div className={classes.divText}>
          <Typography className={classes.textLevel}>Level up.</Typography>
          <Typography className={classes.textLevelInfo}>
            Level up your creature for exclusive rewards and bonuses
          </Typography>
        </div>
        <div
         className={classes.containerLevel}
        >
          <Card
            style={{
              width: matchesMd ? 350: 280,
              borderRadius: 32,
              height: 342,
              marginTop: 30,
              marginBottom: 30,
              display: "flex",
              justifyContent: "center",
              flexDirection: 'column',
              alignItems: "center",
              backgroundColor: "white",
              padding:10
            }}
          >
            <img src={level1} alt="" height={200} />
            <Typography className={classes.level}>Level 1</Typography>

          </Card>
          <Card
            style={{
              width: matchesMd ? 350: 280,
              borderRadius: 32,
              height: 342,
              marginTop: 30,
              marginBottom: 30,
              display: "flex",
              justifyContent: "center",
              flexDirection: 'column',
              alignItems: "center",
              background: "white",
              padding:10
            }}
          >
            <img src={level2} alt="" height={200} />
            <Typography className={classes.level}>Level 2</Typography>
          </Card>
          <Card
            style={{
              width: matchesMd ? 350: 280,
              borderRadius: 32,
              height: 342,
              marginTop: 30,
              marginBottom: 30,
              display: "flex",
              justifyContent: "center",
              flexDirection: 'column',
              alignItems: "center",
              background: "white",
              padding:10
            }}
          >
            <img src={level3} alt="" height={200} />
            <Typography className={classes.level}>Level 3</Typography>

          </Card>
        </div>
      </Container>
    </SuperEllipse>
  );
};

export default WelcomeCard;
