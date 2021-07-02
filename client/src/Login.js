import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import AuthPagesLayout, { useAuthLayoutStyles } from "./layout/AuthPagesLayout";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: 24,
  },
  form: {
    flexGrow: 1,
    flexDirection: "column"
  }
});

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
      <Grid container justify="center">
        <Box className={classes.root}>
          <Grid container item alignItems="center" className={authClasses.headerAction}>
            <Typography>Don’t have an account?</Typography>
            <Button onClick={() => history.push("/register")}>Create account</Button>
          </Grid>

          <Typography variant="h2" className={authClasses.pageTitle}>Welcome back!</Typography>

          <form onSubmit={handleLogin}>
            <Grid container className={classes.form} spacing={2}>
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
