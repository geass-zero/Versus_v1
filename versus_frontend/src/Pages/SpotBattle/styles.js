import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "2.5%",
    overflow: 'hidden',
    paddingBottom: 100
  },
  title: {
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 30,
    marginLeft: "6%",
  },
  divHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "6%",
    marginRight: "6%",
    marginTop: 20,
  },
  divSubHeader: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
    height: '100%'
  },
  divPrediction: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 58,
    background: "white",
    border: "2px solid #E0AB30",
    borderRadius: 42,
  },
  titlePrediction: {
    color: "rgba(79, 79, 79, 1)",
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 16,
  },
  divClock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 58,
    height: 58,
    background: "white",
    border: "2px solid #E0AB30",
    borderRadius: "50%",
    marginLeft: 20,
  },
  divArrows: {
    display: "flex",
    justifyContent: "space-between",
    padding: 4,
    alignItems: "center",
    width: 125,
    height: 58,
    background: "white",
    border: "2px solid #E0AB30",
    borderRadius: 42,
    marginLeft: 20,
  },
  divTimer: {
    marginLeft: 20,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  textClock: {
    color: "rgba(79, 79, 79, 1)",
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 30,
    position: "absolute",
    left: 0,
    marginLeft: 30,
    marginTop: 15,
  },
  divGraph: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 58,
    height: 58,
    background: "white",
    border: "2px solid #E0AB30",
    borderRadius: "50%",
    marginLeft: 20,
  },
}));

export { useStyles };
