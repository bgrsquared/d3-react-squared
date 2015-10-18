'use strict';
//polyfill for Object.assign
require('babel/polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

//load example component
import Example from './example';
import C3Example from './c3example';
if (window.location.pathname === '/indexExpl.html') {
  ReactDOM.render(<Example/>, document.getElementById('app'));
} else {
  ReactDOM.render(<C3Example/>, document.getElementById('app'));
}
