import React, { Component } from 'react';

import Wrapper from '../apps/main';
import PlainComponent from './PlainComponent';

export default class WrappedComponent extends Component {
  temp() {
  }

  render() {
    return (<Wrapper
      component={PlainComponent}
      passThruProp={'passThruProp'}
    />);
  }
}
