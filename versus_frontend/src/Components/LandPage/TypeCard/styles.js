import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typeCard: {
    marginTop: 100,
    width: 340,
    minHeight: 430,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardTitleTypeStyle: {
    boxShadow: "inset 0px -4px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: "0px 0px 32px 32px",
    background: "#FCAC37",
    width: 257,
    [theme.breakpoints.down("lg")]: {
      width: 150,
    },
    height: 49,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cardTitleType: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 24,
    color: "white",
  },
  containerTypes: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  typeText: {
    marginTop: 15,
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.9)",
  },
}));

export { useStyles };
