import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import SpinningIcon from "./components/SpinningIcon";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

// function myLoadable(opts) {
//   return Loadable(
//     Object.assign(
//       {
//         loading: SpinningIcon,
//         delay: 2000
//       },
//       opts
//     )
//   );
// }
//Loading spinner is buggy at the moment, flashing the spinner despite the delay prop set.

//Enables on-demand route-based loading for file chunks with the Loadable library, which takes advantage of Async file loading and adds a few other features

const AsyncHome = Loadable({
  loader: () => import("./containers/Home"),
  loading: SpinningIcon,
  delay: 500
});
const AsyncLogin = Loadable({
  loader: () => import("./containers/Login"),
  loading: SpinningIcon,
  delay: 500
});
const AsyncSignup = Loadable({
  loader: () => import("./containers/Signup"),
  loading: SpinningIcon
});
const AsyncResetPassword = Loadable({
  loader: () => import("./containers/ResetPassword"),
  loading: SpinningIcon
});
const AsyncSettings = Loadable({
  loader: () => import("./containers/Settings"),
  loading: SpinningIcon
});
const AsyncChangePassword = Loadable({
  loader: () => import("./containers/ChangePassword"),
  loading: SpinningIcon
});
const AsyncChangeEmail = Loadable({
  loader: () => import("./containers/ChangeEmail"),
  loading: SpinningIcon
});
const AsyncNotFound = Loadable({
  loader: () => import("./containers/NotFound"),
  loading: SpinningIcon
});

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={AsyncHome} props={childProps} />
    {/*Unauthenticated routes redirect authenticated users to the authenticated homepage */}
    {/*Authenticated routes redirect unauthenticated users to the login page, with a redirect which will return them to their intended destination once authenticated */}
    <UnauthenticatedRoute
      path="/login"
      exact
      component={AsyncLogin}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={AsyncSignup}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/login/reset"
      exact
      component={AsyncResetPassword}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/settings"
      exact
      component={AsyncSettings}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/settings/password"
      exact
      component={AsyncChangePassword}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/settings/email"
      exact
      component={AsyncChangeEmail}
      props={childProps}
    />

    {/* Catch all Route (404) */}
    <Route component={AsyncNotFound} />
  </Switch>
);
