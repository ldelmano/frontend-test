import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const UploadField = ({ 
  onUpload = (payload) => console.log(payload)
}) => {
  const classes = useStyles();

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleChange = async (event) => {
    const file = event.target.files[0];

    const base64 = await getBase64(file);

    const blobUrl = URL.createObjectURL(file);

    onUpload({
      base64,
      blobUrl
    })
  }

  return (
    <div className={classes.root}>
      <input 
        className={classes.input} 
        id="upload-image" 
        type="file" 
        accept="image/*" 
        onChange={handleChange} 
      />

      <label htmlFor="upload-image">
        <Button
          variant="outlined" 
          color="primary"
          component="span"
          startIcon={<Add />}
        >
          ADD NEW
        </Button>
      </label>
    </div>
  )
}

export default UploadField
