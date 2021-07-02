import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import AuthPagesLayout, { useAuthLayoutStyles } from "./layout/AuthPagesLayout";

const useStyles = makeStyles(theme => ({
  root: {
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
  },
}));

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const authClasses = useAuthLayoutStyles();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthPagesLayout>
      <Grid container justify="center" className={classes.root}>
        <Grid container item alignItems="center" className={authClasses.headerAction}>
          <Typography>Don’t have an account?</Typography>
          <Button onClick={() => history.push("/register")}>Create account</Button>
        </Grid>
        <Box className={classes.formWrapper}>
          <Typography variant="h2" className={authClasses.pageTitle}>Welcome back!</Typography>

          <form onSubmit={handleLogin}>
            <Grid container className={classes.formFields} spacing={2}>
              <Grid item>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <Grid item>  
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    label="Password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>
              </Grid>
              <Grid container justify="center">
                <Button type="submit" className={authClasses.primaryBtn}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </AuthPagesLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
