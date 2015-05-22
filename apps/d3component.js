'use strict';

import React from 'react';
import d3 from 'd3';

//some examples
import {barChart} from './charts/barChart';
import {pieChart} from './charts/pieChart';
import d3Store from './stores/D3stores.js';
import d3Actions from './actions/D3actions.js';

class D3Component extends React.Component {
  constructor() {
    super();
    this.state = {
      chartObject: {},
      chartStyle: { //svg-container
        display: 'block',
        position: 'relative',
        width: '100%',
        'paddingBottom': '50%', //adjust below for other aspect ratios!
        'verticalAlign': 'middle',
        overflow: 'hidden'
      }
    };
  }

  componentWillUnmount() {
    if (this.state.chartObject.destroyFunction) {
      this.state.chartObject.destroyFunction();
    }
    this.unsubscribe();
  }

  componentDidMount() {
    //load reflux store
    this.unsubscribe = d3Store.listen(this.onStatusChange.bind(this));
    //create new chart
    this.createNewChart(this.props.chartType, this.props);
  }

  componentWillReceiveProps(newProps) {
    //we check if we need to create a new chart or update the existing one
    if (!this.state.chartObject.mainFunction ||
      newProps.chartType !== this.props.chartType) {
      this.createNewChart(newProps.chartType, newProps);
    } else {
      this.state.chartObject.updateFunction(newProps.data, newProps.params);
    }
  }

  onStatusChange(obj) {
    if (this.props.highlight && this.state.chartObject.onEvent) {
      this.state.chartObject.onEvent(obj);
    }
  }

  createNewChart(chartPrototype, props) {
    //clean up existing stuff
    d3.select(React.findDOMNode(this)).select('#d3graphSVG').remove();
    //Create afresh
    let chartObject, paddingBottom;
    switch (chartPrototype) {
      case 'bar':
        chartObject = Object.create(barChart);
        paddingBottom = '100%';
        break;
      case 'pie':
        chartObject = Object.create(pieChart);
        paddingBottom = '100%';
        break;
      case 'custom':
        chartObject = Object.create(props.chartModule);
        paddingBottom = this.props.paddingBottom;
        break;
      default:
        chartObject = Object.create(barChart);
        paddingBottom = '100%';
    }

    this.setState({
      chartObject,
      chartStyle: Object.assign({}, this.state.chartStyle, {paddingBottom})
    });

    //and create it:
    chartObject.mainFunction(d3.select(React.findDOMNode(this)),
      props.data, props.params, this);
  }

  handleChartEvent(d, event) {
    //call action
    d3Actions.d3Event(d, event);
  }

  render() {
    return (<div
      style={this.state.chartStyle}
      />);
  }
}

D3Component.defaultProps = {
  params: {},
  chartType: 'bar',
  paddingBottom: '100%',
  chartModule: barChart,
  data: [],
  highlight: true
};

module.exports = D3Component;