'use strict';
//polyfill for Object.assign
require('babel/register');

import React, {Component} from 'react';

import D3Container from './CoreComponent/d3container';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
let reducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

const store = createStoreWithMiddleware(reducer);

export default class mainClass extends Component {
  render() {
    return (<Provider store={store}>
      {() => <D3Container {...this.props} dispatch={store.dispatch}/>}
    </Provider>)
  }
}
