import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  attachedImg: {
    maxHeight: 120
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    overflow: "hidden",
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;
  
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {attachments && !!attachments.length 
        ? (
          <Box className={classes.bubble}>
            <img className={classes.attachedImg} src="https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png" />
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        )
        : (
          <Box className={classes.bubble}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        )
      }
    </Box>
  );
};

export default SenderBubble;
