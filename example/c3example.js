'use strict';

import React, {Component} from 'react';
import c3 from 'c3';

export default class C3Example extends Component {
  componentDidMount() {
    let chart = c3.generate({
      bindto: '#hui2',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  }

  render() {
    return (
      <div id='hui2'>
      </div>
    );
  }
}