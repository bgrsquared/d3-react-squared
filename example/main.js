'use strict';
//polyfill for Object.assign
require('babel/polyfill');

import React from 'react';

//load example component
import Example from './example.js';
React.render(<Example/>, document.getElementById('app'));