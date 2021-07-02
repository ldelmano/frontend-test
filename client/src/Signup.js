import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
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
  const authClasses = useAuthLayoutStyles();
  const classes = useStyles();

  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthPagesLayout>
      <Grid container justify="center" className={classes.root}>
        <Grid container item alignItems="center" className={authClasses.headerAction}>
          <Typography>Already have an account?</Typography>
          <Button onClick={() => history.push("/login")}>Login</Button>
        </Grid>
        <Box className={classes.formWrapper}>
          <Typography variant="h2" className={authClasses.pageTitle}>Create an account.</Typography>

          <form onSubmit={handleRegister}>
            <Grid container className={classes.formFields} spacing={2}>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid container justify="center">
                <Button type="submit" className={authClasses.primaryBtn}>
                  Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
