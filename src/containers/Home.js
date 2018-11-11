import React, { Component } from "react";
import { API } from "aws-amplify";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    textAlign: "center",
    padding: "60px"
  }
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    //API call in constructor
    // try {
    //   const notes = await this.notes();
    //   this.setState({ notes });
    // } catch (e) {
    //   alert(e);
    // }

    this.setState({ isLoading: false });
  }

  // notes() {
  //   return API.get("notes", "/notes");
  // }

  renderLander() {
    return (
      <Typography variant="h4">
        Welcome to the unauthenticated home page!
      </Typography>
    );
  }

  renderAuthHome() {
    return (
      <Typography variant="h4">
        Welcome to your authenticated home page!
      </Typography>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.props.isAuthenticated
          ? this.renderAuthHome()
          : this.renderLander()}
      </div>
    );
  }
}
export default withStyles(styles)(Home);
