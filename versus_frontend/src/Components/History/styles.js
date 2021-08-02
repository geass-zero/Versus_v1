import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 100,
  },
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "#393E49",
  },
  cardText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
    color: "#242937",
  },
  globalDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  directionDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "3px 20px 3px 20px",
    borderRadius: 32,
  },
  paper: {
    borderRadius: "32px 0px 0px 32px",
    border: "3px solid #FCAC37",
  },
  ellipse: {
    minWidth: 457,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: 10,
  }
}));

export { useStyles };
