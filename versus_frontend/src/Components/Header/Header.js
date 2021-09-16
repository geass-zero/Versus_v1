import { React, useState, useEffect } from 'react';
import {connectWallet} from '../../../src/utils/Contracts';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory, useParams } from "react-router-dom";
import { useStyles } from "./styles";
import versusLogo from "../../img/versusLogo.png";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { getUserData } from '../../../src/utils/Contracts';
import StarterClaim from '../StarterClaim/StarterClaim';

const CustomList = ({ toggleDrawer, setSelectedPage, setOpen, history }) => {
  const classes = useStyles();

  const handleChange = (type) => {
    history.push(`/versus/${type}`);
    setOpen(false);
  
  };


  return (
    <div
      role="presentation"
      onClick={() => toggleDrawer}
      onKeyDown={() => toggleDrawer}
      style={{
        width: 250,
        background:
          "linear-gradient(162.59deg, #F73EF8 -1.89%, #480848 86.03%)",
        height: "100%",
      }}
    >
      <List>
        <ListItem button key="spot"  onClick={() => handleChange("spotBattle")}>
          <ListItemText>
            <Typography className={classes.itemMenu}>SpotBattle</Typography>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="token"  onClick={() => handleChange("tokenBattle")}>
          <ListItemText>
            <Typography className={classes.itemMenu}>Token Battle</Typography>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="leaderboard"  onClick={() => handleChange("leaderboard")}>
          <ListItemText>
            <Typography className={classes.itemMenu}>Leaderboard</Typography>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="mynfts"  onClick={() => handleChange("mynfts")}>
          <ListItemText>
            <Typography className={classes.itemMenu}>My NFTs</Typography>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const { typeId } = useParams();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [selectedPage, setSelectedPage] = useState("spotBattle");
  const [userWallet, setUserWallet] = useState(0);
  const [hasClaimedStarter, setHasClaimedStarter] = useState(true);

  const handleChange = (type) => {
    history.push(`/Versus/${type}`);
  };

  async function connectAddress() {
    let accounts = await connectWallet();
    setUserWallet(accounts);  
    let userData = await getUserData();
    setHasClaimedStarter(userData['hasClaimedStarter']);
    console.log(userData);
  }

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      {hasClaimedStarter ?
        null 
        :
        <StarterClaim></StarterClaim>
      }
      <AppBar
        position="static"
        style={{ background: "transparent", paddingTop: 20 }}
        elevation={0}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginLeft: "6%" }}>
            <img
              src={versusLogo}
              alt=""
              width={90}
              height="auto"
              onClick={() => (matches ? "" : setOpen(!open))}
            />
          </div>
          {matches && (
            <Container className={classes.containerPages}>
              <Typography
                onClick={() => handleChange("spotBattle")}
                style={{
                  color:
                    typeId === "spotBattle" ? "" : "rgba(255, 255, 255, 0.6)",
                }}
                className={classes.subtitle}
              >
                Spot Battle
              </Typography>
              <Typography
                onClick={() => handleChange("tokenBattle")}
                style={{
                  color:
                    typeId === "tokenBattle" ? "" : "rgba(255, 255, 255, 0.6)",
                }}
                className={classes.subtitle}
              >
                Token Battle
              </Typography>
              <Typography
                onClick={() => handleChange("leaderboard")}
                style={{
                  color:
                    typeId === "leaderboard" ? "" : "rgba(255, 255, 255, 0.6)",
                }}
                className={classes.subtitle}
              >
                Leaderboard
              </Typography>
              <Typography
                onClick={() => handleChange("mynfts")}
                style={{
                  color: typeId === "mynfts" ? "" : "rgba(255, 255, 255, 0.6)",
                }}
                className={classes.subtitle}
              >
                My NFTs
              </Typography>
            </Container>
          )}

          {userWallet && userWallet.length > 0 ?
              <button >...{userWallet[0].substr(userWallet[0].length - 8)}</button>
              :
              <div onClick={() => connectAddress()} className={`${classes.divConnect} ${classes.iconHover}`}>
                <Typography className={classes.textConnect}>Connect</Typography>
              </div>
          }
          
        </Toolbar>
      </AppBar>
      {open && (
        <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
          <CustomList toggleDrawer={toggleDrawer} setOpen={setOpen} history={history}/>
        </Drawer>
      )}
    </div>
  );
}

export default Header;
