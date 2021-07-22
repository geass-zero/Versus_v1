import MontserratSemiBold from "./fonts/Montserrat-SemiBold.ttf";
import MonteserratMedium from './fonts/Montserrat-Medium.ttf'
import MontserratBold from "./fonts/Montserrat-ExtraBold.ttf";

const montserrat = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "400",
  src: `
   local('Montserrat'),
   local('Montserrat-Regular'),
   url(${MonteserratMedium}) format('truetype')
 `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const montserratSemiBold = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "600",
  src: `
   local('Montserrat'),
   local('Montserrat-SemiBold'),
   url(${MontserratSemiBold}) format('truetype')
 `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const montserratBold = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "800",
  src: `
      local('Montserrat'),
      local('Montserrat-Bold'),
      url(${MontserratBold}) format('truetype')
    `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};


export {montserrat, montserratSemiBold, montserratBold};
