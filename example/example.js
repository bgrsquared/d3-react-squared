'use strict';

import React from 'react';

let Chart = require('../apps/d3component');

export class Example extends React.Component {
  render() {
    let fakeData = [{id: 1, value: 5}, {id: 2, value: 10}];
    return (<div>
      Scroll down for pie.
      <Chart
        data={fakeData}
        />
      <Chart
        chartType='pie'
        data={fakeData}
        />
    </div>)
  }
}