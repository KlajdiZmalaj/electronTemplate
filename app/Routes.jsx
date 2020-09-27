/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Home from './containers/Home';
import Home2 from './containers/Home2';

export default function Routes({ history }) {
  console.log('history', history);
  return (
    <HashRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/h2" exact component={Home2} />
      </Switch>
    </HashRouter>
  );
}
