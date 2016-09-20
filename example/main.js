/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

// load example component
import Example from './example';

require('babel/polyfill');

ReactDOM.render(<Example />, document.getElementById('app'));
