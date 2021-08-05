import React from 'react'
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import Typography from "@material-ui/core/Typography";
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useStyles } from "./stylesMobile";

const TokenBackCardMobile = () => {
    const classes = useStyles();

    return (
        <SuperEllipse
        r1={0.05}
        r2={0.2}
        className={classes.backCard}
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
    )
}

export default TokenBackCardMobile
