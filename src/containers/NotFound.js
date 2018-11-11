import React from "react";
import "./NotFound.css";
import { withStyles, Typography } from "@material-ui/core";

const styles = {
  root: {
    textAlign: "center",
    padding: "60px"
  }
};

export default withStyles(styles)(props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h4">Sorry, page not found</Typography>
    </div>
  );
});
