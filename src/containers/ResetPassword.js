import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { Grid, TextField, Typography, withStyles } from "@material-ui/core";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import green from "@material-ui/core/colors/green";
import LoaderButton from "../components/LoaderButton";
import "./ResetPassword.css";

const styles = theme => ({
  root: {
    flesGrow: 1,
    marginTop: "60px"
  },
  success: {
    textAlign: "center"
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

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      password: "",
      codeSent: false,
      confirmed: false,
      confirmPassword: "",
      isConfirming: false,
      isSendingCode: false
    };
  }

  validateCodeForm() {
    return this.state.email.length > 0;
  }

  validateResetForm() {
    return (
      this.state.code.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSendCodeClick = async e => {
    e.preventDefault();

    this.setState({
      isSendingCode: true
    });

    try {
      await Auth.forgotPassword(this.state.email);
      this.setState({
        codeSent: true
      });
    } catch (e) {
      alert(e.message);
      this.setState({
        isSendingCode: false
      });
    }
  };

  handleConfirmClick = async e => {
    e.preventDefault();

    this.setState({
      isConfirming: true
    });

    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.code,
        this.state.password
      );
      this.setState({
        confirmed: true
      });
    } catch (e) {
      alert(e.message);
      this.setState({
        isConfirming: false
      });
    }
  };

  renderRequestCodeForm() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSendCodeClick}>
        <TextField
          autoFocus
          type="email"
          id="email"
          label="Email"
          value={this.state.email}
          onChange={this.handleChange}
          variant="outlined"
          className={classes.textField}
        />
        <LoaderButton
          type="submit"
          loadingText="Sending..."
          text="Send Confirmation"
          variant="contained"
          color="primary"
          className={classes.button}
          isLoading={this.state.isSendingCode}
          disabled={!this.validateCodeForm()}
        />
      </form>
    );
  }

  renderConfirmationForm() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleConfirmClick}>
        <TextField
          autoFocus
          type="tel"
          id="code"
          label="Code"
          value={this.state.code}
          onChange={this.handleChange}
          variant="outlined"
          className={classes.textField}
          helperText={`Please check your email (${
            this.state.email
          }) for the confirmation code.`}
        />
        <hr />
        <TextField
          type="password"
          id="password"
          label="New Password"
          variant="outlined"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange}
        />
        <TextField
          type="password"
          id="confirmPassword"
          label="Confirm New Password"
          variant="outlined"
          className={classes.textField}
          value={this.state.confirmPassword}
          onChange={this.handleChange}
        />
        <LoaderButton
          type="submit"
          text="Confirm"
          loadingText="Confirm..."
          variant="contained"
          color="primary"
          className={classes.button}
          isLoading={this.state.isConfirming}
          disabled={!this.validateResetForm()}
        />
      </form>
    );
  }

  rendersuccessMessage() {
    const { classes } = this.props;
    return (
      <div className={classes.success}>
        <CheckCircleOutline nativeColor={green[700]} />
        <Typography variant="body1">Your password has been reset.</Typography>
        <p>
          <Link to="/login">
            <Typography variant="body1">
              Click here to login with your new credentials.
            </Typography>
          </Link>
        </p>
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={1} sm={3} md={4} />
        <Grid item xs={10} sm={6} md={4}>
          {!this.state.codeSent
            ? this.renderRequestCodeForm()
            : !this.state.confirmed
            ? this.renderConfirmationForm()
            : this.rendersuccessMessage()}
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </Grid>
    );
  }
}
export default withStyles(styles)(ResetPassword);
