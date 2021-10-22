import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import SuperEllipse, { Preset } from "react-superellipse";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { claimStarter } from "../../utils/Contracts";

const StarterClaim = () => {
  const classes = useStyles();
  const container = {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
    fontFamily: "Arial",
    position: "fixed",
    top: "30%",
    width: "100%",
    height: "450px",
    zIndex: "100",
    borderRadius: 10,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "1s ease-in-out"
  };

  const NFTImage = {
    // backgroundColor: "gray",
    padding: "10px",
    fontFamily: "Arial",
    position: "relative",
    display: 'inline-block',
    margin: '0 auto',
    marginTop: 50,
    marginRight: 10,
    width: "200px",
    height: "260px",
    zIndex: "100",
    cursor: 'pointer'
  };
//   const [currentPrice, setCurrentPrice] = useState(10000);
//   const [targetPrice, setTargetPrice] = useState(0);
  
  /** Uses `URL.createObjectURL` free returned ObjectURL with `URL.RevokeObjectURL` when done with it.
 * 
 * @param {string} cid CID you want to retrieve
 * @param {string} mime mimetype of image (optional, but useful)
 * @param {number} limit size limit of image in bytes
 * @returns ObjectURL
 */

    // async function loadImgURL(cid, mime, limit) {
    //     if (cid == "" || cid == null || cid == undefined) {
    //         return;
    //     }
    //     for await (const file of ipfs.get(cid)) {
    //         if (file.size > limit) {
    //             return;
    //         }
    //         const content = [];
    //         if (file.content) {
    //             for await(const chunk of file.content) {
    //                 content.push(chunk);
    //             }
    //             return URL.createObjectURL(new Blob(content, {type: mime}));
    //         }
    //     }
    // }

  async function claimMonster(index) {
    await claimStarter(index);
    document.getElementById("c-Div").style.display = 'none';
      // setIsEntered(await getEntryStatus());
  }   

//   async function setImage() {
//     // just an example, make sure to free the resulting ObjectURL when you're done with it
//     //
//     // if your CID doesn't work, try this one: Qmcm32sVsMYhURY3gqH7vSQ76492t5Rfxb3vsWCb35gVme
//     // that's a popular CID, which should resolve every time
//     document.getElementById("monster1").src = await loadImgURL("QmQznHKPVgBWhmD7BvtN11XreJhHeALZbCrqYWvw8rUNRt", "image/png", 524288);
// }

  useEffect(() => {
          
      async function load() {

      }
      
      load()
  }, []);

  return (
    <div id="c-Div" style={container}>
        <Typography className={classes.cardTitle} >Claim your starter monster!</Typography>
        <div
            id="monster1"
             onClick={() => claimMonster(1)} style={NFTImage}>
            <img 
                style={{height:'100%'}}
                src="https://versus.mypinata.cloud/ipfs/QmVdHSeEkVyxwYksd4yNkPdBmQ7f3quexehMWHy1rpp9XP"></img>
        </div>
        <div onClick={() => claimMonster(2)} style={NFTImage}>
        <img 
            style={{height:'100%'}}
            src="https://versus.mypinata.cloud/ipfs/Qmc8i97qJsnJZXgkZuj74ZpETWJNG2JfLH5m7JrboGwDNd"></img>
        </div>
        <div onClick={() => claimMonster(3)} style={NFTImage}>
        <img 
            style={{height:'100%'}}
            src="https://versus.mypinata.cloud/ipfs/QmbXbPk19KEoHbfKjunEKoNjciyqDRpEdu6mw5h7qq86Zq"></img>
        </div>
    </div>
  );
};

export default StarterClaim;
