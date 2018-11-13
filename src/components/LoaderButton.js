import React from "react";
import { Button } from "@material-ui/core";
import SpinningIcon from "./SpinningIcon";

export default ({
  isLoading,
  text,
  loadingText,
  disabled = false,
  ...props
}) => (
  <Button className="LoaderButton" disabled={disabled || isLoading} {...props}>
    {isLoading && <SpinningIcon />}
    {!isLoading ? text : loadingText}
  </Button>
);
