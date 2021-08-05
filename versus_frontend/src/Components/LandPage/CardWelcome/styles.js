import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  welcomeCard: {
    marginTop: 100,
    width: 1070,
    [theme.breakpoints.down("lg")]: {
      width: "90%",
    },
    minHeight: 1450,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 36,
    [theme.breakpoints.down("lg")]: {
      fontSize: 30,
    },
    color: "#828282",
  },
  cardTitleStyle: {
    boxShadow: "inset 0px -4px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: "0px 0px 32px 32px",
    background: "#FCAC37",
    [theme.breakpoints.up("lg")]: {
      minWidth: "655px",
    },

    [theme.breakpoints.down("lg")]: {
      minWidth: "450px",
    },
    height: 75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  divText: {
    marginTop: 25,
    marginBottom: 25,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    width: "80%",
  },
  text: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 22,
    color: "rgba(0, 0, 0, 0.85)",
  },
  firstContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    textAlign: "center",
    background: "#F2F2F2",
    borderRadius: 32,
    width: "90%",
    [theme.breakpoints.between("xs", "sm")]: {
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  secondContainer: {
    marginTop: 40,
    marginBottom: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    background: "#F2F2F2",
    borderRadius: 32,
    width: "90%",
  },
  divCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    borderRadius: 32,
    width: 450,
    height: 458,
    marginTop: 50,
    marginBottom: 50,
  },
  containerLevel:{
    display: "flex",
    alignItems: 'center',
    justifyContent: "space-evenly",
    [theme.breakpoints.between("sm", "md")]: {
      justifyContent: "center",
      flexDirection: "column",
    },
    width: "100%",

  },
  textLevel: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 30,
    color: "rgba(79, 79, 79, 1)",
  },
  textLevelInfo: {
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: 24,
    color: "rgba(79, 79, 79, 1)",
  },
  level: {
    marginTop: 5,
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 24,
    color: "rgba(36, 41, 55, 1)",
  },
}));

export { useStyles };
