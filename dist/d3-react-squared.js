/*! Thanks to all the providers of the components. See the respectivegithub pages for their licenses. */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _d3 = __webpack_require__(2);

	var _d32 = _interopRequireDefault(_d3);

	//some examples

	var _chartsBarChart = __webpack_require__(3);

	var _chartsPieChart = __webpack_require__(4);

	var _chartsLineChart = __webpack_require__(5);

	var _storesD3storesJs = __webpack_require__(6);

	var _storesD3storesJs2 = _interopRequireDefault(_storesD3storesJs);

	var _actionsD3actionsJs = __webpack_require__(30);

	var _actionsD3actionsJs2 = _interopRequireDefault(_actionsD3actionsJs);

	var D3Component = (function (_React$Component) {
	  _inherits(D3Component, _React$Component);

	  function D3Component() {
	    _classCallCheck(this, D3Component);

	    _get(Object.getPrototypeOf(D3Component.prototype), 'constructor', this).call(this);
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

	  _createClass(D3Component, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      //load reflux store
	      this.unsubscribe = _storesD3storesJs2['default'].listen(this.onStatusChange.bind(this));
	      //create new chart
	      this.createNewChart(this.props.chartType, this.props);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      //we check if we need to create a new chart or update the existing one
	      if (!this.state.chartObject.mainFunction || newProps.chartType !== this.props.chartType) {
	        this.createNewChart(newProps.chartType, newProps);
	      } else {
	        this.state.chartObject.updateFunction(newProps.data, newProps.params);
	      }
	      //also, check if padding has changed
	      if (this.props.paddingBottom !== newProps.paddingBottom) {
	        this.setState({
	          chartStyle: Object.assign({}, this.state.chartStyle, { paddingBottom: newProps.paddingBottom })
	        });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.state.chartObject.destroyFunction) {
	        this.state.chartObject.destroyFunction();
	      }
	      this.unsubscribe();
	    }
	  }, {
	    key: 'onStatusChange',
	    value: function onStatusChange(obj, emitGroups) {
	      //check if you have an overlap between highlightEmit and highlightListen
	      var listenGroups = this.props.highlightListen;
	      var intersection = emitGroups.filter(function (n) {
	        return listenGroups.indexOf(n) !== -1;
	      });

	      if (intersection.length && this.props.highlight && this.state.chartObject.onEvent) {
	        this.state.chartObject.onEvent(obj);
	      }
	    }
	  }, {
	    key: 'createNewChart',
	    value: function createNewChart(chartPrototype, props) {
	      //clean up existing stuff
	      _d32['default'].select(_react2['default'].findDOMNode(this)).select('#d3graphSVG').remove();
	      //Create afresh
	      var chartObject = undefined,
	          paddingBottom = undefined;
	      switch (chartPrototype) {
	        case 'bar':
	          chartObject = Object.create(_chartsBarChart.barChart);
	          paddingBottom = this.props.paddingBottom;
	          break;
	        case 'line':
	          chartObject = Object.create(_chartsLineChart.lineChart);
	          paddingBottom = this.props.paddingBottom;
	          break;
	        case 'pie':
	          chartObject = Object.create(_chartsPieChart.pieChart);
	          paddingBottom = this.props.paddingBottom;
	          break;
	        case 'custom':
	          chartObject = Object.create(props.chartModule);
	          paddingBottom = this.props.paddingBottom;
	          break;
	        default:
	          chartObject = Object.create(_chartsBarChart.barChart);
	          paddingBottom = this.props.paddingBottom;
	      }

	      this.setState({
	        chartObject: chartObject,
	        chartStyle: Object.assign({}, this.state.chartStyle, { paddingBottom: paddingBottom })
	      });

	      //and create it:
	      chartObject.mainFunction(_d32['default'].select(_react2['default'].findDOMNode(this)), props.data, props.params, this);
	    }
	  }, {
	    key: 'handleChartEvent',
	    value: function handleChartEvent(d, event) {
	      //call action
	      if (this.props.onChartEvent) {
	        this.props.onChartEvent(d, event);
	      }
	      _actionsD3actionsJs2['default'].d3Event(d, event, this.props.highlightEmit);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement('div', {
	        style: this.state.chartStyle
	      });
	    }
	  }]);

	  return D3Component;
	})(_react2['default'].Component);

	D3Component.defaultProps = {
	  params: {},
	  chartType: 'bar',
	  paddingBottom: '100%',
	  chartModule: _chartsBarChart.barChart,
	  data: [],
	  highlight: true,
	  highlightEmit: ['default'],
	  highlightListen: ['default']
	};

	D3Component.propTypes = {
	  chartModule: _react2['default'].PropTypes.object,
	  chartType: _react2['default'].PropTypes.string,
	  data: _react2['default'].PropTypes.array,
	  highlight: _react2['default'].PropTypes.bool,
	  highlightEmit: _react2['default'].PropTypes.array,
	  highlightListen: _react2['default'].PropTypes.array,
	  onChartEvent: _react2['default'].PropTypes.func,
	  paddingBottom: _react2['default'].PropTypes.string,
	  params: _react2['default'].PropTypes.object
	};

	module.exports = D3Component;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = undefined;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = d3;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var d3 = __webpack_require__(2);

	var barChart = {
	  defaultParams: {
	    size: 1000, // debug switch, for exact values
	    aspectRatio: 1,
	    labelSize: 1,
	    col1: 'green',
	    col2: 'red',
	    defaultDuration: 500,
	    rx: 5,
	    ry: 5,
	    yLabel: 'Value',
	    colorType: 'gradient',
	    colorArray: d3.scale.category20().range(),
	    tooltip: function tooltip(d) {
	      return '<div>ID: ' + d.id + '<br/>Value: ' + d.value + '</div>';
	    }
	  },

	  mainFunction: function mainFunction(loc, data, params, reactComp) {
	    var self = this;
	    this.reactComp = reactComp;

	    self.par = Object.assign({}, this.defaultParams, params);

	    this.size = this.par.size;
	    var labelSize = this.par.labelSize;
	    this.fontSize = labelSize * this.size / 100;

	    this.margin = {
	      top: this.size / 100,
	      right: this.size / 50,
	      bottom: this.fontSize + this.size / 100,
	      left: (1 + labelSize / 10) * 40
	    };
	    this.width = this.size - this.margin.left - this.margin.right;
	    this.height = this.size * this.par.aspectRatio - this.margin.top - this.margin.bottom;
	    this.fullWidth = this.size;
	    this.fullHeight = this.size * this.par.aspectRatio;

	    this.x = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);

	    this.y = d3.scale.linear().range([this.height, 0]);

	    this.xAxis = d3.svg.axis().scale(this.x).innerTickSize(this.size / 250).outerTickSize(this.size / 250).tickPadding(this.size / 250).orient('bottom');

	    this.yAxis = d3.svg.axis().scale(this.y)
	    //.ticks(Math.floor(10 / labelSize))
	    .innerTickSize(this.size / 250).outerTickSize(this.size / 250).tickPadding(this.size / 250).tickFormat(d3.format('s')).orient('left');

	    this.svg = loc.append('svg').attr('id', 'd3graphSVG').style('display', 'inline-block').style('position', 'absolute').attr('preserveAspectRatio', 'xMinYMin slice').attr('viewBox', '0 0 ' + this.fullWidth + ' ' + this.fullHeight).append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

	    this.x.domain(data.map(function (d) {
	      return d.id;
	    }));
	    this.yMax = d3.max(data, function (d) {
	      return d.value;
	    }) || 100;
	    this.y.domain([0, this.yMax]);

	    this.xAx = this.svg.append('g').attr('class', 'x axis').style('stroke-width', this.par.size / 1000 + 'px').style('font-size', this.fontSize + 'px').style('font-family', 'sans-serif').attr('transform', 'translate(0,' + this.height + ')').call(this.xAxis);

	    this.yAx = this.svg.append('g').attr('class', 'y axis').style('stroke-width', this.par.size / 1000 + 'px').style('font-size', this.fontSize + 'px').style('font-family', 'sans-serif').call(this.yAxis);

	    this.yAx.append('text').attr('transform', 'rotate(-90)').attr('y', this.fontSize / 2).attr('dy', '.71em').style('text-anchor', 'end').text(self.par.yLabel);

	    this.tooltip = d3.select('body').append('div').style('background', 'rgba(238, 238, 238, 0.85)').style('padding', '5px').style('border-radius', '5px').style('border-color', '#999').style('border-width', '2px').style('border-style', 'solid').style('pointer-events', 'none').style('position', 'absolute').style('z-index', '10').style('opacity', 0);

	    this.updateFunction(data, params);
	  },

	  destroyFunction: function destroyFunction() {
	    this.tooltip.remove();
	  },

	  updateFunction: function updateFunction(data, params) {
	    var _this = this;

	    var self = this;
	    self.par = Object.assign({}, this.defaultParams, params);

	    self.colFunc = this.colorFunction(self.par);

	    this.x.domain(data.map(function (d) {
	      return d.id;
	    }));
	    this.yMax = d3.max(data, function (d) {
	      return d.value;
	    }) || 100;
	    this.y.domain([0, this.yMax]);

	    this.yAx.transition().duration(self.par.defaultDuration).call(this.yAxis);

	    this.xAx.transition().duration(self.par.defaultDuration).call(this.xAxis);

	    this.svg.selectAll('.axis line').style('fill', 'none').style('stroke', '#000').style('shape-rendering', 'crispEdges');

	    this.svg.selectAll('.axis path').style('fill', 'none').style('stroke', '#000').style('shape-rendering', 'crispEdges');

	    this.join = this.svg.selectAll('.bar').data(data, function (d) {
	      return d.id;
	    });

	    this.join.transition().duration(self.par.defaultDuration).attr('y', function (d) {
	      return self.y(d.value);
	    }).attr('height', function (d) {
	      return self.height - self.y(d.value);
	    }).attr('width', self.x.rangeBand()).attr('x', function (d) {
	      return self.x(d.id);
	    }).style('fill', function (d, i) {
	      return self.colFunc(d, i);
	    });

	    //ENTER
	    this.join.enter().append('rect').attr('width', 0).attr('height', 0).attr('y', 0).attr('rx', self.par.rx).attr('ry', self.par.ry).style('stroke', 'transparent').style('stroke-width', '2px').on('mouseover', function (d) {
	      self.mouseoverBar.call(self, d, _this);
	    }).on('mouseout', function (d) {
	      self.mouseoutBar.call(self, d, _this);
	    }).on('mousemove', function (d) {
	      self.mousemoveBar.call(self, d, _this);
	    }).transition().duration(self.par.defaultDuration).attr('class', 'bar bar').attr('id', function (d) {
	      return 'bar-' + d.id;
	    }).attr('x', function (d) {
	      return self.x(d.id);
	    }).attr('width', self.x.rangeBand()).attr('y', function (d) {
	      return self.y(d.value);
	    }).attr('height', function (d) {
	      return self.height - self.y(d.value);
	    }).style('fill', function (d, i) {
	      return self.colFunc(d, i);
	    });

	    //EXIT
	    this.join.exit().transition().duration(self.par.defaultDuration).attr('width', 0).attr('height', 0).remove();
	  },

	  onEvent: function onEvent(obj) {
	    var self = this;
	    var d = obj.d;
	    var e = obj.e;

	    switch (e) {
	      case 'mouseover':
	        this.svg.selectAll('.bar').style('fill-opacity', 0.15).style('stroke-opacity', 0).style('stroke-width', '5px').style('stroke', function (dd, i) {
	          return self.colFunc(dd, i);
	        });
	        this.svg.selectAll('#bar-' + d.id).style('fill-opacity', 0.5).style('stroke-opacity', 1);
	        break;
	      case 'mouseout':
	        this.svg.selectAll('.bar').style('fill-opacity', 1).style('stroke', 'transparent').style('stroke-width', '2px').style('stroke-opacity', 1);
	        break;
	    }
	  },

	  colorFunction: function colorFunction(par) {
	    var self = this;
	    if (par.colorType === 'gradient') {
	      return function (d) {
	        return d3.interpolateHsl(par.col1, par.col2)(d.value / self.yMax);
	      };
	    } else if (par.colorType === 'category') {
	      var _ret = (function () {
	        var cols = par.colorArray;
	        return {
	          v: function (d, i) {
	            return cols[i];
	          }
	        };
	      })();

	      if (typeof _ret === 'object') return _ret.v;
	    } else {
	      return function () {
	        return 'gray';
	      };
	    }
	  },

	  mouseoverBar: function mouseoverBar(d) {
	    //pass the event to the partent component
	    this.reactComp.handleChartEvent(d, 'mouseover');

	    //show tooltip
	    this.tooltip.html(this.par.tooltip(d)).style('opacity', 1).style('top', d3.event.pageY - 10 + 'px').style('left', d3.event.pageX + 10 + 'px');
	  },

	  mouseoutBar: function mouseoutBar(d) {
	    //pass the event to the partent component
	    this.reactComp.handleChartEvent(d, 'mouseout');

	    //hide tooltip
	    this.tooltip.style('opacity', 0);
	  },

	  mousemoveBar: function mousemoveBar() {
	    //note: we do not pass that event to parent component

	    //move tooltip
	    this.tooltip.style('top', d3.event.pageY + 'px').style('left', d3.event.pageX + 10 + 'px');
	  }
	};
	exports.barChart = barChart;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var d3 = __webpack_require__(2);

	var pieChart = {
	  defaultParams: {
	    size: 1000, // debug switch, for exact values
	    col1: 'green',
	    col2: 'red',
	    defaultDuration: 500,
	    innerRadius: 0,
	    cornerRadius: 5,
	    colorType: 'gradient',
	    colorArray: d3.scale.category20().range(),
	    tooltip: function tooltip(d) {
	      return '<div>ID: ' + d.id + '<br/>Value: ' + d.value + '</div>';
	    }
	  },

	  mainFunction: function mainFunction(loc, data, params, reactComp) {
	    this.reactComp = reactComp;

	    this.par = Object.assign({}, this.defaultParams, params);

	    var size = this.par.size;

	    var width = size - 20,
	        height = size - 20,
	        radius = Math.min(width, height) / 2;
	    var fullWidth = size;
	    var fullHeight = size;

	    this.arc = d3.svg.arc().outerRadius(radius - 10);

	    this.pie = d3.layout.pie().sort(null).value(function (d) {
	      return d.value;
	    });

	    this.svg = loc.append('svg').attr('id', 'd3graphSVG').style('display', 'inline-block').style('position', 'absolute').attr('preserveAspectRatio', 'xMinYMin slice').attr('viewBox', '0 0 ' + fullWidth + ' ' + fullHeight).append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

	    this.tooltip = d3.select('body').append('div').style('background', 'rgba(238, 238, 238, 0.85)').style('padding', '5px').style('border-radius', '5px').style('border-color', '#999').style('border-width', '2px').style('border-style', 'solid').style('pointer-events', 'none').style('position', 'absolute').style('z-index', '10').style('opacity', 0);

	    this.updateFunction(data, params);
	  },

	  destroyFunction: function destroyFunction() {
	    this.tooltip.remove();
	  },

	  tweenFunc: function tweenFunc(a, context) {
	    var i = d3.interpolate(this._current || a, a);
	    this._current = i(0);
	    return function (t) {

	      return context.arc(i(t));
	    };
	  },

	  updateFunction: function updateFunction(data, params) {
	    var _this = this;

	    var self = this;
	    this.par = Object.assign({}, this.defaultParams, params);

	    this.colFunc = this.colorFunction(this.par);

	    this.arc.innerRadius(this.par.innerRadius).cornerRadius(this.par.cornerRadius);

	    this.join = this.svg.selectAll('.pie').data(this.pie(data), function (d) {
	      return d.data.id;
	    });
	    this.angMax = d3.max(this.pie(data).map(function (d) {
	      return d.endAngle - d.startAngle;
	    }));

	    this.join.transition().duration(500).attrTween('d', function (d) {
	      return self.tweenFunc.apply(this, [d, self]);
	    }).style('fill', function (d, i) {
	      return self.colFunc(d, i);
	    });

	    //ENTER
	    this.join.enter().append('path').attr('class', 'pie pie-sector').attr('id', function (d) {
	      return 'pie-sector-' + d.data.id;
	    }).style('stroke', 'white').style('stroke-width', '2px').attr('d', this.arc).each(function (d) {
	      _this._current = d;
	    }).style('fill', function (d, i) {
	      return self.colFunc(d, i);
	    }).on('mouseover', function (d) {
	      self.mouseoverSector.call(self, d, _this);
	    }).on('mouseout', function (d) {
	      self.mouseoutSector.call(self, d, _this);
	    }).on('mousemove', function (d) {
	      self.mousemoveSector.call(self, d, _this);
	    });

	    //EXIT
	    this.join.exit().remove();
	  },

	  colorFunction: function colorFunction() {
	    var self = this;
	    if (this.par.colorType === 'gradient') {
	      return function (d) {
	        return d3.interpolateHsl(self.par.col1, self.par.col2)((d.endAngle - d.startAngle) / self.angMax);
	      };
	    } else if (self.par.colorType === 'category') {
	      var _ret = (function () {
	        var cols = self.par.colorArray;
	        return {
	          v: function (d, i) {
	            return cols[i];
	          }
	        };
	      })();

	      if (typeof _ret === 'object') return _ret.v;
	    } else {
	      return function () {
	        return 'gray';
	      };
	    }
	  },

	  onEvent: function onEvent(obj) {
	    var self = this;
	    var d = obj.d;
	    var e = obj.e;

	    switch (e) {
	      case 'mouseover':
	        this.svg.selectAll('.pie-sector').style('fill-opacity', 0.15).style('stroke-opacity', 0).style('stroke-width', '5px').style('stroke', function (dd, i) {
	          return self.colFunc(dd, i);
	        });
	        this.svg.selectAll('#pie-sector-' + d.id).style('fill-opacity', 0.5).style('stroke-opacity', 1);
	        break;
	      case 'mouseout':
	        this.svg.selectAll('.pie-sector').style('fill-opacity', 1).style('stroke', 'white').style('stroke-width', '2px').style('stroke-opacity', 1);
	        break;
	    }
	  },

	  mouseoverSector: function mouseoverSector(d) {
	    //pass the event to the partent component
	    this.reactComp.handleChartEvent(d.data, 'mouseover');

	    //show tooltip
	    this.tooltip.html(this.par.tooltip(d.data)).style('opacity', 1).style('top', d3.event.pageY - 10 + 'px').style('left', d3.event.pageX + 10 + 'px');
	  },

	  mouseoutSector: function mouseoutSector(d) {
	    //pass the event to the partent component
	    this.reactComp.handleChartEvent(d.data, 'mouseout');

	    //hide tooltip
	    this.tooltip.style('opacity', 0);
	  },

	  mousemoveSector: function mousemoveSector() {
	    //note: we do not pass that event to parent component

	    //move tooltip
	    this.tooltip.style('top', d3.event.pageY + 'px').style('left', d3.event.pageX + 10 + 'px');
	  }
	};
	exports.pieChart = pieChart;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var d3 = __webpack_require__(2);
	//import {tooltipGenerator} from './matrixChartTooltip.js';

	//let moment = require('moment');

	var lineChart = {
	  defaultParams: {
	    defaultDuration: 500,
	    size: 1000, // debug switch, for exact values
	    aspectRatio: 1 / 2,
	    labelSize: 1,
	    yLabel: 'Value',
	    xLabel: 'Value',
	    colorArray: d3.scale.category20().range(),
	    strokeWidth: 3,
	    yAxisPlacement: 'left',
	    xMax: -Infinity,
	    yMax: -Infinity,
	    xMin: Infinity,
	    yMin: Infinity,
	    interpolate: 'linear',
	    tooltip: function tooltip(d) {
	      return '<div>ID: ' + d.id + '</div>';
	    }
	  },

	  mainFunction: function mainFunction(loc, data, params, reactComp) {
	    var self = this;
	    this.reactComp = reactComp;

	    self.par = Object.assign({}, this.defaultParams, params);

	    this.size = this.par.size;
	    var labelSize = this.par.labelSize;
	    this.fontSize = labelSize * this.size / 100;
	    var lM = 1,
	        rM = 1;

	    if (this.par.yAxisPlacement === 'left') {
	      lM = (1 + labelSize / 2) * 5;
	    } else {
	      rM = (1 + labelSize / 2) * 5;
	    }

	    this.margin = {
	      top: this.size / 20,
	      right: rM * this.size / 100,
	      bottom: this.fontSize + this.size / 20,
	      left: lM * this.size / 100
	    };
	    this.width = this.size - this.margin.left - this.margin.right;
	    this.height = this.size * this.par.aspectRatio - this.margin.top - this.margin.bottom;
	    this.fullWidth = this.size;
	    this.fullHeight = this.size * this.par.aspectRatio;

	    //this.x = d3.time.scale()
	    //  .range([0, this.width]);

	    this.x = d3.scale.linear().range([0, this.width]);

	    this.y = d3.scale.linear().range([this.height, 0]);

	    this.xAxis = d3.svg.axis().scale(this.x)
	    //.ticks(Math.floor(10 / labelSize))
	    .innerTickSize(this.size / 250).outerTickSize(this.size / 250).tickPadding(this.size / 250).orient('bottom');

	    this.yAxis = d3.svg.axis().scale(this.y)
	    //.ticks(Math.floor(10 / labelSize))
	    .innerTickSize(this.size / 250).outerTickSize(this.size / 250).tickPadding(this.size / 250).orient(self.par.yAxisPlacement);

	    this.vb = loc.append('svg').attr('id', 'd3graphSVG').style('display', 'inline-block').style('position', 'absolute').attr('preserveAspectRatio', 'xMinYMin slice').attr('viewBox', '0 0 ' + this.fullWidth + ' ' + this.fullHeight);

	    this.svg = this.vb.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

	    this.tooltip = d3.select('body').append('div').style('background', 'rgba(238, 238, 238, 0.85)').style('padding', '5px').style('border-radius', '5px').style('border-color', '#999').style('border-width', '2px').style('border-style', 'solid').style('pointer-events', 'none').style('position', 'absolute').style('z-index', '10').style('opacity', 0);

	    this.xAx = this.svg.append('g').attr('class', 'x axis').style('stroke-width', this.par.size / 1000 + 'px').style('font-size', this.fontSize + 'px').style('font-family', 'sans-serif').attr('transform', 'translate(0,' + this.height + ')').call(this.xAxis);

	    this.xAx.append('text').attr('x', self.par.yAxisPlacement === 'left' ? this.width : 0).attr('y', -this.fontSize / 2).style('text-anchor', self.par.yAxisPlacement === 'left' ? 'end' : 'start').text(self.par.xLabel);

	    this.yAx = this.svg.append('g').attr('class', 'y axis').style('stroke-width', this.par.size / 1000 + 'px').style('font-size', this.fontSize + 'px').style('font-family', 'sans-serif').attr('transform', 'translate(' + (self.par.yAxisPlacement === 'left' ? 0 : 1) * this.width + ', 0)').call(this.yAxis);

	    this.yAx.append('text').attr('transform', 'rotate(-90)').attr('y', self.par.yAxisPlacement === 'left' ? this.fontSize / 2 : -this.fontSize).attr('dy', '.71em').style('text-anchor', 'end').text(self.par.yLabel);

	    this.updateFunction(data, params);
	  },

	  destroyFunction: function destroyFunction() {
	    this.tooltip.remove();
	  },

	  updateFunction: function updateFunction(data, params) {
	    var _this = this;

	    var self = this;
	    self.par = Object.assign({}, this.defaultParams, params);

	    this.line = d3.svg.line().interpolate(self.par.interpolate).x(function (d) {
	      return _this.x(d.x);
	    }).y(function (d) {
	      return _this.y(d.y);
	    });

	    var _self$par = self.par;
	    var xMax = _self$par.xMax;
	    var yMax = _self$par.yMax;
	    var xMin = _self$par.xMin;
	    var yMin = _self$par.yMin;

	    data.map(function (line) {
	      line.values.map(function (val) {
	        xMax = Math.max(val.x, xMax);
	        yMax = Math.max(val.y, yMax);
	        xMin = Math.min(val.x, xMin);
	        yMin = Math.min(val.y, yMin);
	      });
	    });

	    if (xMax === -Infinity && xMin === Infinity) {
	      xMax = xMin = 0;
	    }
	    if (yMax === -Infinity && yMin === Infinity) {
	      yMax = yMin = 0;
	    }
	    this.x.domain([xMin, xMax]);
	    this.y.domain([yMin, yMax]);

	    this.xAx.transition().duration(self.par.defaultDuration).call(this.xAxis);

	    this.yAx.transition().duration(self.par.defaultDuration).call(this.yAxis);

	    this.svg.select('.y.axis').transition().duration(self.par.defaultDuration).call(this.yAxis);

	    this.svg.select('.x.axis').transition().duration(self.par.defaultDuration).call(this.xAxis);

	    this.svg.selectAll('.axis line').style('fill', 'none').style('stroke', '#000').style('shape-rendering', 'crispEdges');

	    this.svg.selectAll('.axis path').style('fill', 'none').style('stroke', '#000').style('shape-rendering', 'crispEdges');

	    this.joinLine = this.svg.selectAll('.lineGroup').data(data, function (d) {
	      return d.id;
	    });

	    //ENTER
	    this.lineGroup = this.joinLine.enter().append('g').attr('class', 'lineGroup');

	    this.joinLine.select('path').transition().duration(self.par.defaultDuration).attr('d', function (d) {
	      return _this.line(d.values);
	    });

	    this.lineGroup.append('path').attr('class', 'line').attr('id', function (d) {
	      return 'line' + d.id;
	    }).style('fill', 'none').style('stroke', function (d, i) {
	      return self.par.colorArray[i];
	    }).style('stroke-width', self.par.strokeWidth).style('stroke-linecap', 'round').on('mouseover', function (d) {
	      return _this.mouseoverLine.call(self, d, _this);
	    }).on('mouseout', function (d) {
	      return _this.mouseoutLine.call(self, d, _this);
	    }).on('mousemove', function (d) {
	      return _this.mousemoveLine.call(self, d, _this);
	    }).attr('d', function (d) {
	      return _this.line(d.values);
	    }).style('opacity', 0).transition().duration(self.par.defaultDuration).style('opacity', 1);

	    //EXIT
	    this.joinLine.exit().transition().duration(self.par.defaultDuration).style('opacity', 0).remove();
	  },

	  onEvent: function onEvent(obj) {
	    var self = this;
	    var d = obj.d;
	    var e = obj.e;

	    switch (e) {
	      case 'mouseover':
	        this.svg.selectAll('.line').style('stroke-width', self.par.strokeWidth);
	        this.svg.select('#line' + d.id).style('stroke-width', self.par.strokeWidth * 3);
	        break;
	      case 'mouseout':
	        this.svg.selectAll('.line').style('stroke-width', self.par.strokeWidth);
	        break;
	    }
	  },

	  mouseoverLine: function mouseoverLine(d) {
	    //pass the event to the partent component
	    this.reactComp.handleChartEvent(d, 'mouseover');
	    //this.reactComp.handleChartEvent({id: this.par.fundMap.get(d.id).comp}, 'mouseover');

	    this.svg.select('#line' + d.id).style('stroke-width', this.par.strokeWidth * 3);

	    //show tooltip
	    this.tooltip.html(this.par.tooltip(d)).style('opacity', 1).style('top', d3.event.pageY - 10 + 'px').style('left', d3.event.pageX + 10 + 'px');
	  },

	  mouseoutLine: function mouseoutLine(d) {
	    //pass the event to the partent component
	    this.reactComp.handleChartEvent(d, 'mouseout');

	    this.svg.select('#line' + d.id).transition().duration(this.par.defaultDuration).style('stroke-width', this.par.strokeWidth);

	    //hide tooltip
	    this.tooltip.style('opacity', 0);
	  },

	  mousemoveLine: function mousemoveLine() {
	    //note: we do not pass that event to parent component

	    //move tooltip
	    this.tooltip.style('top', d3.event.pageY + 'px').style('left', +!this.par.debugMode * d3.event.pageX + 10 + 'px');
	  }
	};
	exports.lineChart = lineChart;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reflux = __webpack_require__(7);

	var _reflux2 = _interopRequireDefault(_reflux);

	var _actionsD3actionsJs = __webpack_require__(30);

	var _actionsD3actionsJs2 = _interopRequireDefault(_actionsD3actionsJs);

	var d3Store = _reflux2['default'].createStore({
	  //link actions
	  listenables: _actionsD3actionsJs2['default'],

	  //define actions
	  onD3Event: function onD3Event(data, event, emit) {
	    this.update(data, event, emit);
	  },

	  //publish
	  update: function update(d, e, emit) {
	    //d is the data object, we want to pass on the id
	    //e is the event, such as 'mouseover'. We set accordingly
	    this.trigger({ d: d, e: e }, emit);
	  }
	});

	exports['default'] = d3Store;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports.ActionMethods = __webpack_require__(10);

	exports.ListenerMethods = __webpack_require__(11);

	exports.PublisherMethods = __webpack_require__(23);

	exports.StoreMethods = __webpack_require__(24);

	exports.createAction = __webpack_require__(25);

	exports.createStore = __webpack_require__(19);

	exports.connect = __webpack_require__(26);

	exports.connectFilter = __webpack_require__(27);

	exports.ListenerMixin = __webpack_require__(28);

	exports.listenTo = __webpack_require__(9);

	exports.listenToMany = __webpack_require__(29);


	var maker = __webpack_require__(18).staticJoinCreator;

	exports.joinTrailing = exports.all = maker("last"); // Reflux.all alias for backward compatibility

	exports.joinLeading = maker("first");

	exports.joinStrict = maker("strict");

	exports.joinConcat = maker("all");

	var _ = __webpack_require__(12);

	exports.EventEmitter = _.EventEmitter;

	exports.Promise = _.Promise;

	/**
	 * Convenience function for creating a set of actions
	 *
	 * @param definitions the definitions for the actions to be created
	 * @returns an object with actions of corresponding action names
	 */
	exports.createActions = function(definitions) {
	    var actions = {};
	    for (var k in definitions){
	        if (definitions.hasOwnProperty(k)) {
	            var val = definitions[k],
	                actionName = _.isObject(val) ? k : val;

	            actions[actionName] = exports.createAction(val);
	        }
	    }
	    return actions;
	};

	/**
	 * Sets the eventmitter that Reflux uses
	 */
	exports.setEventEmitter = function(ctx) {
	    var _ = __webpack_require__(12);
	    exports.EventEmitter = _.EventEmitter = ctx;
	};


	/**
	 * Sets the Promise library that Reflux uses
	 */
	exports.setPromise = function(ctx) {
	    var _ = __webpack_require__(12);
	    exports.Promise = _.Promise = ctx;
	};


	/**
	 * Sets the Promise factory that creates new promises
	 * @param {Function} factory has the signature `function(resolver) { return [new Promise]; }`
	 */
	exports.setPromiseFactory = function(factory) {
	    var _ = __webpack_require__(12);
	    _.createPromise = factory;
	};


	/**
	 * Sets the method used for deferring actions and stores
	 */
	exports.nextTick = function(nextTick) {
	    var _ = __webpack_require__(12);
	    _.nextTick = nextTick;
	};

	/**
	 * Provides the set of created actions and stores for introspection
	 */
	exports.__keep = __webpack_require__(20);

	/**
	 * Warn if Function.prototype.bind not available
	 */
	if (!Function.prototype.bind) {
	  console.error(
	    'Function.prototype.bind not available. ' +
	    'ES5 shim required. ' +
	    'https://github.com/spoike/refluxjs#es5'
	  );
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(8);


	/**
	 * A mixin factory for a React component. Meant as a more convenient way of using the `ListenerMixin`,
	 * without having to manually set listeners in the `componentDidMount` method.
	 *
	 * @param {Action|Store} listenable An Action or Store that should be
	 *  listened to.
	 * @param {Function|String} callback The callback to register as event handler
	 * @param {Function|String} defaultCallback The callback to register as default handler
	 * @returns {Object} An object to be used as a mixin, which sets up the listener for the given listenable.
	 */
	module.exports = function(listenable,callback,initial){
	    return {
	        /**
	         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
	         * and then make the call to `listenTo` with the arguments provided to the factory function
	         */
	        componentDidMount: function() {
	            for(var m in Reflux.ListenerMethods){
	                if (this[m] !== Reflux.ListenerMethods[m]){
	                    if (this[m]){
	                        throw "Can't have other property '"+m+"' when using Reflux.listenTo!";
	                    }
	                    this[m] = Reflux.ListenerMethods[m];
	                }
	            }
	            this.listenTo(listenable,callback,initial);
	        },
	        /**
	         * Cleans up all listener previously registered.
	         */
	        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
	    };
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * A module of methods that you want to include in all actions.
	 * This module is consumed by `createAction`.
	 */
	module.exports = {
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(12),
	    maker = __webpack_require__(18).instanceJoinCreator;

	/**
	 * Extract child listenables from a parent from their
	 * children property and return them in a keyed Object
	 *
	 * @param {Object} listenable The parent listenable
	 */
	var mapChildListenables = function(listenable) {
	    var i = 0, children = {}, childName;
	    for (;i < (listenable.children||[]).length; ++i) {
	        childName = listenable.children[i];
	        if(listenable[childName]){
	            children[childName] = listenable[childName];
	        }
	    }
	    return children;
	};

	/**
	 * Make a flat dictionary of all listenables including their
	 * possible children (recursively), concatenating names in camelCase.
	 *
	 * @param {Object} listenables The top-level listenables
	 */
	var flattenListenables = function(listenables) {
	    var flattened = {};
	    for(var key in listenables){
	        var listenable = listenables[key];
	        var childMap = mapChildListenables(listenable);

	        // recursively flatten children
	        var children = flattenListenables(childMap);

	        // add the primary listenable and chilren
	        flattened[key] = listenable;
	        for(var childKey in children){
	            var childListenable = children[childKey];
	            flattened[key + _.capitalize(childKey)] = childListenable;
	        }
	    }

	    return flattened;
	};

	/**
	 * A module of methods related to listening.
	 */
	module.exports = {

	    /**
	     * An internal utility function used by `validateListening`
	     *
	     * @param {Action|Store} listenable The listenable we want to search for
	     * @returns {Boolean} The result of a recursive search among `this.subscriptions`
	     */
	    hasListener: function(listenable) {
	        var i = 0, j, listener, listenables;
	        for (;i < (this.subscriptions||[]).length; ++i) {
	            listenables = [].concat(this.subscriptions[i].listenable);
	            for (j = 0; j < listenables.length; j++){
	                listener = listenables[j];
	                if (listener === listenable || listener.hasListener && listener.hasListener(listenable)) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    },

	    /**
	     * A convenience method that listens to all listenables in the given object.
	     *
	     * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
	     */
	    listenToMany: function(listenables){
	        var allListenables = flattenListenables(listenables);
	        for(var key in allListenables){
	            var cbname = _.callbackName(key),
	                localname = this[cbname] ? cbname : this[key] ? key : undefined;
	            if (localname){
	                this.listenTo(allListenables[key],localname,this[cbname+"Default"]||this[localname+"Default"]||localname);
	            }
	        }
	    },

	    /**
	     * Checks if the current context can listen to the supplied listenable
	     *
	     * @param {Action|Store} listenable An Action or Store that should be
	     *  listened to.
	     * @returns {String|Undefined} An error message, or undefined if there was no problem.
	     */
	    validateListening: function(listenable){
	        if (listenable === this) {
	            return "Listener is not able to listen to itself";
	        }
	        if (!_.isFunction(listenable.listen)) {
	            return listenable + " is missing a listen method";
	        }
	        if (listenable.hasListener && listenable.hasListener(this)) {
	            return "Listener cannot listen to this listenable because of circular loop";
	        }
	    },

	    /**
	     * Sets up a subscription to the given listenable for the context object
	     *
	     * @param {Action|Store} listenable An Action or Store that should be
	     *  listened to.
	     * @param {Function|String} callback The callback to register as event handler
	     * @param {Function|String} defaultCallback The callback to register as default handler
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to
	     */
	    listenTo: function(listenable, callback, defaultCallback) {
	        var desub, unsubscriber, subscriptionobj, subs = this.subscriptions = this.subscriptions || [];
	        _.throwIf(this.validateListening(listenable));
	        this.fetchInitialState(listenable, defaultCallback);
	        desub = listenable.listen(this[callback]||callback, this);
	        unsubscriber = function() {
	            var index = subs.indexOf(subscriptionobj);
	            _.throwIf(index === -1,'Tried to remove listen already gone from subscriptions list!');
	            subs.splice(index, 1);
	            desub();
	        };
	        subscriptionobj = {
	            stop: unsubscriber,
	            listenable: listenable
	        };
	        subs.push(subscriptionobj);
	        return subscriptionobj;
	    },

	    /**
	     * Stops listening to a single listenable
	     *
	     * @param {Action|Store} listenable The action or store we no longer want to listen to
	     * @returns {Boolean} True if a subscription was found and removed, otherwise false.
	     */
	    stopListeningTo: function(listenable){
	        var sub, i = 0, subs = this.subscriptions || [];
	        for(;i < subs.length; i++){
	            sub = subs[i];
	            if (sub.listenable === listenable){
	                sub.stop();
	                _.throwIf(subs.indexOf(sub)!==-1,'Failed to remove listen from subscriptions list!');
	                return true;
	            }
	        }
	        return false;
	    },

	    /**
	     * Stops all subscriptions and empties subscriptions array
	     */
	    stopListeningToAll: function(){
	        var remaining, subs = this.subscriptions || [];
	        while((remaining=subs.length)){
	            subs[0].stop();
	            _.throwIf(subs.length!==remaining-1,'Failed to remove listen from subscriptions list!');
	        }
	    },

	    /**
	     * Used in `listenTo`. Fetches initial data from a publisher if it has a `getInitialState` method.
	     * @param {Action|Store} listenable The publisher we want to get initial state from
	     * @param {Function|String} defaultCallback The method to receive the data
	     */
	    fetchInitialState: function (listenable, defaultCallback) {
	        defaultCallback = (defaultCallback && this[defaultCallback]) || defaultCallback;
	        var me = this;
	        if (_.isFunction(defaultCallback) && _.isFunction(listenable.getInitialState)) {
	            var data = listenable.getInitialState();
	            if (data && _.isFunction(data.then)) {
	                data.then(function() {
	                    defaultCallback.apply(me, arguments);
	                });
	            } else {
	                defaultCallback.call(this, data);
	            }
	        }
	    },

	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with the last emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinTrailing: maker("last"),

	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with the first emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinLeading: maker("first"),

	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with all emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinConcat: maker("all"),

	    /**
	     * The callback will be called once all listenables have triggered.
	     * If a callback triggers twice before that happens, an error is thrown.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinStrict: maker("strict")
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * isObject, extend, isFunction, isArguments are taken from undescore/lodash in
	 * order to remove the dependency
	 */
	var isObject = exports.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	};

	exports.extend = function(obj) {
	    if (!isObject(obj)) {
	        return obj;
	    }
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	        source = arguments[i];
	        for (prop in source) {
	            if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
	                var propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
	                Object.defineProperty(obj, prop, propertyDescriptor);
	            } else {
	                obj[prop] = source[prop];
	            }
	        }
	    }
	    return obj;
	};

	exports.isFunction = function(value) {
	    return typeof value === 'function';
	};

	exports.EventEmitter = __webpack_require__(13);

	exports.nextTick = function(callback) {
	    setTimeout(callback, 0);
	};

	exports.capitalize = function(string){
	    return string.charAt(0).toUpperCase()+string.slice(1);
	};

	exports.callbackName = function(string){
	    return "on"+exports.capitalize(string);
	};

	exports.object = function(keys,vals){
	    var o={}, i=0;
	    for(;i < keys.length; i++){
	        o[keys[i]] = vals[i];
	    }
	    return o;
	};

	exports.Promise = __webpack_require__(14);

	exports.createPromise = function(resolver) {
	    return new exports.Promise(resolver);
	};

	exports.isArguments = function(value) {
	    return typeof value === 'object' && ('callee' in value) && typeof value.length === 'number';
	};

	exports.throwIf = function(val,msg){
	    if (val){
	        throw Error(msg||val);
	    }
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  if (!this._events || !this._events[event]) return [];
	  if (this._events[event].fn) return [this._events[event].fn];

	  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
	    ee[i] = this._events[event][i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  if (!this._events || !this._events[event]) return false;

	  var listeners = this._events[event]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this);

	  if (!this._events) this._events = {};
	  if (!this._events[event]) this._events[event] = listener;
	  else {
	    if (!this._events[event].fn) this._events[event].push(listener);
	    else this._events[event] = [
	      this._events[event], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true);

	  if (!this._events) this._events = {};
	  if (!this._events[event]) this._events[event] = listener;
	  else {
	    if (!this._events[event].fn) this._events[event].push(listener);
	    else this._events[event] = [
	      this._events[event], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
	  if (!this._events || !this._events[event]) return this;

	  var listeners = this._events[event]
	    , events = [];

	  if (fn) {
	    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
	      events.push(listeners);
	    }
	    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
	      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
	        events.push(listeners[i]);
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[event] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[event];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[event];
	  else this._events = {};

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the module.
	//
	EventEmitter.EventEmitter = EventEmitter;
	EventEmitter.EventEmitter2 = EventEmitter;
	EventEmitter.EventEmitter3 = EventEmitter;

	//
	// Expose the module.
	//
	module.exports = EventEmitter;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*! Native Promise Only
	    v0.7.8-a (c) Kyle Simpson
	    MIT License: http://getify.mit-license.org
	*/
	!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"=="function"&&__webpack_require__(17)&&!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return n[t]}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n?n:!1}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{e===!1?o.reject(t.msg):(r=e===!0?t.msg:e.call(void 0,t.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(c){o.reject(c)}}function r(o){var c,u,a=this;if(!a.triggered){a.triggered=!0,a.def&&(a=a.def);try{(c=n(o))?(u=new f(a),c.call(o,function(){r.apply(u,arguments)},function(){i.apply(u,arguments)})):(a.msg=o,a.state=1,a.chain.length>0&&t(e,a))}catch(s){i.call(u||new f(a),s)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"==typeof n?n:!0,failure:"function"==typeof r?r:!1};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(c){i.call(o,c)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:o!==!1})}}catch(d){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var g=s({},"constructor",a,!1);return a.prototype=g,s(g,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(15).setImmediate))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(16).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).setImmediate, __webpack_require__(15).clearImmediate))

