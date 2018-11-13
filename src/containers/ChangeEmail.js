import React, { Component } from "react";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
//import "./ChangeEmail.css";
import { Grid, TextField, withStyles } from "@material-ui/core";

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
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class ChangeEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      codeSent: false,
      isConfirming: false,
      isSendingCode: false
    };
  }

  validateEmailForm() {
    return this.state.email.length > 0;
  }

  validateConfirmForm() {
    return this.state.code.length > 0;
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleUpdateClick = async e => {
    e.preventDefault();

    this.setState({
      isSendingCode: true
    });

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: this.state.email });

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
      await Auth.verifyCurrentUserAttributeSubmit("email", this.state.code);
      this.props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      this.setState({
        isConfirming: false
      });
    }
  };

  renderUpdateForm() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.handleUpdateClick}>
        <TextField
          autoFocus
          id="email"
          label="New email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange}
          variant="outlined"
        />
        <LoaderButton
          type="submit"
          text="Update Email"
          loadingText="Updating..."
          disabled={!this.validateEmailForm()}
          isLoading={this.state.isSendingCode}
          variant="contained"
          color="primary"
          className={classes.button}
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
          id="code"
          label="Confirmation Code"
          className={classes.textField}
          value={this.state.code}
          onChange={this.handleChange}
          variant="outlined"
          helperText={`Please check your email (${
            this.state.email
          }) for the confirmation code.`}
        />
        <LoaderButton
          type="submit"
          text="Confirm"
          loadingText="Confirm..."
          isLoading={this.state.isConfirming}
          disabled={!this.validateConfirmForm()}
          variant="contained"
          color="primary"
          className={classes.button}
        />
      </form>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={1} sm={3} md={4} />
        <Grid item xs={10} sm={6} md={4}>
          {!this.state.codeSent
            ? this.renderUpdateForm()
            : this.renderConfirmationForm()}
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </Grid>
    );
  }
}

export default withStyles(styles)(ChangeEmail);
