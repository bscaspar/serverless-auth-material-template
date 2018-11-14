import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { withStyles, TextField, Typography, Grid } from "@material-ui/core";

import LoaderButton from "../components/LoaderButton";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: "60px"
  },
  textField: {
    width: "360px",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={1} sm={3} md={4} />
        <Grid item xs={10} sm={6} md={4}>
          <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              variant="outlined"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              variant="outlined"
            />
            <Link to="/login/reset">
              <Typography variant="caption">Forgot password?</Typography>
            </Link>
            </div>
            <div>
            <LoaderButton
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Login"
              loadingText="Logging in..."
              variant="contained"
              color="primary"
              className={classes.button}
            />
            </div>
          </form>
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
