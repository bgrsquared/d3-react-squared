import React, { PropTypes } from 'react';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import D3Container from './CoreComponent/d3container';
import wrapper from './CoreComponent/wrapper';

import * as reducers from './reducers';

const reducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

export const Main = (props) => {
  const { component, Loader } = props;
  if (component) { // wrapper
    const Comp = wrapper(component);
    return (<Provider store={store}>
      <Comp
        {...props}
        dispatch={store.dispatch}
      />
    </Provider>);
  } else if (Loader) { // external loader
    return (<Provider store={store}>
      <Loader
        {...props}
        dispatch={store.dispatch}
      />
    </Provider>);
  }
  return (<Provider store={store}>
    <D3Container
      {...props}
      dispatch={store.dispatch}
    />
  </Provider>);
};

Main.defaultProps = {
  component: 0,
};

Main.propTypes = {
  component: PropTypes.any,
  Loader: PropTypes.any,
};
