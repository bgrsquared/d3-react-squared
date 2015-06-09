'use strict';

import React from 'react';

let Chart = require('../apps/d3component');

export class Example extends React.Component {
  render() {
    let fakeData = [{id: 1, value: 5}, {id: 2, value: 10}];
    let fakeLineData = [
      {
        id: 1, values: [
        {x: 1, y: 1},
        {x: 2, y: 4},
        {x: 3, y: 2},
        {x: 6, y: 3}
      ]
      },
      {
        id: 2, values: [
        {x: 1, y: 4},
        {x: 3, y: 3},
        {x: 4, y: 8},
        {x: 7, y: 1}
      ]
      },
      {
        id: 3, values: [
        {x: 1, y: 8},
        {x: 2, y: 2},
        {x: 3, y: 8},
        {x: 5, y: 2}
      ]
      }

    ];
    return (<div>
      Scroll down for pie.
      <Chart
        chartType='line'
        data={fakeLineData}
        />
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