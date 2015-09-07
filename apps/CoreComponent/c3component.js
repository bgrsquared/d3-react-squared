'use strict';

import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import c3 from 'c3';

export default class C3Component extends Component {
  constructor() {
    super();
    this.state = {
      chartObject: {},
      chartBoundTo: '',
      lastEvent: 0
    };
  }

  componentDidMount() {
    let {c3obj, setEvent, highlightEmit} = this.props;
    let {c3fct, c3arg} = c3obj;
    let chartObject = c3[c3fct](c3arg);
    let chartBoundTo = (c3arg.bindto).substr(1);
    this.setState({chartObject, chartBoundTo});
    chartObject.setEvent = setEvent;
    chartObject.highlightEmit = highlightEmit;
  }

  componentWillReceiveProps(newProps) {
    let {c3obj, eventData} = newProps;
    let {c3fct, c3arg} = c3obj;
    let {chartObject, lastEvent} = this.state;
    if (c3fct !== 'generate') {
      chartObject[c3fct](c3arg);
    }

    //Redux Events
    if (newProps.eventData.timeStamp > lastEvent) {
      this.setState({lastEvent: eventData.timeStamp});
      this.incomingEvent(newProps.eventData, ['default']);
    }
  }

  shouldComponentUpdate(newProps) {
    return (newProps.eventData.timeStamp <= this.state.lastEvent);
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

    if (intersection.length && highlight) {
      if (event === 'mouseover') {
        chartObject.focus(data.id);
      } else if (event === 'mouseout') {
        chartObject.revert();
      }
    }
  }

  render() {
    let {c3obj} = this.props;
    let {bindto} = c3obj.c3arg;
    let {chartBoundTo} = this.state;
    if (bindto) {
      chartBoundTo = bindto.substr(1);
    }

    return (<div id={chartBoundTo}/>);
  }
}

C3Component.defaultProps = {
  highlight: true,
  highlightEmit: ['default'],
  highlightListen: ['default']
};

C3Component.propTypes = {
  c3obj: PropTypes.object,
  eventData: PropTypes.object.isRequired,
  highlight: PropTypes.bool,
  highlightEmit: PropTypes.array,
  highlightListen: PropTypes.array,
  setEvent: PropTypes.func.isRequired,
};
