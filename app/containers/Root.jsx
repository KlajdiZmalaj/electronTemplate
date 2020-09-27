import React from 'react';
import { Provider } from 'react-redux';
import Routes from '../Routes';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
);

export default Root;