/***/ },
/* 16 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 17 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Internal module used to create static and instance join methods
	 */

	var slice = Array.prototype.slice,
	    _ = __webpack_require__(12),
	    createStore = __webpack_require__(19),
	    strategyMethodNames = {
	        strict: "joinStrict",
	        first: "joinLeading",
	        last: "joinTrailing",
	        all: "joinConcat"
	    };

	/**
	 * Used in `index.js` to create the static join methods
	 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
	 * @returns {Function} A static function which returns a store with a join listen on the given listenables using the given strategy
	 */
	exports.staticJoinCreator = function(strategy){
	    return function(/* listenables... */) {
	        var listenables = slice.call(arguments);
	        return createStore({
	            init: function(){
	                this[strategyMethodNames[strategy]].apply(this,listenables.concat("triggerAsync"));
	            }
	        });
	    };
	};

	/**
	 * Used in `ListenerMethods.js` to create the instance join methods
	 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
	 * @returns {Function} An instance method which sets up a join listen on the given listenables using the given strategy
	 */
	exports.instanceJoinCreator = function(strategy){
	    return function(/* listenables..., callback*/){
	        _.throwIf(arguments.length < 2,'Cannot create a join with less than 2 listenables!');
	        var listenables = slice.call(arguments),
	            callback = listenables.pop(),
	            numberOfListenables = listenables.length,
	            join = {
	                numberOfListenables: numberOfListenables,
	                callback: this[callback]||callback,
	                listener: this,
	                strategy: strategy
	            }, i, cancels = [], subobj;
	        for (i = 0; i < numberOfListenables; i++) {
	            _.throwIf(this.validateListening(listenables[i]));
	        }
	        for (i = 0; i < numberOfListenables; i++) {
	            cancels.push(listenables[i].listen(newListener(i,join),this));
	        }
	        reset(join);
	        subobj = {listenable: listenables};
	        subobj.stop = makeStopper(subobj,cancels,this);
	        this.subscriptions = (this.subscriptions || []).concat(subobj);
	        return subobj;
	    };
	};

	// ---- internal join functions ----

	function makeStopper(subobj,cancels,context){
	    return function() {
	        var i, subs = context.subscriptions,
	            index = (subs ? subs.indexOf(subobj) : -1);
	        _.throwIf(index === -1,'Tried to remove join already gone from subscriptions list!');
	        for(i=0;i < cancels.length; i++){
	            cancels[i]();
	        }
	        subs.splice(index, 1);
	    };
	}

	function reset(join) {
	    join.listenablesEmitted = new Array(join.numberOfListenables);
	    join.args = new Array(join.numberOfListenables);
	}

	function newListener(i,join) {
	    return function() {
	        var callargs = slice.call(arguments);
	        if (join.listenablesEmitted[i]){
	            switch(join.strategy){
	                case "strict": throw new Error("Strict join failed because listener triggered twice.");
	                case "last": join.args[i] = callargs; break;
	                case "all": join.args[i].push(callargs);
	            }
	        } else {
	            join.listenablesEmitted[i] = true;
	            join.args[i] = (join.strategy==="all"?[callargs]:callargs);
	        }
	        emitIfAllListenablesEmitted(join);
	    };
	}

	function emitIfAllListenablesEmitted(join) {
	    for (var i = 0; i < join.numberOfListenables; i++) {
	        if (!join.listenablesEmitted[i]) {
	            return;
	        }
	    }
	    join.callback.apply(join.listener,join.args);
	    reset(join);
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(12),
	    Reflux = __webpack_require__(8),
	    Keep = __webpack_require__(20),
	    mixer = __webpack_require__(21),
	    allowed = {preEmit:1,shouldEmit:1},
	    bindMethods = __webpack_require__(22);

	/**
	 * Creates an event emitting Data Store. It is mixed in with functions
	 * from the `ListenerMethods` and `PublisherMethods` mixins. `preEmit`
	 * and `shouldEmit` may be overridden in the definition object.
	 *
	 * @param {Object} definition The data store object definition
	 * @returns {Store} A data store instance
	 */
	module.exports = function(definition) {

	    definition = definition || {};

	    for(var a in Reflux.StoreMethods){
	        if (!allowed[a] && (Reflux.PublisherMethods[a] || Reflux.ListenerMethods[a])){
	            throw new Error("Cannot override API method " + a +
	                " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
	            );
	        }
	    }

	    for(var d in definition){
	        if (!allowed[d] && (Reflux.PublisherMethods[d] || Reflux.ListenerMethods[d])){
	            throw new Error("Cannot override API method " + d +
	                " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
	            );
	        }
	    }

	    definition = mixer(definition);

	    function Store() {
	        var i=0, arr;
	        this.subscriptions = [];
	        this.emitter = new _.EventEmitter();
	        this.eventLabel = "change";
	        bindMethods(this, definition);
	        if (this.init && _.isFunction(this.init)) {
	            this.init();
	        }
	        if (this.listenables){
	            arr = [].concat(this.listenables);
	            for(;i < arr.length;i++){
	                this.listenToMany(arr[i]);
	            }
	        }
	    }

	    _.extend(Store.prototype, Reflux.ListenerMethods, Reflux.PublisherMethods, Reflux.StoreMethods, definition);

	    var store = new Store();
	    Keep.createdStores.push(store);

	    return store;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	exports.createdStores = [];

	exports.createdActions = [];

	exports.reset = function() {
	    while(exports.createdStores.length) {
	        exports.createdStores.pop();
	    }
	    while(exports.createdActions.length) {
	        exports.createdActions.pop();
	    }
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(12);

	module.exports = function mix(def) {
	    var composed = {
	        init: [],
	        preEmit: [],
	        shouldEmit: []
	    };

	    var updated = (function mixDef(mixin) {
	        var mixed = {};
	        if (mixin.mixins) {
	            mixin.mixins.forEach(function (subMixin) {
	                _.extend(mixed, mixDef(subMixin));
	            });
	        }
	        _.extend(mixed, mixin);
	        Object.keys(composed).forEach(function (composable) {
	            if (mixin.hasOwnProperty(composable)) {
	                composed[composable].push(mixin[composable]);
	            }
	        });
	        return mixed;
	    }(def));

	    if (composed.init.length > 1) {
	        updated.init = function () {
	            var args = arguments;
	            composed.init.forEach(function (init) {
	                init.apply(this, args);
	            }, this);
	        };
	    }
	    if (composed.preEmit.length > 1) {
	        updated.preEmit = function () {
	            return composed.preEmit.reduce(function (args, preEmit) {
	                var newValue = preEmit.apply(this, args);
	                return newValue === undefined ? args : [newValue];
	            }.bind(this), arguments);
	        };
	    }
	    if (composed.shouldEmit.length > 1) {
	        updated.shouldEmit = function () {
	            var args = arguments;
	            return !composed.shouldEmit.some(function (shouldEmit) {
	                return !shouldEmit.apply(this, args);
	            }, this);
	        };
	    }
	    Object.keys(composed).forEach(function (composable) {
	        if (composed[composable].length === 1) {
	            updated[composable] = composed[composable][0];
	        }
	    });

	    return updated;
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(store, definition) {
	  for (var name in definition) {
	    if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
	        var propertyDescriptor = Object.getOwnPropertyDescriptor(definition, name);

	        if (!propertyDescriptor.value || typeof propertyDescriptor.value !== 'function' || !definition.hasOwnProperty(name)) {
	            continue;
	        }

	        store[name] = definition[name].bind(store);
	    } else {
	        var property = definition[name];

	        if (typeof property !== 'function' || !definition.hasOwnProperty(name)) {
	            continue;
	        }

	        store[name] = property.bind(store);
	    }
	  }

	  return store;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(12);

	/**
	 * A module of methods for object that you want to be able to listen to.
	 * This module is consumed by `createStore` and `createAction`
	 */
	module.exports = {

	    /**
	     * Hook used by the publisher that is invoked before emitting
	     * and before `shouldEmit`. The arguments are the ones that the action
	     * is invoked with. If this function returns something other than
	     * undefined, that will be passed on as arguments for shouldEmit and
	     * emission.
	     */
	    preEmit: function() {},

	    /**
	     * Hook used by the publisher after `preEmit` to determine if the
	     * event should be emitted with given arguments. This may be overridden
	     * in your application, default implementation always returns true.
	     *
	     * @returns {Boolean} true if event should be emitted
	     */
	    shouldEmit: function() { return true; },

	    /**
	     * Subscribes the given callback for action triggered
	     *
	     * @param {Function} callback The callback to register as event handler
	     * @param {Mixed} [optional] bindContext The context to bind the callback with
	     * @returns {Function} Callback that unsubscribes the registered event handler
	     */
	    listen: function(callback, bindContext) {
	        bindContext = bindContext || this;
	        var eventHandler = function(args) {
	            if (aborted){
	                return;
	            }
	            callback.apply(bindContext, args);
	        }, me = this, aborted = false;
	        this.emitter.addListener(this.eventLabel, eventHandler);
	        return function() {
	            aborted = true;
	            me.emitter.removeListener(me.eventLabel, eventHandler);
	        };
	    },

	    /**
	     * Attach handlers to promise that trigger the completed and failed
	     * child publishers, if available.
	     *
	     * @param {Object} The promise to attach to
	     */
	    promise: function(promise) {
	        var me = this;

	        var canHandlePromise =
	            this.children.indexOf('completed') >= 0 &&
	            this.children.indexOf('failed') >= 0;

	        if (!canHandlePromise){
	            throw new Error('Publisher must have "completed" and "failed" child publishers');
	        }

	        promise.then(function(response) {
	            return me.completed(response);
	        }, function(error) {
	            return me.failed(error);
	        });
	    },

	    /**
	     * Subscribes the given callback for action triggered, which should
	     * return a promise that in turn is passed to `this.promise`
	     *
	     * @param {Function} callback The callback to register as event handler
	     */
	    listenAndPromise: function(callback, bindContext) {
	        var me = this;
	        bindContext = bindContext || this;
	        this.willCallPromise = (this.willCallPromise || 0) + 1;

	        var removeListen = this.listen(function() {

	            if (!callback) {
	                throw new Error('Expected a function returning a promise but got ' + callback);
	            }

	            var args = arguments,
	                promise = callback.apply(bindContext, args);
	            return me.promise.call(me, promise);
	        }, bindContext);

	        return function () {
	          me.willCallPromise--;
	          removeListen.call(me);
	        };

	    },

	    /**
	     * Publishes an event using `this.emitter` (if `shouldEmit` agrees)
	     */
	    trigger: function() {
	        var args = arguments,
	            pre = this.preEmit.apply(this, args);
	        args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
	        if (this.shouldEmit.apply(this, args)) {
	            this.emitter.emit(this.eventLabel, args);
	        }
	    },

	    /**
	     * Tries to publish the event on the next tick
	     */
	    triggerAsync: function(){
	        var args = arguments,me = this;
	        _.nextTick(function() {
	            me.trigger.apply(me, args);
	        });
	    },

	    /**
	     * Returns a Promise for the triggered action
	     *
	     * @return {Promise}
	     *   Resolved by completed child action.
	     *   Rejected by failed child action.
	     *   If listenAndPromise'd, then promise associated to this trigger.
	     *   Otherwise, the promise is for next child action completion.
	     */
	    triggerPromise: function(){
	        var me = this;
	        var args = arguments;

	        var canHandlePromise =
	            this.children.indexOf('completed') >= 0 &&
	            this.children.indexOf('failed') >= 0;

	        var promise = _.createPromise(function(resolve, reject) {
	            // If `listenAndPromise` is listening
	            // patch `promise` w/ context-loaded resolve/reject
	            if (me.willCallPromise) {
	                _.nextTick(function() {
	                    var old_promise_method = me.promise;
	                    me.promise = function (promise) {
	                        promise.then(resolve, reject);
	                        // Back to your regularly schedule programming.
	                        me.promise = old_promise_method;
	                        return me.promise.apply(me, arguments);
	                    };
	                    me.trigger.apply(me, args);
	                });
	                return;
	            }

	            if (canHandlePromise) {
	                var removeSuccess = me.completed.listen(function(args) {
	                    removeSuccess();
	                    removeFailed();
	                    resolve(args);
	                });

	                var removeFailed = me.failed.listen(function(args) {
	                    removeSuccess();
	                    removeFailed();
	                    reject(args);
	                });
	            }

	            me.triggerAsync.apply(me, args);

	            if (!canHandlePromise) {
	                resolve();
	            }
	        });

	        return promise;
	    }
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * A module of methods that you want to include in all stores.
	 * This module is consumed by `createStore`.
	 */
	module.exports = {
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(12),
	    Reflux = __webpack_require__(8),
	    Keep = __webpack_require__(20),
	    allowed = {preEmit:1,shouldEmit:1};

	/**
	 * Creates an action functor object. It is mixed in with functions
	 * from the `PublisherMethods` mixin. `preEmit` and `shouldEmit` may
	 * be overridden in the definition object.
	 *
	 * @param {Object} definition The action object definition
	 */
	var createAction = function(definition) {

	    definition = definition || {};
	    if (!_.isObject(definition)){
	        definition = {actionName: definition};
	    }

	    for(var a in Reflux.ActionMethods){
	        if (!allowed[a] && Reflux.PublisherMethods[a]) {
	            throw new Error("Cannot override API method " + a +
	                " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead."
	            );
	        }
	    }

	    for(var d in definition){
	        if (!allowed[d] && Reflux.PublisherMethods[d]) {
	            throw new Error("Cannot override API method " + d +
	                " in action creation. Use another method name or override it on Reflux.PublisherMethods instead."
	            );
	        }
	    }

	    definition.children = definition.children || [];
	    if (definition.asyncResult){
	        definition.children = definition.children.concat(["completed","failed"]);
	    }

	    var i = 0, childActions = {};
	    for (; i < definition.children.length; i++) {
	        var name = definition.children[i];
	        childActions[name] = createAction(name);
	    }

	    var context = _.extend({
	        eventLabel: "action",
	        emitter: new _.EventEmitter(),
	        _isAction: true
	    }, Reflux.PublisherMethods, Reflux.ActionMethods, definition);

	    var functor = function() {
	        return functor[functor.sync?"trigger":"triggerPromise"].apply(functor, arguments);
	    };

	    _.extend(functor,childActions,context);

	    Keep.createdActions.push(functor);

	    return functor;

	};

	module.exports = createAction;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(8),
	    _ = __webpack_require__(12);

	module.exports = function(listenable,key){
	    return {
	        getInitialState: function(){
	            if (!_.isFunction(listenable.getInitialState)) {
	                return {};
	            } else if (key === undefined) {
	                return listenable.getInitialState();
	            } else {
	                return _.object([key],[listenable.getInitialState()]);
	            }
	        },
	        componentDidMount: function(){
	            _.extend(this,Reflux.ListenerMethods);
	            var me = this, cb = (key === undefined ? this.setState : function(v){
	                if (typeof me.isMounted === "undefined" || me.isMounted() === true) {
	                    me.setState(_.object([key],[v]));    
	                }
	            });
	            this.listenTo(listenable,cb);
	        },
	        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
	    };
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(8),
	  _ = __webpack_require__(12);

	module.exports = function(listenable, key, filterFunc) {
	    filterFunc = _.isFunction(key) ? key : filterFunc;
	    return {
	        getInitialState: function() {
	            if (!_.isFunction(listenable.getInitialState)) {
	                return {};
	            } else if (_.isFunction(key)) {
	                return filterFunc.call(this, listenable.getInitialState());
	            } else {
	                // Filter initial payload from store.
	                var result = filterFunc.call(this, listenable.getInitialState());
	                if (result) {
	                  return _.object([key], [result]);
	                } else {
	                  return {};
	                }
	            }
	        },
	        componentDidMount: function() {
	            _.extend(this, Reflux.ListenerMethods);
	            var me = this;
	            var cb = function(value) {
	                if (_.isFunction(key)) {
	                    me.setState(filterFunc.call(me, value));
	                } else {
	                    var result = filterFunc.call(me, value);
	                    me.setState(_.object([key], [result]));
	                }
	            };

	            this.listenTo(listenable, cb);
	        },
	        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
	    };
	};



/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(12),
	    ListenerMethods = __webpack_require__(11);

	/**
	 * A module meant to be consumed as a mixin by a React component. Supplies the methods from
	 * `ListenerMethods` mixin and takes care of teardown of subscriptions.
	 * Note that if you're using the `connect` mixin you don't need this mixin, as connect will
	 * import everything this mixin contains!
	 */
	module.exports = _.extend({

	    /**
	     * Cleans up all listener previously registered.
	     */
	    componentWillUnmount: ListenerMethods.stopListeningToAll

	}, ListenerMethods);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(8);

	/**
	 * A mixin factory for a React component. Meant as a more convenient way of using the `listenerMixin`,
	 * without having to manually set listeners in the `componentDidMount` method. This version is used
	 * to automatically set up a `listenToMany` call.
	 *
	 * @param {Object} listenables An object of listenables
	 * @returns {Object} An object to be used as a mixin, which sets up the listeners for the given listenables.
	 */
	module.exports = function(listenables){
	    return {
	        /**
	         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
	         * and then make the call to `listenTo` with the arguments provided to the factory function
	         */
	        componentDidMount: function() {
	            for(var m in Reflux.ListenerMethods){
	                if (this[m] !== Reflux.ListenerMethods[m]){
	                    if (this[m]){
	                        throw "Can't have other property '"+m+"' when using Reflux.listenToMany!";
	                    }
	                    this[m] = Reflux.ListenerMethods[m];
	                }
	            }
	            this.listenToMany(listenables);
	        },
	        /**
	         * Cleans up all listener previously registered.
	         */
	        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
	    };
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reflux = __webpack_require__(7);

	var _reflux2 = _interopRequireDefault(_reflux);

	var d3Actions = _reflux2['default'].createActions(['d3Event', 'mouseoverD3', 'mouseleaveD3']);

	exports['default'] = d3Actions;
	module.exports = exports['default'];

/***/ }
/******/ ]);