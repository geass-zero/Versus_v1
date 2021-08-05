import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typeCard: {
    marginTop: 80,
    width: "100%",
    minHeight: 380,
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
    width: 300,
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
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.9)",
  },
}));

export { useStyles };
