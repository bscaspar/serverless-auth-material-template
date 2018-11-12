import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { withStyles, Grid } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "60px"
  },
  button: {
    margin: theme.spacing.unit*.5
  }
})

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={1} sm={3} md={4} />
        <Grid item xs={10} sm={6} md={4} >
          <LoaderButton component={Link} to="/settings/email" className={classes.button} variant="contained" color="primary" text="Change Email" />
          <LoaderButton component={Link} to="/settings/password" className={classes.button} variant="contained" color="primary" text="Change Password" />
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </Grid>
      );
  }
}

export default withStyles(styles)(Settings);