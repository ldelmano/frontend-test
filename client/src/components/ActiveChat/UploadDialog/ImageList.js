import React from "react";
import {
  Box,
  Card, 
  CardContent,
  GridList, 
  GridListTile,
  Button, 
  makeStyles } from "@material-ui/core";

  import { Delete } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    justifyContent: "center"
  },
  cardWrapper: {
    height: "100%",
    padding: 16
  },
  card: {
    height: "inherit"
  },
  cardContent: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "inherit",
    boxSizing: "border-box",
    "&:hover > div": {
      display: "block"
    }
  },
  close: {
    display: "none",
    position: "absolute",
    bottom: 16,
    left: "50%",
    transform: "translateX(-50%)"
  },
  img: {
    maxHeight: "100%"
  }
});

const ImageList = ({ images, onRemove = () => {} }) => {
  const classes = useStyles();

  return (
    <GridList className={classes.root}>
      {images.map((image, index) => (
        <GridListTile 
          cols={1}
          className={classes.item} 
          key={`uploaded-image-${index}`}
        >
          <Box className={classes.cardWrapper}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div className={classes.close}>
                  <Button 
                    variant="contained"
                    aria-label="delete image" 
                    color="default"
                    startIcon={<Delete />}
                    onClick={() => onRemove(index)}
                  >
                    REMOVE
                  </Button>
                </div>
                <img 
                  className={classes.img} 
                  src={image.blobUrl} 
                  alt={`Uploaded (${index})`} 
                />
              </CardContent>
            </Card>
          </Box>
        </GridListTile>
      ))}
    </GridList>
  )
}

export default ImageList;