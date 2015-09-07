'use strict';

import React, {Component} from 'react';
import c3 from 'c3';
import DR2 from '../apps/main';

export default class C3Example extends Component {
  render() {
    let c3obj = {
      bindto: '#hui',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25],
          ['data3', -50, -20, -10, -40, -15, -25]
          ]
        }
      };
    return (
      <div>
        <DR2 c3obj={c3obj}/>
      </div>
    );
  }
}