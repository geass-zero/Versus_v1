import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  divHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: "3%",
    marginBottom: "3%",
    zIndex: 5,
  },
  title: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "rgba(79, 79, 79, 1)",
  },
  divVersusLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "6%",
  },
  divButtonsHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "6%",
  },
  divPlayNow: {
    marginRight: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 177,
    height: 58,
    background: "white",
    boxShadow: "box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    borderBottomColor: "#B0ADAA",
    borderBottomWidth: 5,
    borderBottomStyle: "solid",
  },
  divConnect: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 177,
    height: 58,
    background: "linear-gradient(180deg, #FFC979 0%, #FCAC37 100%)",
    boxShadow: "box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    borderBottomColor: "#FF8F28",
    borderBottomWidth: 5,
    borderBottomStyle: "solid",
  },
  textPlayNow: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "rgba(79, 79, 79, 1)",
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
  divLogo: {
    marginTop: 15,
  },
  divVersusTitle: {
    display:' flex',
    justifyContent: 'center',
    textAlign: "center",
    marginTop: "1%",
  },
  divVersusTitleSub: {
    display:' flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems:'center',
    textAlign: "center",
    marginTop: "1%",
  },
  subText: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.5)",
  },
  subTextHeader: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
  },
  divOptions: {
    zIndex: 5,
    display: "flex",
    marginBottom: "5%",
    width: "40%",
    [theme.breakpoints.down("md")]: {
      width: "95%",
      marginTop: "6%",
      marginBottom: "6%",
    },
    justifyContent: "space-evenly",
  },
  divCircle2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 58,
    height: 58,
    background: "white",
    borderRadius: "50%",
    border: "2px solid #EBB438",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  containerNews:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    marginTop: 100
  },
  divNews: {
    display: 'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
    marginTop: 50
  },
  news:{
    display: 'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 32,
    width: 516,
    minHeight: 750,
    padding: 20
  },
  textTitle:{
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 30,
    color: "white",
  },
  textSub:{
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 22,
    color: "white",
  },
  newsText:{
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'flex-start',
    width: '90%',
    marginBottom: 30
    
  },
  join:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:'center',
    width: '90%',
    textAlign:'center',
    marginTop: 100,
  }
  
}));

export { useStyle };
