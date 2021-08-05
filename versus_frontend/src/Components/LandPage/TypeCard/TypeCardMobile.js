import React from "react";
import Container from "@material-ui/core/Container";
import SuperEllipse from "react-superellipse";
import { useStyles } from "./stylesMobile";
import Typography from "@material-ui/core/Typography";

const TypeCardMobile = ({title, text, img}) => {
   
  const classes = useStyles();

  return (
    <SuperEllipse r1={0.02} r2={0.1} className={classes.typeCard}>
      <div className={classes.cardTitleTypeStyle}>
        <Typography className={classes.cardTitleType}>{title}</Typography>
      </div>
      <Container className={classes.containerTypes}>
        <img src={img} alt="" height={200} style={{marginTop: 40}} />
        <Typography className={classes.typeText}>{text}</Typography>
      </Container>
    </SuperEllipse>
  );
};

export default TypeCardMobile;
