import CssBaseline from "@material-ui/core/CssBaseline";
import {
  ThemeProvider,
  makeStyles,
  createTheme,
} from "@material-ui/core/styles";
import Router from "./routes/Router";
import { useHistory } from "react-router-dom";
import { montserrat, montserratSemiBold, montserratBold } from "./Theme";
import { useEffect } from "react";

const customTheme = createTheme({
  overrides: {
    typography: {
      fontFamily: ["Montserrat, MontserratSemiBold, MontserratBold"].join(","),
    },
    MuiCssBaseline: {
      "@global": {
        "@font-face": [montserratSemiBold, montserratBold, montserrat],
      },
    },
  },
});

const classStyle = makeStyles((theme) => ({
  circleBackground: {
    position: "absolute",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "50%",
    [theme.breakpoints.up("lg")]: {
      width: 1006,
      height: 1006,
      left: "-163px",
      top: "-203px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: 846,
      height: 846,
      left: "-123px",
      top: "-180px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: 826,
      height: 826,
      left: "-183px",
      top: "-180px",
    },
    [theme.breakpoints.only("xs")]: {
      width: 450,
      height: 450,
      left: "-163px",
      top: "-160px",
    },
  },
}));

const App = () => {
  const history = useHistory();


  useEffect(() => {
    history.push("/");
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline>
        <div
          style={{
            background:
              "linear-gradient(162.59deg, #F73EF8 -1.89%, #480848 86.03%)",
            width: "100%",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <Router />
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
