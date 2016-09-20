import React from 'react';

import { Main as Wrapper } from '../apps/main';
import PlainComponent from './PlainComponent';

export const WrappedComponent = () => <Wrapper
  component={PlainComponent}
  passThruProp={'passThruProp'}
/>;
