import React from "react";
import { makeStyles, Grid, Box } from "@material-ui/core";
import bannerBg from "../assets/images/bg-img.png";
import bubbleIllustration from "../assets/images/bubble.svg";

export const useAuthLayoutStyles = makeStyles(theme => ({
  root: {
    fontFamily: "Open Sans, sans-serif",
    [theme.breakpoints.up("sm")]: {
      height: "100vh"
    }
  },
  container: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
      width: "auto",
      height: 550,
      overflow: "hidden",
      borderRadius: 4,
      boxShadow: "0 3px 5px 2px rgba(0,0,0,0.1)"
    },
    [theme.breakpoints.up("md")]: {
      alignItems: "flex-start",
      justifyContent: "space-between",
      width: "60%"
    }
  },
  bannerWrapper: {
    position: "relative",
    height: 150,
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      width: 380
    },
    [theme.breakpoints.up("md")]: {      
      width: 425
    }
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
    },
    [theme.breakpoints.up("sm")]: {
      height: "auto",
      padding: 40,
      fontSize: 26,
      textAlign: "center"
    },
    [theme.breakpoints.up("md")]: {
      padding: 56
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
    width: 60,
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      marginBottom: 32
    }
  },
  headerAction: {
    justifyContent: "space-between",
    fontSize: 14,
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end"
    },
    "& p": {
      color: "#b0b0b0"
    },
    "& button": {
      height: 50,
      minWidth: 120,
      padding: 16,
      boxShadow: "0 3px 6px 3px rgba(0,0,0,0.1)",
      color: "#3A8DFF",
      [theme.breakpoints.up("md")]: {
        marginLeft: 16
      }
    },
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
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#3A8DFF"
    },
    [theme.breakpoints.up("lg")]: {
      width: "auto"
    }
  },
  rightContent: {
    height: "100%",
    flexGrow: 1
  },
  form: {
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    padding: 24
  },
  formWrapper: {
    flexGrow: 1,
    [theme.breakpoints.up("lg")]: {
      flexGrow: 0,
      width: "60%",
      maxWidth: 400
    }
  },
  formFields: {
    flexGrow: 1,
    flexDirection: "column"
  }
}));

const AuthPagesLayout = ({ children }) => {
  const classes = useAuthLayoutStyles();

  return (
    <Grid className={classes.root} container justify="center" alignItems="center">
      <Grid className={classes.container}>
        <Box className={classes.bannerWrapper}>
          <Box className={classes.bannerContent}>
            <img src={bubbleIllustration} alt="Bubble Chat" className={classes.bubbleImage} />

            <p>Converse with anyone with any language</p>
          </Box>

          <div className={classes.gradient}></div>
          <img src={bannerBg} alt="Converse with anyone with any language" className={classes.bannerImage}/>  
        </Box>

        <Grid className={classes.rightContent}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AuthPagesLayout
