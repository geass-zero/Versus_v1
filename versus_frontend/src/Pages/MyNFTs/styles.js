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
}));

export { useStyles };
