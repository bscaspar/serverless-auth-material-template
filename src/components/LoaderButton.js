import React from "react";
import { Button } from "@material-ui/core";
import Cached from "@material-ui/icons/Cached";
import "./LoaderButton.css";

export default ({
  isLoading,
  text,
  loadingText,
  disabled = false,
  ...props
}) => (
  <Button className="LoaderButton" disabled={disabled || isLoading} {...props}>
    {isLoading && (
      <Cached glyph="refresh" color="inherit" className="spinning" />
    )}
    {!isLoading ? text : loadingText}
  </Button>
);
