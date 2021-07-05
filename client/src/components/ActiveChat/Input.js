import React, { Component } from "react";
import { 
  FormControl, 
  FilledInput, 
  InputAdornment, 
  IconButton 
} from "@material-ui/core";
import { PhotoLibraryOutlined } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import UploadDialog from "./UploadDialog";
import { postMessage } from "../../store/utils/thunkCreators";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      uploadDialogOpen: false,
      attachments: []
    };
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    if (event) event.preventDefault();

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: this.state.text,
      recipientId: this.props.otherUser.id,
      conversationId: this.props.conversationId,
      sender: this.props.conversationId ? null : this.props.user,
      attachments: this.state.attachments ? this.state.attachments : null,
    };
    await this.props.postMessage(reqBody);
    this.setState({
      text: "",
    });
  };

  toggleUploadDialog = () => {
    this.setState(state => ({
      uploadDialogOpen: !state.uploadDialogOpen
    }))
  }

  handleImageUpload = async (values) => {
    await this.setState({
      attachments: values.attachments,
      text: values.text
    })

    this.handleSubmit();
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={this.state.text}
            name="text"
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.toggleUploadDialog}
                >
                  <PhotoLibraryOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {this.state.uploadDialogOpen && (
          <UploadDialog 
            open={this.state.uploadDialogOpen} 
            message={this.state.text}
            onDismiss={this.toggleUploadDialog} 
            onSubmit={this.handleImageUpload}
          />
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
