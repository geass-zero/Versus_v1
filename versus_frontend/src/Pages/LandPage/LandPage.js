import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ReactComponent as TelegramLogo } from "../../img/telegramLogo.svg";
import { ReactComponent as TwitterLogo } from "../../img/twitterLogo.svg";
import { ReactComponent as GitbookLogo } from "../../img/gitbookLogo.svg";
import { ReactComponent as Bitcoin } from "../../img/bitcoin.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Divider } from "@material-ui/core";
import './LandPage.css'
import { useHistory } from 'react-router-dom'

import CardNormal from "../../Components/Cards/CardNormal";
import CardSmall from "../../Components/Cards/CardSmall";
import CardBig from "../../Components/Cards/CardBig";

import { createInstance } from "../../utils/Web3";


const classStyle = makeStyles((theme) => ({
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: 'hidden'
  },
  divHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: "3%",
    marginBottom: "5%",
    zIndex: 5
  },
  title: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "rgba(79, 79, 79, 1)",
  },
  divVersusLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "6%",
    backgroundColor: "white",
    borderRadius: 30,
    padding: "2px 26px 2px 26px ",
    maxWidth: 100,
  },
  divConnect: {
    marginRight: "6%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 177,
    height: 58,
    background: "linear-gradient(180deg, #FFC979 0%, #FCAC37 100%)",
    boxShadow: "box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    borderBottomColor: "#FF8F28",
    borderBottomWidth: 5,
    borderBottomStyle: "solid",
  },
  textConnect: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "white",
  },
  iconHover: {
    cursor: "pointer",
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      opacity: 0.6,
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  divCircle: {
    width: 140,
    height: 140,
    background: "white",
    borderRadius: "50%",
    marginTop: 15,
  },
  divTextBeggin: {
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    width: "45%",
    textAlign: "center",
    marginTop: "1%",
  },
  subText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.5)",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 279,
    height: 58,
    background: "linear-gradient(180deg, #FFC979 0%, #FCAC37 100%)",
    boxShadow: "box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    borderBottomColor: "#FF8F28",
    borderBottomWidth: 5,
    borderBottomStyle: "solid",
  },
  button2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 279,
    height: 58,
    background: "white",
    boxShadow: "box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    borderBottomColor: "#B0ADAA",
    borderBottomWidth: 5,
    borderBottomStyle: "solid",
  },
  divButtons: {
    zIndex:5,
    display: "flex",
    marginTop: "4%",
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
    width: "45%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "95%",
    },
    justifyContent: "space-evenly",
  },
  divOptions: {
    zIndex:5,
    display: "flex",
    marginTop: "2%",
    marginBottom: "2%",
    width: "40%",
    [theme.breakpoints.down("md")]: {
      width: "95%",
      marginTop: "6%",
      marginBottom: "6%",
    },
    justifyContent: "space-evenly",
  },
  divCircle2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 58,
    height: 58,
    background: "white",
    borderRadius: "50%",
    border: "2px solid #EBB438",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  divCardsInfo: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    justifyContent: "space-evenly",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 380,
    [theme.breakpoints.down("md")]: {
      width: 300,
      height: 120,
    },
    height: 140,
    background: "white",
    border: "2px solid #EBB438",
    borderRadius: 32,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: 22,
    },
    fontSize: 24,
    color: "rgba(0, 0, 0, 0.3)",
  },
  cardTextInfo: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: 40,
    },
    fontSize: 48,
    color: "rgba(79, 79, 79, 1)",
  },
  divAboutVersus: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 42,
    border: "2px solid #E0AB30",
    [theme.breakpoints.down("md")]: {
      width: 280,
    },
    width: 382,
    height: 58,
  },
  divInfoAboutVersus: {
    display: "flex",
    marginTop: "3%",
    width: "70%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      marginTop: "6%",
    },
  },
  infoTextVersus: {
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: 17,
    color: "rgba(255, 255, 255, 1)",
  },
}));



