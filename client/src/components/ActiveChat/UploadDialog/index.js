import React, { useEffect, useState } from "react";
import { 
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  FormControl,
  makeStyles,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import axios from "axios";

import UploadField from "./UploadField";
import ImageList from "./ImageList";

const CLOUD_URL = "http://api.cloudinary.com/v1_1/front-test-lucca/image/upload"

// the primary instance uses the "x-access-token" and it's not allowed for upload request
const AXIOS_INSTANCE = axios.create();

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: "space-between",
    padding: 16
  },
  sendWrapper: {
    position: "relative"
  },
  inputWrapper: {
    marginTop: 24
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonProgress: {
    color: theme.palette.primary,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const UploadDialog = ({ 
  open, 
  message = "",
  onDismiss = () => {}, 
  onSubmit = () => {} 
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [localImages, setLocalImages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setMessageText(event.target.value);
  }

  const handleImageUpload = (imageObj) => {
    setLocalImages(prevImages => [...prevImages, imageObj]);
  }

  const handleRemoveImage = (index) => {
    let localImagesCopy = [...localImages];

    localImagesCopy.splice(index, 1);

    setLocalImages(localImagesCopy);
  }

  const cleanup = () => {
    setLocalImages([]);

    onDismiss();
  }

  const sendImageToCloud = (base64) => {
    return AXIOS_INSTANCE.post(CLOUD_URL, {
      file: base64,
      upload_preset: "zc5jjf4b"
    })
    .then(response => response.data)
    .catch(error => console.error(error));
  }

  const postImages = () => {
    let promises = [];

    setLoading(true);

    for (const image of localImages) {
      const request = sendImageToCloud(image.base64);

      promises.push(request);
    }

    return Promise.all(promises).then(responses => {
      const attachmentsUrl = responses.map(response => response.secure_url)

      setLoading(false);

      return attachmentsUrl;
    });
  } 

  const handleSubmit = async () => {
    const urlList = await postImages();

    const reqBody = {
      text: messageText ? messageText : "",
      attachments: urlList
    }

    onSubmit(reqBody);

    cleanup();
  }

  useEffect(() => {
    setMessageText(message);
  }, [message]);
  
  return (
    <Dialog open={open} onBackdropClick={cleanup} fullScreen={fullScreen}>
      <DialogTitle>Upload images to this conversation</DialogTitle>

      <DialogContent className={classes.content}>
        {!!localImages.length && (
          <ImageList images={localImages} onRemove={handleRemoveImage} />
        )}

        <UploadField onUpload={handleImageUpload} />

        <Box className={classes.inputWrapper}>
          <FormControl fullWidth hiddenLabel>
            <FilledInput 
              classes={{ root: classes.input }}
              value={messageText}
              onChange={handleInputChange}
              disableUnderline
              fullWidth 
              placeholder="Type something..." 
            />
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button onClick={cleanup} color="primary">
          CANCEL
        </Button>
        <div className={classes.sendWrapper}>
          <Button 
            variant="contained"
            onClick={handleSubmit} 
            color="primary" 
            autoFocus
            disabled={loading}
            startIcon={<Send />}
          >
            SEND
          </Button>
          

          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default UploadDialog
