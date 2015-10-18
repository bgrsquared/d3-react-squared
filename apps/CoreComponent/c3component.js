import React, {Component, PropTypes} from 'react';

import c3 from 'c3';

export default class C3Component extends Component {
  constructor() {
    super();
    this.state = {
      chartObject: {},
      chartBoundTo: '',
      lastEvent: 0,
    };
  }

  componentDidMount() {
    this.onMount();
  }

  componentWillReceiveProps(newProps) {
    const {c3obj, eventData} = newProps;
    const {c3fct, c3arg} = c3obj;
    const {chartObject, lastEvent} = this.state;
    if (c3fct !== 'generate') {
      chartObject[c3fct](c3arg);
    }

    // Redux Events
    if (newProps.eventData.timeStamp > lastEvent) {
      this.setState({lastEvent: eventData.timeStamp});
      this.incomingEvent(newProps.eventData, ['default']);
    }
  }

  shouldComponentUpdate(newProps) {
    return (newProps.eventData.timeStamp <= this.state.lastEvent);
  }

  onMount() {
    const {c3obj, setEvent, highlightEmit} = this.props;
    const {c3fct, c3arg} = c3obj;
    const chartObject = c3[c3fct](c3arg);
    const chartBoundTo = (c3arg.bindto).substr(1);
    this.setState({chartObject, chartBoundTo});
    chartObject.setEvent = setEvent;
    chartObject.highlightEmit = highlightEmit;
  }


  incomingEvent(obj) {
    const {data, event, eventGroup} = obj;
    const {highlightListen, highlight} = this.props;
    const {chartObject} = this.state;
    // check if you have an overlap between highlightEmit and highlightListen
    const listenGroups = highlightListen;
    const intersection = eventGroup.filter((n) => {
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
    const {c3obj} = this.props;
    const {bindto} = c3obj.c3arg;
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
  highlightListen: ['default'],
};

C3Component.propTypes = {
  c3obj: PropTypes.object,
  eventData: PropTypes.object.isRequired,
  highlight: PropTypes.bool,
  highlightEmit: PropTypes.array,
  highlightListen: PropTypes.array,
  setEvent: PropTypes.func.isRequired,
};
