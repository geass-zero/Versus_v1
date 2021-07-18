import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "black",
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 28,
    cursor: 'context-menu',
  },
  subtitle: {
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 16,
    cursor: 'context-menu',
    "&:hover": {
      opacity: 0.8,
      cursor: 'pointer',
    },
  },
  button: {
    backgroundColor: "#242937",
    borderRadius: "26px",
    marginRight: '6%',
    paddingRight:26,
    paddingLeft: 26,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.7)",
    },
  },
  buttonText:{
    color: 'white',
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20
  },
  containerPages: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'black',
  }
}));

function Header() {
  const classes = useStyles();
  const history = useHistory()

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "transparent", paddingTop: 20 }} elevation={0}>
        <Toolbar>
          <div style={{marginLeft: '6%', backgroundColor: 'white', borderRadius: 30, padding: '2px 26px 2px 26px '}}
          onClick={()=> history.push('/')}>
          <Typography variant="h6" className={classes.title}>
            versus
          </Typography>
          </div>
          <Container className={classes.containerPages}>
            <Typography className={classes.subtitle}>Spot Marketing</Typography>
            <Typography className={classes.subtitle}>Rug or No rug</Typography>
            <Typography className={classes.subtitle}>Leaderboard</Typography>
            <Typography className={classes.subtitle}>My badges</Typography>
          </Container>
          <Button variant="contained" className={classes.button}>
            <Typography className={classes.buttonText}>Connect</Typography>
          </Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
