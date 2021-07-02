import React from "react";
import { makeStyles, Grid, Box } from "@material-ui/core";
import bannerBg from "../assets/images/bg-img.png";
import bubbleIllustration from "../assets/images/bubble.svg";

export const useAuthLayoutStyles = makeStyles(theme => ({
  root: {
    fontFamily: "Open Sans, sans-serif",
  },
  bannerWrapper: {
    position: "relative",
    height: 150,
    overflow: "hidden"
  },
  bannerImage: {
    position: "absolute",
    top: 0,
    zIndex: -1
  },
  bannerContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    padding: 24,
    boxSizing: "border-box",
    "& p": {
      margin: 0,
      color: "#ffffff"
    }
  },
  gradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(#3A8DFF, #86B9FF)",
    opacity: 0.85,
  },
  bubbleImage: {
    width: 60
  },
  headerAction: {
    justifyContent: "space-between",
    fontSize: 14,
    "& p": {
      color: "#b0b0b0"
    },
    "& button": {
      height: 50,
      minWidth: 120,
      padding: 16,
      boxShadow: "0 3px 6px 3px rgba(0,0,0,0.1)",
      color: "#3A8DFF"
    }
  },
  pageTitle: {
    margin: "40px 0 24px",
    fontSize: 26,
    fontWeight: 600,
    color: "#000000"
  },
  primaryBtn: {
    height: 50,
    width: "100%",
    minWidth: 120,
    margin: "24px 0 0",
    padding: 16,
    backgroundColor: "#3A8DFF",
    color: "#ffffff"
  }
}));

const AuthPagesLayout = ({ children }) => {
  const classes = useAuthLayoutStyles();

  return (
    <Grid className={classes.root}>
      <Box className={classes.bannerWrapper}>
        <Box className={classes.bannerContent}>
          <img src={bubbleIllustration} alt="Bubble Chat" className={classes.bubbleImage} />

          <p>Converse with anyone with any language</p>
        </Box>

        <div className={classes.gradient}></div>
        <img src={bannerBg} alt="Converse with anyone with any language" className={classes.bannerImage}/>  
      </Box>

      <Grid>
        {children}
      </Grid>
    </Grid>
  )
}

export default AuthPagesLayout
