import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import SpinningIcon from "./components/SpinningIcon";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

const AsyncHome = lazy(() => import("./containers/Home"));
const AsyncLogin = lazy(() => import("./containers/Login"));
const AsyncSignup = lazy(() => import("./containers/Signup"));
const AsyncResetPassword = lazy(() => import("./containers/ResetPassword"));
const AsyncSettings = lazy(() => import("./containers/Settings"));
const AsyncChangePassword = lazy(() => import("./containers/ChangePassword"));
const AsyncChangeEmail = lazy(() => import("./containers/ChangeEmail"));
const AsyncNotFound = lazy(() => import("./containers/NotFound"));

export default ({ childProps }) => (
  <Suspense
    fallback={
      <div className="spinningContainer">
        <SpinningIcon />
      </div>
    }
  >
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
      <Route component={props => <AsyncNotFound {...props} />} />
    </Switch>
  </Suspense>
);
