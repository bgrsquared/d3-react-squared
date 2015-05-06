'use strict';

let React = require('react');

//some examples
let barD3 = require('./charts/barChart');
let pieD3 = require('./charts/pieChart');

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
    }
  }

  componentDidMount() {
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

  createNewChart(chartPrototype, props) {
    //clean up existing stuff
    d3.select(React.findDOMNode(this)).select('#d3graphSVG').remove();
    //Create afresh
    let chartObject, paddingBottom;
    switch (chartPrototype) {
      case 'bar':
        chartObject = new barD3;
        paddingBottom = '100%';
        break;
      case 'pie':
        chartObject = new pieD3;
        paddingBottom = '100%';
        break;
      case 'customType':
        //can't use 'let' here... why?
        var customChart = require('./charts/barChart'); //TODO
        chartObject = new customChart;
        paddingBottom = '100%';//this.props.paddingBottom || '100%';
        break;
      default:
        chartObject = new barD3;
        paddingBottom = '100%';
    }

    this.setState({
      chartObject,
      chartStyle: Object.assign({}, this.state.chartStyle, {paddingBottom})
    });

    //and create it:
    chartObject.mainFunction(d3.select(React.findDOMNode(this)), props.data, props.params, this);
  }

  handleChartEvent(d, event) {
    if (this.props.onChartEvent) {
      this.props.onChartEvent(d, event)
    }
  }

  render() {
    return (<div
      style={this.state.chartStyle}
      />)
  }
}

D3Component.defaultProps = {
  params: {},
  chartType: 'bar'
};

module.exports = D3Component;