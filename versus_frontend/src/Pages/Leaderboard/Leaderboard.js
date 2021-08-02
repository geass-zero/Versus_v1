import React from 'react'
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";


const Leaderboard =() => {
    const classes = useStyles();

    return (
        <>
        <div className={classes.mainDiv}>
          <Typography className={classes.title}>Leaderboard</Typography>
        </div>
        </>
    )
}

export default Leaderboard
