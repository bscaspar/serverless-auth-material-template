import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Grid, TextField, withStyles } from "@material-ui/core";
import LoaderButton from "../components/LoaderButton";

const styles = theme => ({
  root: {
    flesGrow: 1,
    marginTop: "60px"
  },
  textField: {
    width: "360px",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      oldPassword: "",
      isChanging: false,
      confirmPassword: ""
    };
  }

  validateForm() {
    return (
      this.state.oldPassword.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleChangeClick = async e => {
    e.preventDefault();

    this.setState({
      isChanging: true
    });

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        this.state.oldPassword,
        this.state.password
      );

      this.props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      this.setState({
        isChanging: false
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={1} sm={3} md={4} />
        <Grid item xs={10} sm={6} md={4}>
          <form onSubmit={this.handleChangeClick}>
            <TextField
              autoFocus
              id="oldPassword"
              type="password"
              label="Old Password"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.oldPassword}
              className={classes.textField}
            />
            <hr />
            <TextField
              type="password"
              id="password"
              label="New Password"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.password}
              className={classes.textField}
            />
            <TextField
              type="password"
              id="confirmPassword"
              label="Confirm New Password"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              className={classes.textField}
            />
            <LoaderButton
              type="submit"
              variant="contained"
              color="primary"
              text="Change Password"
              loadingText="Changing..."
              disabled={!this.validateForm()}
              isLoading={this.state.isChanging}
              className={classes.button}
            />
          </form>
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </Grid>
    );
  }
}

export default withStyles(styles)(ChangePassword);
