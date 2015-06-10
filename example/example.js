'use strict';

import React from 'react';

let Chart = require('../apps/d3component');

export class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      fakeLineData: [],
      lineInterpolate: 'none'
    };
  }

  handleLineInterpolate(lineInterpolate) {
    this.setState({lineInterpolate});
  }

  componentDidMount() {
    this.fakeLineData();
  }

  fakeLineData() {
    let numberLines = Math.floor(10 * Math.random()) + 1;
    let newData = [];
    for (let i = 0; i < numberLines; i++) {
      let points = new Set();
      for (let j = 0; j < Math.floor(5 * Math.random()) + 3; j++) {
        points.add(Math.floor(10 * Math.random()));
      }
      points = [...points].sort((a, b) => a - b);
      let values = [];
      points.map(x => {
        values.push({x, y: Math.random()});
      });
      newData.push({
        id: i,
        values
      });
    }
    this.setState({fakeLineData: newData});

  }

  render() {
    let fakeData = [{id: 1, value: 5}, {id: 2, value: 10}];
    let interpols =
      ['linear',
        'linear-closed',
        'step',
        'step-before',
        'step-after',
        'basis',
        'basis-closed',
        'bundle',
        'cardinal',
        'cardinal-open',
        'cardinal-closed',
        'monotone'];
    let interpolButtons = [];
    interpols.map(inter => {
      interpolButtons.push(<button
        onClick={this.handleLineInterpolate.bind(this, inter)}>
        {inter}
      </button>);
    });
    return (<div>
      First a show-off (the rest is rather ordinary...
      you might want to check out the playground on the documentary page for more exmampels):
      <hr/>
      <button onClick={this.fakeLineData.bind(this)}>New line data (random)</button>
      <br/>
      {interpolButtons}
      <Chart
        chartType='line'
        data={this.state.fakeLineData}
        paddingBottom='25%'
        params={{
          aspectRatio: 1 / 4,
          yAxisPlacement: 'right',
          interpolate: this.state.lineInterpolate
        }}
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