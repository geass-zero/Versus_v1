import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "white",
  },
  cardTitleStyle: {
    boxShadow: "inset 0px -4px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: "0px 0px 16px 16px",
    background: "#4F4F4F",
    minWidth: 176,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeCard: {
    width: 280,
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
}));

export { useStyles };
