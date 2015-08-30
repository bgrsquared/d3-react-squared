'use strict';

import React, {Component, PropTypes} from 'react';
import d3 from 'd3';

//some examples
import {barChart} from '../charts/barChart';
import {pieChart} from '../charts/pieChart';
import {lineChart} from '../charts/lineChart';

export default class D3Component extends Component {
  constructor() {
    super();
    this.state = {
      chartObject: {},
      lastEvent: 0,
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

  componentDidMount() {
    //create new chart
    this.createNewChart.call(this, this.props.chartType, this.props);
  }

  componentWillReceiveProps(newProps) {
    let {chartObject, chartStyle, lastEvent} = this.state;
    let {chartType, paddingBottom, eventData} = this.props;

    //we check if we need to create a new chart or update the existing one
    if (!chartObject.mainFunction ||
      newProps.chartType !== chartType) {
      this.createNewChart.call(this, newProps.chartType, newProps);
    } else {
      chartObject.updateFunction(newProps.data, newProps.params);
    }

    //also, check if padding has changed
    if (paddingBottom !== newProps.paddingBottom) {
      this.setState({
        chartStyle: Object.assign({}, chartStyle, {paddingBottom: newProps.paddingBottom})
      });
    }

    //Redux Events
    if (newProps.eventData.timeStamp > lastEvent) {
      this.setState({lastEvent: eventData.timeStamp});
      this.incomingEvent(newProps.eventData, ['default']);
    }
  }

  componentWillUnmount() {
    let {chartObject} = this.state;
    if (chartObject.destroyFunction) {
      chartObject.destroyFunction();
    }
  }

  incomingEvent(obj) {
    let {data, event, eventGroup} = obj;
    let {highlightListen, highlight} = this.props;
    let {chartObject} = this.state;
    //check if you have an overlap between highlightEmit and highlightListen
    let listenGroups = highlightListen;
    let intersection = eventGroup.filter(function(n) {
      return listenGroups.indexOf(n) !== -1;
    });

    if (intersection.length && highlight && chartObject.onEvent) {
      chartObject.onEvent({d: data, e: event});
    }
  }

  createNewChart(chartPrototype, props) {
    let {paddingBottom, setEvent} = this.props;

    //clean up existing stuff
    d3.select(React.findDOMNode(this)).select('#d3graphSVG').remove();
    //Create afresh
    let chartObject;
    switch (chartPrototype) {
      case 'bar':
        chartObject = Object.create(barChart);
        break;
      case 'line':
        chartObject = Object.create(lineChart);
        break;
      case 'pie':
        chartObject = Object.create(pieChart);
        break;
      case 'custom':
        chartObject = Object.create(props.chartModule);
        break;
      default:
        chartObject = Object.create(barChart);
    }

    chartObject.setEvent = setEvent;
    this.setState({
      chartObject,
      chartStyle: Object.assign({}, this.state.chartStyle, {paddingBottom})
    });

    //and create it:
    chartObject.mainFunction(d3.select(React.findDOMNode(this)),
      props.data, props.params, this);

  }

  handleChartEvent(d, event) {
    let {onChartEvent, highlightEmit, setEvent} = this.props;
    //call action
    if (onChartEvent) {
      onChartEvent(d, event);
    }

    //redux
    let eventObj = {data: d, event, eventGroup: highlightEmit};
    this.props.setEvent(eventObj);
  }

  render() {
    return (<div style={this.state.chartStyle}/>);
  }
}

D3Component.defaultProps = {
  params: {},
  chartType: 'bar',
  paddingBottom: '100%',
  chartModule: barChart,
  data: [],
  highlight: true,
  highlightEmit: ['default'],
  highlightListen: ['default']
};

D3Component.propTypes = {
  chartModule: PropTypes.object,
  chartType: PropTypes.string,
  data: PropTypes.array,
  eventData: PropTypes.object.isRequired,
  highlight: PropTypes.bool,
  highlightEmit: PropTypes.array,
  highlightListen: PropTypes.array,
  onChartEvent: PropTypes.func,
  paddingBottom: PropTypes.string,
  params: PropTypes.object,
  setEvent: PropTypes.func.isRequired,
};
