import React from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import akita from "../../img/akita.png";
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const classStyle = makeStyles((theme) => ({
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "#828282",
  },
  cardTitleStyle: {
    boxShadow: "inset 0px -4px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: "0px 0px 16px 16px",
    background: "#F2F2F2",
    minWidth: 176,
    textAlign: "center",
  },
  divUp: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    marginTop: 12,
    height: 85,
    background: "#F2F2F2",
    borderRadius: "32px 32px 8px 8px",
  },
  divDown: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    marginTop: 12,
    height: 85,
    background: "#F2F2F2",
    borderRadius: "8px 8px 32px 32px",
    marginBottom: 19,
  },
  payoutText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
    color: "#E0E0E0",
  },
  divMid: {
    display: "flex",
    flexDirection: "column",
    background: "#F2F2F2",
    borderRadius: "16px",
    width: "90%",
    marginTop: 12,
    height: 127,
  },
  globalMidText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
  },
  containerMid: {
    display: "flex",
    flexDirection: "column",
  },
  divMidContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const Card = () => {
  const classes = classStyle();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <SuperEllipse
          r1={0.05}
          r2={0.2}
          style={{
            width: 385,
            minHeight: 385,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
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

        <SuperEllipse
          r1={0.05}
          r2={0.2}
          style={{
            width: 385,
            minHeight: 385,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            marginLeft: 50,
          }}
        >
          <div
            className={classes.cardTitleStyle}
            style={{
              background: "#6E00F8",
            }}
          >
            <Typography
              className={classes.cardTitle}
              style={{ color: "white" }}
            >
              OPEN
            </Typography>
          </div>
          <div className={classes.divUp}>
            <Typography
              className={classes.cardTitle}
              style={{ color: "#40CFAA" }}
            >
              UP
            </Typography>
            <Typography
              className={classes.payoutText}
              style={{ color: "#828282" }}
            >
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
            <Typography
              className={classes.payoutText}
              style={{ color: "#828282" }}
            >
              payout
            </Typography>
            <Typography
              className={classes.cardTitle}
              style={{ color: "#F8574C" }}
            >
              DOWN
            </Typography>
          </div>
        </SuperEllipse>
        <div style={{ marginLeft: 50, position: "relative" }}>
          <SuperEllipse
            r1={0.05}
            r2={0.2}
            style={{
              width: 385,
              minHeight: 385,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className={classes.cardTitleStyle}
              style={{ background: "#F8574C" }}
            >
              <Typography
                className={classes.cardTitle}
                style={{ color: "white" }}
              >
                LIVE
              </Typography>
            </div>
            <div className={classes.divUp} style={{ background: "#40CFAA" }}>
              <Typography
                className={classes.cardTitle}
                style={{ color: "white" }}
              >
                UP
              </Typography>
              <Typography
                className={classes.payoutText}
                style={{ color: "white" }}
              >
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
              <Typography
                className={classes.cardTitle}
                style={{ color: "#F8574C" }}
              >
                DOWN
              </Typography>
            </div>
          </SuperEllipse>
          <div
            style={{
              padding: "9px 34px 9px 34px",
              background: "#6E00F8",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: 96,
              position: "absolute",
              right: 0,
              bottom: 0,
              marginBottom: -15,
              marginRight: -8,
            }}
          >
            <Typography
              className={classes.globalMidText}
              style={{ fontSize: 14, color: "white" }}
            >
              ENTERED
            </Typography>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 60,
        }}
      >
        <SuperEllipse
          r1={0.05}
          r2={0.2}
          style={{
            width: 279,
            height: 311,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            marginLeft: 50,
          }}
        >
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
            <Typography
              className={classes.payoutText}
              style={{ color: "white" }}
            >
              payout
            </Typography>
            <Typography
              className={classes.cardTitle}
              style={{ color: "white" }}
            >
              SEND IT
            </Typography>
          </div>
        </SuperEllipse>
        <SuperEllipse
          r1={0.05}
          r2={0.2}
          style={{
            width: 279,
            height: 311,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            marginLeft: 50,
          }}
        >
            <Container style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', marginTop: 18}}>
              <ArrowBackIcon style={{color: '#FCAC37', marginRight: 5}}/>
                <Typography className={classes.globalMidText}
                  style={{ color: "#242937", fontSize: 18 }}>Send Akita inu</Typography>
              </div>
            <div className={classes.divMidContainer} style={{marginBottom: 10, marginTop: 10}}>
                <Typography
                  className={classes.globalMidText}
                  style={{ color: "#393E49" }}
                >
                  Commit funds
                </Typography>
                <Typography
                  className={classes.globalMidText}
                  style={{ color: "#393E49" }}
                >
                  BNB
                </Typography>
              </div>
            <TextField  variant="outlined" placeholder="0.0"/>
            <Typography className={classes.globalMidText}>Balance 0.0008</Typography>
            <Slider value={0}  aria-labelledby="continuous-slider" />
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#828282",
                  borderRadius: 4,
                  padding: "5px 10px 5px 10px",
                  margin: '5px 5px 5px 0',
                }}
              >
                <Typography
                  className={classes.globalMidText}
                  style={{ color: "white" }}
                >
                  25%
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#828282",
                  borderRadius: 4,
                  padding: "5px 10px 5px 10px",
                  margin: 5,
                }}
              >
                <Typography
                  className={classes.globalMidText}
                  style={{ color: "white" }}
                >
                  50%
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#828282",
                  borderRadius: 4,
                  padding: "5px 10px 5px 10px",
                  margin: 5,
                }}
              >
                <Typography
                  className={classes.globalMidText}
                  style={{ color: "white" }}
                >
                  75%
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#828282",
                  borderRadius: 4,
                  padding: "5px 10px 5px 10px",
                  margin: '5px 0px 5px 5px',
                }}
              >
                <Typography
                  className={classes.globalMidText}
                  style={{ color: "white" }}
                >
                  100%
                </Typography>
              </div>
              </div>
            </Container>
          <div
            className={classes.divDown}
            style={{
              background: "linear-gradient(180deg, #FFC979 0%, #FCAC37 100%)",
              height: 57,
            }}
          >
            <Typography
              className={classes.payoutText}
              style={{ color: "white" }}
            >
              payout
            </Typography>
            <Typography
              className={classes.cardTitle}
              style={{ color: "white" }}
            >
              SEND IT
            </Typography>
          </div>
        </SuperEllipse>
      </div>
    </div>
  );
};

export default Card;
