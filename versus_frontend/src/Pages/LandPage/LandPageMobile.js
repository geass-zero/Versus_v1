import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import { ReactComponent as TelegramLogo } from "../../img/telegramLogo.svg";
import { ReactComponent as TwitterLogo } from "../../img/twitterLogo.svg";
import { ReactComponent as GitbookLogo } from "../../img/gitbookLogo.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Container, Divider } from "@material-ui/core";
import "./LandPage.css";
import { useHistory } from "react-router-dom";

import { useStyle } from "./stylesMobile";
import CardNormal from "../../Components/Cards/CardNormal";
import CardSmall from "../../Components/Cards/CardSmall";
import CardBig from "../../Components/Cards/CardBig";

import versusLogo from "../../img/versusLogo.png";
import versusTitle from "../../img/versusTitle.png";
import WelcomeCardMobile from "../../Components/LandPage/CardWelcome/CardWelcomeMobile";
import TypeCardMobile from "../../Components/LandPage/TypeCard/TypeCardMobile";
import NextCardMobile from "../../Components/SpotCards/CardsMobile/NextCardMobile";
import TokenFrontCardMobile from '../../Components/TokenCards/CardsMobile/TokenFrontCardMobile'
import TokenBackCardMobile from "../../Components/TokenCards/CardsMobile/TokenBackCardMobile";

import treasure from "../../img/treasure.png";
import coin from "../../img/coin.png";
import shibachu from "../../img/shibaHardcore.png";

const LandPageMobile = () => {
  const classes = useStyle();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const history = useHistory();
  const [components, setComponents] = useState(null);

  const types = [
    {
      title: "WIN BNB",
      text: "Play other players in spot and token battles for a BNB Payoff",
      img: treasure,
    },
    {
      title: "RANK UP",
      text: "Train your NFT and claim your position on the high scores",
      img: coin,
    },
    {
      title: "TRADE",
      text: "Trade your NFTS for other high rare tiers with other players",
      img: shibachu,
    },
  ];

  useEffect(() => {
    let components = [];
    types.forEach((card) => {
      components.push(
        <TypeCardMobile key={card.title} img={card.img} text={card.text} title={card.title} />
      );
    });
    setComponents(components);
  }, []);

  return (
    <div className={classes.mainDiv}>
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
        
          <div className={`${classes.divPlayNow} ${classes.iconHover}`} onClick={() => history.push("/versus/spotBattle")}>
            <Typography className={classes.textPlayNow}>Play Now</Typography>
          </div>
          <div className={`${classes.divConnect} ${classes.iconHover}`}>
            <Typography className={classes.textConnect}>Connect</Typography>
          </div>
      </div>
      <div className={classes.mainDiv}>
        <Container
          maxWidth="lg"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20,
            width: '90%'
          }}
        >
          <div className={classes.divLogo}>
            <img src={versusLogo} alt="" width={180} />
          </div>
          <div className={classes.divVersusTitle}>
            <img src={versusTitle} alt="" width={400} />
          </div>
          <div className={classes.divVersusTitleSub}>
            <Typography className={classes.subText}>
              The First NFT BattleVerse on BSC
            </Typography>
            <div
              className={`${classes.divConnect} ${classes.iconHover}`}
              style={{ width: 383, marginTop: 25 }}
            >
              <Typography className={classes.textConnect}>
                Contribute to presale
              </Typography>
            </div>
            <Typography
              className={classes.subTextHeader}
              paragraph
              style={{ marginTop: 40 }}
            >
              1.0 BNB = $100,500,000 $VERSUS
            </Typography>
            <Typography className={classes.subTextHeader} paragraph>
              Total sale for 50% of supply
            </Typography>
            <Typography className={classes.subTextHeader}>
              Read Our Gitbook for more infomation on the tokenomics
            </Typography>
          </div>
        </Container>

        <WelcomeCardMobile />

        <Container
          className={classes.containerTypes}
        >
          {components !== null &&
            components.map((component) => {
              return component;
            })}
        </Container>

        <Container className={classes.containerNews}>
          <Typography
            className={classes.title}
            style={{ color: "white", fontSize: 30 }}
          >
            EXCITING FIRST RELEASE
          </Typography>
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              marginTop: 15,
            }}
          >
            <Typography
              className={classes.subText}
              style={{ color: "white", fontSize: 16 }}
            >
              Starting off with a bang. Our first two games in our BattleVerse
              to kick start your journey
            </Typography>
          </div>
          <div className={classes.divNews}>
            <div className={classes.news} style={{ marginBottom: 30 }}>
              <div className={classes.newsText}>
                <Typography className={classes.textTitle}>
                  SpotBattle
                </Typography>
                <Typography
                  className={classes.textSub}
                  style={{ marginTop: 15 }}
                >
                  Traders battle by putting their tokens on the line in a winner
                  take all match between the bulls and the bears
                </Typography>
              </div>
              <NextCardMobile />
            </div>
            <div className={classes.news}>
              <div className={classes.newsText}>
                <Typography className={classes.textTitle}>
                  Token Battle
                </Typography>
                <Typography
                  className={classes.textSub}
                  style={{ marginTop: 15 }}
                >
                  Just like horse racing, traders bet on which meme coin will
                  perform the best in the next hour
                </Typography>
              </div>
              <div style={{ position: "relative", width: "95%", flexGrow: 1 }}>
                <div
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    left: 0,
                    top: 0,
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                >
                  <TokenFrontCardMobile />
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    marginBottom: 30,
                    marginRight: 10,
                    zIndex: 1,
                    opacity: 0.7,
                  }}
                >
                  <TokenBackCardMobile />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className={classes.join}>
          <Typography
            className={classes.title}
            style={{ color: "white", fontSize: 36 }}
          >
            Join the fun
          </Typography>
          <Typography className={classes.textSub} style={{ marginTop: 15 }}>
            Don’t wait on the side lines with this one.
          </Typography>
          <div
              className={`${classes.divConnect} ${classes.iconHover}`}
              style={{ width: 383, marginTop: 25 }}
            >
              <Typography className={classes.textConnect}>
                Contribute to presale
              </Typography>
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
      </div>
      <div className={classes.divOptions}>
        <div className={`${classes.divCircle2} ${classes.iconHover}`}>
          <TelegramLogo width={30} height={30} fill="#4F4F4F"/>
        </div>
        <div className={`${classes.divCircle2} ${classes.iconHover}`}>
          <TwitterLogo width={30} height={30} fill="#4F4F4F"/>
        </div>
        <div className={`${classes.divCircle2} ${classes.iconHover}`}>
          <GitbookLogo width={30} height={30} fill="#4F4F4F"/>
        </div>
        <div className={`${classes.divCircle2} ${classes.iconHover}`}></div>
      </div>
    </div>
  );
};

export default LandPageMobile;
