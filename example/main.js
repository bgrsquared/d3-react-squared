require('babel/polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

// load example component
import Example from './example';

ReactDOM.render(<Example />, document.getElementById('app'));
