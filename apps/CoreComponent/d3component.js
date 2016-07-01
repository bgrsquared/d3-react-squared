import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

// some examples
import { barChart } from '../charts/barChart';
import { pieChart } from '../charts/pieChart';
import { lineChart } from '../charts/lineChart';

export default class D3Component extends Component {
  constructor() {
    super();
    this.state = {
      chartObject: {},
      lastEvent: 0,
      chartStyle: { // svg-container
        display: 'block',
        position: 'relative',
        width: '100%',
        paddingBottom: '50%', // adjust below for other aspect ratios!
        verticalAlign: 'middle',
        overflow: 'hidden',
      },
    };
  }

  componentDidMount() {
    // create new chart
    this.createNewChart.call(this, this.props.chartType, this.props);
  }

  componentWillReceiveProps(newProps) {
    const { chartObject, lastEvent } = this.state;
    const { chartType } = this.props;
    const { eventData } = newProps;

    // we check if we need to create a new chart or update the existing one
    if (!chartObject.mainFunction ||
      newProps.chartType !== chartType) {
      this.createNewChart.call(this, newProps.chartType, newProps);
    } else if (lastEvent === 0 || eventData.timeStamp <= lastEvent) {
      chartObject.updateFunction(newProps.data, newProps.params);
    }

    // Redux Events
    if (eventData.timeStamp > lastEvent) {
      this.incomingEvent(eventData, ['default']);
    }

    // update timestamp
    this.setState({ lastEvent: eventData.timeStamp });
  }

  shouldComponentUpdate(newProps) {
    return (newProps.eventData.timeStamp <= this.state.lastEvent);
  }

  componentWillUnmount() {
    const { chartObject } = this.state;
    if (chartObject.destroyFunction) {
      chartObject.destroyFunction();
    }
  }

  incomingEvent(obj) {
    const { data, event, eventGroup } = obj;
    const { highlightListen, highlight } = this.props;
    const { chartObject } = this.state;
    // check if you have an overlap between highlightEmit and highlightListen
    const listenGroups = highlightListen;
    const intersection = eventGroup.filter(n => listenGroups.indexOf(n) !== -1);

    if (intersection.length && highlight && chartObject.onEvent) {
      chartObject.onEvent({
        d: data,
        e: event,
      });
    }
  }

  createNewChart(chartPrototype, props) {
    const { paddingBottom, setEvent } = this.props;

    // clean up existing stuff
    d3.select(ReactDOM.findDOMNode(this)).select('#d3graphSVG').remove();
    // Create afresh
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
      chartStyle: Object.assign({}, this.state.chartStyle, { paddingBottom }),
    });

    // and create it:
    chartObject.mainFunction(d3.select(ReactDOM.findDOMNode(this)),
      props.data, props.params, this);
  }

  handleChartEvent(d, event) {
    const { onChartEvent, highlightEmit } = this.props;
    // call action
    if (onChartEvent) {
      onChartEvent(d, event);
    }

    // redux
    const eventObj = {
      data: d,
      event,
      eventGroup: highlightEmit,
    };
    this.props.setEvent(eventObj);
  }

  render() {
    const { paddingBottom } = this.props;
    let { chartStyle } = this.state;
    if (paddingBottom) {
      chartStyle = Object.assign({}, chartStyle, { paddingBottom });
    }
    return (<div
      style={chartStyle}
    />);
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
  highlightListen: ['default'],
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
