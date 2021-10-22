import React from "react";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";
import PokeCard from "../../Components/PokeCards/PokeCard";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { getUserData, getEquippedInfo } from "../../utils/Contracts";

const MyNFTs = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainDiv}>
        <Typography className={classes.title}>My NFTs</Typography>
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <ImageList
          gap={1}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            width: '90%',
            overflow: "hidden",
            height: 600,
          }}
        >
          <ImageListItem
            key={"Versusmon"}
            style={{ width: "auto", height: "auto" }}
            cols={1}
            rows={1}
          >
            <PokeCard />
          </ImageListItem>
          
        </ImageList>
      </div>
    </>
  );
};

export default MyNFTs;
