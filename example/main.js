'use strict';
//polyfill for Object.assign
require('babel/polyfill');

import React from 'react';

//load example component
import Example from './example';
import C3Example from './c3example';
if (window.location.pathname === '/indexExpl.html') {
  React.render(<Example/>, document.getElementById('app'));
} else {
  React.render(<C3Example/>, document.getElementById('app'));
}
