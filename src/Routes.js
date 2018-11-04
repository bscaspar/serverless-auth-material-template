import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppliedRoute from './components/AppliedRoute'
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />

        {/* Catch all Route (404) */}
        <Route component={NotFound} />
    </Switch>