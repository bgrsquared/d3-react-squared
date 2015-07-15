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

  componentDidMount() {
    this.fakeLineData();
  }

  handleLineInterpolate(lineInterpolate) {
    this.setState({lineInterpolate});
  }

  fakeLineData() {
    let numberLines = Math.floor(10 * Math.random()) + 1;
    let newData = [];

    let sortAsc = function(a, b) {
      return a - b;
    };

    for (let i = 0; i < numberLines; i++) {
      let points = new Set();
      for (let j = 0; j < Math.floor(5 * Math.random()) + 3; j++) {
        points.add(Math.floor(10 * Math.random()));
      }
      points = [...points].sort(sortAsc);

      let values = [];
      for (let ii = 0; ii < points.length; ii++) {
        values.push({x: points[ii], y: Math.random()});
      }

      newData.push({
        id: i,
        values
      });
    }
    this.setState({fakeLineData: newData});

  }

  render() {
    let fakeData = () => {
      return [
        {id: 0, value: 1 + Math.floor(10 * Math.random())},
        {id: 1, value: 1 + Math.floor(10 * Math.random())},
        {id: 2, value: 1 + Math.floor(10 * Math.random())}
      ];
    };

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
        chartType='line'
        data={this.state.fakeLineData}
        paddingBottom='50%'
        params={{
          labelSize: 2,
          strokeWidth: 10,
          aspectRatio: 1 / 2,
          yAxisPlacement: 'right',
          interpolate: this.state.lineInterpolate
        }}
        />

      <div style={{width: '25%', display: 'inline-block'}}>
        <Chart
          data={fakeData()}
          paddingBottom='200%'
          params={{
            colorType: 'category',
            aspectRatio: 2,
            labelSize: 5
          }}
          />
      </div>
      <div style={{width: '50%', display: 'inline-block'}}>
        <Chart
          data={fakeData()}
          params={{
            colorType: 'category',
            labelSize: 2.5
          }}
          />
      </div>
      <div style={{width: '25%', display: 'inline-block'}}>
        <Chart
          data={fakeData()}
          paddingBottom='200%'
          params={{
            colorType: 'category',
            aspectRatio: 2,
            labelSize: 5
          }}
          />
      </div>
      <div style={{width: '50%', display: 'inline-block'}}>
        <Chart
          data={fakeData()}
          paddingBottom='50%'
          params={{
            colorType: 'category',
            aspectRatio: 1 / 2,
            labelSize: 2.5
          }}
          />
      </div>
      <div style={{width: '50%', display: 'inline-block'}}>
        <Chart
          data={fakeData()}
          paddingBottom='50%'
          params={{
            colorType: 'category',
            aspectRatio: 1 / 2,
            labelSize: 2.5
          }}
          />
      </div>

      <Chart
        chartType='pie'
        data={fakeData()}
        />
    </div>);
  }
}