import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "#828282",
  },
  cardTitleStyle: {
    boxShadow: "inset 0px -4px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: "0px 0px 16px 16px",
    background: "#F2F2F2",
    minWidth: 176,
    textAlign: "center",
  },
  divUp: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    marginTop: 12,
    height: 85,
    background: "#F2F2F2",
    borderRadius: "32px 32px 8px 8px",
  },
  divDown: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    marginTop: 12,
    height: 85,
    background: "#F2F2F2",
    borderRadius: "8px 8px 32px 32px",
    marginBottom: 19,
  },
  payoutText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
    color: "#E0E0E0",
  },
  divMid: {
    display: "flex",
    flexDirection: "column",
    background: "#F2F2F2",
    borderRadius: "16px",
    width: "90%",
    marginTop: 12,
    height: 127,
  },
  globalMidText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
  },
  containerMid: {
    display: "flex",
    flexDirection: "column",
  },
  divMidContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backCard: {
    width: 279,
    height: 311,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  frontCard: {
    width: 279,
    height: 311,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  
}));

export { useStyles };
