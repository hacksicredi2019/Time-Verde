/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Internal from './pages/Internal';
import Main from './pages/Main';
import List from './pages/Main/components/List';

const Routes = (props) => (
  <Switch>
    <Route
      path="/"
      exact
      render={() => (
        <Main {...props} />
      )}
    />
    <Route
      path="/list"
      exact
      render={() => (
        <List {...props} />
      )}
    />
    <Route
      path="/internal"
      exact
      component={Internal}
    />
  </Switch>
);

export default Routes;
