import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import Home from "@material-ui/icons/Home";
import { withStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";

import Routes from "./Routes";

const styles = {
  root: {
    flexGrow: 1
  },
  appbarRight: {
    marginLeft: "auto"
  },
  appbarLeft: {}
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async e => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props;

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.appbarLeft}
                color="inherit"
                component={Link}
                to="/"
              >
                <Home />
              </IconButton>
              <section className={classes.appbarRight}>
                {this.state.isAuthenticated ? (
                  <Fragment>
                    <Button component={Link} to="/settings" color="inherit">
                      Settings
                    </Button>
                    <Button color="inherit" onClick={this.handleLogout}>
                      Logout
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Button component={Link} to="/signup" color="inherit">
                      Signup
                    </Button>
                    <Button component={Link} to="/login" color="inherit">
                      Login
                    </Button>
                  </Fragment>
                )}
              </section>
            </Toolbar>
          </AppBar>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

const enhance = compose(
  withStyles(styles),
  withRouter
);

export default enhance(App);
