import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  withStyles
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";

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
    marginTop: theme.spacing.unit * 0.5,
    marginBottom: theme.spacing.unit * 0.5
  },
  buttonSignup: {
    margin: theme.spacing.unit
  },
  buttonGreen: {
    background: green[800],
    color: "#fff"
  },
  dialog: {
    padding: theme.spacing.unit,
    width: "300px"
  }
});

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      emailExists: false
    };

    this.baseState = this.state;

    this.handleFormReset = this.handleFormReset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state === "rerender") {
      this.setState(this.baseState);
    }
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      if (e.code === "UsernameExistsException") {
        this.setState({ emailExists: true });
      } else {
        alert(e.message);
      }
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  handleFormReset() {
    this.setState({
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      emailExists: false
    });
  }

  handleResendConfirmation = async e => {
    try {
      const newUser = Auth.resendSignUp(this.state.email);
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }
  };

  handleModalExit = e => {
    this.setState({
      emailExists: false
    });
  };

  renderConfirmationForm() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <TextField
          autoFocus
          type="tel"
          id="confirmationCode"
          label="Confirmation Code"
          variant="outlined"
          className={classes.textField}
          value={this.state.confirmationCode}
          onChange={this.handleChange}
          helperText={`Please check your email (${
            this.state.email
          }) for the confirmation code.`}
        />
        <div>
          <LoaderButton
            type="submit"
            text="Verify"
            loadingText="Verifying..."
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!this.validateConfirmationForm()}
            isLoading={this.state.isLoading}
          />
        </div>
      </form>
    );
  }

  renderForm() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              autoFocus
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <LoaderButton
              type="submit"
              text="Signup"
              loadingText="Signing up..."
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!this.validateForm()}
              isLoading={this.state.isLoading}
            />
          </div>
        </form>
        <Dialog
          open={this.state.emailExists}
          onBackdropClick={this.handleModalExit}
          onEscapeKeyDown={this.handleModalExit}
        >
          <div className={classes.dialog}>
            <DialogTitle>This email already exists!</DialogTitle>
            <DialogContent>
              <DialogContentText style={{ textAlign: "center" }}>
                Select one of the below options to continue
              </DialogContentText>
            </DialogContent>
            <hr />
            <div style={{ width: "100%" }}>
              <Button
                type="reset"
                label="Signup with different email"
                variant="contained"
                fullWidth
                className={classes.button}
                onClick={this.handleFormReset}
              >
                Signup with different email
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                onClick={this.handleResendConfirmation}
              >
                Resend Confirmation Code
              </Button>
              <Button
                type="button"
                variant="contained"
                fullWidth
                className={`${classes.buttonGreen} ${classes.button}`}
                onClick={this.showLogin}
                component={Link}
                to="/login"
              >
                Go to Login
              </Button>
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={1} sm={3} md={4} />
        <Grid item xs={10} sm={6} md={4}>
          {this.state.newUser === null
            ? this.renderForm()
            : this.renderConfirmationForm()}
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </Grid>
    );
  }
}

export default withStyles(styles)(Signup);
