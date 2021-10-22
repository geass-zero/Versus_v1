import React from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";

import shibachu from "../../img/shibachu.gif";
import Card from "react-animated-3d-card";

const PokeCard = () => {
  const classes = useStyles();

  return (
    <div style={{padding: 35, background: 'transparent'}}>
    <Card>
      <SuperEllipse r1={0.05} r2={0.2} className={classes.pokeCard}>
        <div className={classes.cardTitleStyle}>
          <Typography className={classes.cardTitle}>VERSUSMON</Typography>
        </div>
        <div>
          {/* <img src={shibachu} alt="" width={280} height={280} /> */}
        </div>
      </SuperEllipse>
    </Card>
    </div>
  );
};

export default PokeCard;
