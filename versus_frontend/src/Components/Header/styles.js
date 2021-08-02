import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "black",
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 28,
    cursor: "context-menu",
  },
  subtitle: {
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 16,
    cursor: "context-menu",
    "&:hover": {
      color: 'rgba(255, 255, 255, 1) !important',
      cursor: "pointer",
    },
  },
  button: {
    backgroundColor: "#242937",
    borderRadius: "26px",
    marginRight: "6%",
    paddingRight: 26,
    paddingLeft: 26,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.7)",
    },
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
  },
  containerPages: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "black",
  },
  itemMenu: {
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 18,
  },
  divConnect: {
    marginRight: "6%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 177,
    height: 58,
    background: "linear-gradient(180deg, #FFC979 0%, #FCAC37 100%)",
    boxShadow: "box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    borderBottomColor: "#FF8F28",
    borderBottomWidth: 5,
    borderBottomStyle: "solid",
  },
  textConnect: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "white",
  },
  iconHover: {
    cursor: "pointer",
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      opacity: 0.6,
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
}));

export { useStyles };