const LandPage = () => {
  const classes = classStyle();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const history = useHistory()



  return (
    <div className={classes.mainDiv} >
      <div
      
        style={{
          transform: "matrix(0.5, 0.87, 0.87, -0.5, 0, 0)",
          left: "80%",
          top: "-5%",
          position: "absolute",
        }}
      >
        <CardBig />
      </div>
      <div
        style={{
          transform: "matrix(0.87, -0.5, -0.5, -0.87, 0, 0)",
          left: "1%",
          top: "40%",
          position: "absolute",
        }}
      >
        <CardBig />
      </div>
      <div
        style={{
          left: "20%",
          top: "30%",
          position: "absolute",
        }}
      >
        <CardNormal />
      </div>
      <div
        style={{
          transform: "matrix(0.97, -0.26, -0.26, -0.97, 0, 0)",
          left: "70%",
          top: "30%",
          position: "absolute",
        }}
      >
        <CardNormal />
      </div>
      <div
        style={{
          transform: "matrix(-0.26, -0.97, -0.97, 0.26, 0, 0)",
          left: "35%",
          top: "60%",
          position: "absolute",
        }}
      >
        <CardNormal />
      </div>
      <div
        style={{
          transform: "matrix(0.97, 0.26, 0.26, -0.97, 0, 0)",
          left: "60%",
          top: "20%",
          position: "absolute",
        }}
      >
        <CardSmall />
      </div>
      <div
        style={{
          transform: "matrix(-0.26, -0.97, -0.97, 0.26, 0, 0)",
          left: "40%",
          top: "80%",
          position: "absolute",
        }}
      >
        <CardSmall />
      </div>
      <div
        style={{
          transform: "matrix(-0.26, -0.57, -0.57, 0.26, 0, 0)",
          left: "80%",
          top: "85%",
          position: "absolute",
        }}
      >
        <CardSmall />
      </div>
      <div className={classes.divHeader}>
        <div className={classes.divVersusLogo}>
          <Typography className={classes.title}>versus</Typography>
        </div>
        <div className={`${classes.divConnect} ${classes.iconHover}`} onClick={() => createInstance()}>
          <Typography className={classes.textConnect}>Connect</Typography>
        </div>
      </div>
      <div className={classes.mainDiv}>
        <div className={classes.divCircle} />
        <div className={classes.divTextBeggin}>
          <Typography
            className={classes.textConnect}
            style={{ fontSize: matches ? 40 : 33 }}
          >
            Versus. Decentralised binary options betting for Crypto investors
          </Typography>
        </div>
        <div className={classes.divTextBeggin}>
          <Typography className={classes.subText}>
            Battle each other to win money both by predicting price and through
            NFT gaming
          </Typography>
        </div>
        <div className={classes.divButtons}>
          <div className={`${classes.button} ${classes.iconHover}`} onClick={() => history.push('/versus')}>
            <Typography className={classes.textConnect}>
              Start Playing!
            </Typography>
          </div>
          <div
            className={`${classes.button2} ${classes.iconHover}`}
            style={{ marginTop: matches ? "" : 20 }}
          >
            <Typography
              className={classes.textConnect}
              style={{ color: "rgba(79, 79, 79, 1)" }}
            >
              Buy $VS
            </Typography>
          </div>
        </div>
        <div className={classes.divOptions}>
          <div className={`${classes.divCircle2} ${classes.iconHover}`}>
            <TelegramLogo width={30} height={30} />
          </div>
          <div className={`${classes.divCircle2} ${classes.iconHover}`}>
            <TwitterLogo width={30} height={30} />
          </div>
          <div className={`${classes.divCircle2} ${classes.iconHover}`}>
            <GitbookLogo width={30} height={30} />
          </div>
          <div className={`${classes.divCircle2} ${classes.iconHover}`}></div>
        </div>
        <div className={classes.divCardsInfo}>
          <div className={classes.cardInfo}>
            <Typography className={classes.cardTitle}>
              24 Hour Volume
            </Typography>
            <Typography className={classes.cardTextInfo}>$-</Typography>
          </div>
          <div
            className={classes.cardInfo}
            style={{ marginTop: matches ? "" : "5%" }}
          >
            <Typography className={classes.cardTitle}>Total Players</Typography>
            <Typography className={classes.cardTextInfo}>--</Typography>
          </div>
          <div
            className={classes.cardInfo}
            style={{ marginTop: matches ? "" : "5%" }}
          >
            <Typography className={classes.cardTitle}>
              Biggest payout
            </Typography>
            <Typography className={classes.cardTextInfo}>$-</Typography>
          </div>
        </div>
        <div
          style={{
            width: matches ? "80%" : "90%",
            margin: matches ? "5% 3% 5% 3%" : "8% 3% 8% 3%",
          }}
        >
          <Divider
            variant="middle"
            style={{ background: "rgba(255, 255, 255, 0.3)" }}
          />
        </div>
        <div className={classes.divAboutVersus}>
          <Typography
            className={classes.title}
          >
            About versus
          </Typography>
        </div>
        <div className={classes.divInfoAboutVersus}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: matches ? "flex-start" : "center",
              textAlign: matches ? "left" : "center",
            }}
          >
            <Typography className={classes.infoTextVersus} paragraph>
              The Versus binary options platform is an easy to use price
              prediction platform directly inspired by Pancakeswap’s new price
              prediction feature. Users are able to commit funds to use in
              predictions that have 5 minute expirations. Winning users will
              increase the amount of funds they committed AND also receive
              Versus rewards. Losing users will also receive Versus rewards.
            </Typography>
            <Typography className={classes.infoTextVersus}>
              The timeline for this project’s development will be 1.5 months,
              with all smart contract functionality being supplied by Black
              Zero.
            </Typography>
            <div
              className={`${classes.divCircle2} ${classes.iconHover}`}
              style={{ marginTop: "5%", marginBottom: "5%" }}
            >
              <GitbookLogo width={30} height={30} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: matches ? "2%" : "",
              alignItems: matches ? "flex-start" : "center",
              textAlign: matches ? "left" : "center",
            }}
          >
            <Typography className={classes.infoTextVersus} paragraph>
              The Versus binary options platform is an easy to use price
              prediction platform directly inspired by Pancakeswap’s new price
              prediction feature. Users are able to commit funds to use in
              predictions that have 5 minute expirations. Winning users will
              increase the amount of funds they committed AND also receive
              Versus rewards. Losing users will also receive Versus rewards.
            </Typography>
            <Bitcoin style={{ marginTop: "5%" }} />
          </div>
        </div>
        <div
          style={{
            width: "80%",
            margin: matches ? "5% 3% 5% 3%" : "8% 3% 8% 3%",
          }}
        >
          <Divider
            variant="middle"
            style={{ background: "rgba(255, 255, 255, 0.3)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandPage;
