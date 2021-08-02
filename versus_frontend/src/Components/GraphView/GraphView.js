import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { AdvancedChart } from "react-tradingview-embed";
import { Container } from "@material-ui/core";

const GraphView = () => {
  const classes = useStyles();

  const [width, setWidth] = useState(window.innerWidth * 0.85);
  const [height, setHeight] = useState(window.innerHeight * 0.6);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.screen.width * 0.85;
      setWidth(newWidth);
      const newHeight = window.innerHeight * 0.6;
      setHeight(newHeight);
      console.log("updating height");
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);


  return (
    <Container maxWidth="lg" className={classes.mainDiv}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <AdvancedChart
          key={width}
          widgetProps={{
            theme: "dark",
            style: "1",
            width,
            height,
            interval: "5",
            timezone: "Etc/UTC",
            symbol: "COINBASE:BTCUSD",
          }}
        />
      </div>
    </Container>
  );
};

export default GraphView;
