'use strict';

let d3 = require('d3');
//import {tooltipGenerator} from './matrixChartTooltip.js';

//let moment = require('moment');

export let lineChart = {
  defaultParams: {
    defaultDuration: 500,
    yLabel: 'Value',
    xLabel: 'Value',
    colorArray: d3.scale.category20().range(),
    strokeWidth: '3px',
    yAxisPlacement: 'left',
    xMax: -Infinity,
    yMax: -Infinity,
    xMin: Infinity,
    yMin: Infinity,
    tooltip: (d) => {
      return ('<div>ID: ' + d.id + '</div>');
    }
  },

  mainFunction(loc, data, params, reactComp) {
    let self = this;
    this.reactComp = reactComp;

    self.par = Object.assign({}, this.defaultParams, params);

    this.size = 800;

    this.margin = {top: 40, right: 40, bottom: 20, left: 40};
    this.width = this.size - this.margin.left - this.margin.right;
    this.height = this.size / 2 - this.margin.top - this.margin.bottom;
    this.fullWidth = this.size;
    this.fullHeight = this.size / 2;

    //this.x = d3.time.scale()
    //  .range([0, this.width]);

    this.x = d3.scale.linear()
      .range([0, this.width]);

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient('bottom');

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .orient(self.par.yAxisPlacement);

    this.vb = loc.append('svg')
      .attr('id', 'd3graphSVG')
      .style('display', 'inline-block')
      .style('position', 'absolute')
      .attr('preserveAspectRatio', 'xMinYMin slice')
      .attr('viewBox', '0 0 ' + this.fullWidth + ' ' + this.fullHeight);

    this.svg = this.vb.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.tooltip = d3.select('body')
      .append('div')
      .style('background', 'rgba(238, 238, 238, 0.85)')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('border-color', '#999')
      .style('border-width', '2px')
      .style('border-style', 'solid')
      .style('pointer-events', 'none')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('opacity', 0);

    this.xAx = this.svg.append('g')
      .attr('class', 'x axis')
      .style('font-size', '10px')
      .style('font-family', 'sans-serif')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis);

    this.xAx.append('text')
      .attr('x', (self.par.yAxisPlacement === 'left' ? this.width : this.margin.left))
      .attr('y', -7)
      .style('text-anchor', 'end')
      .text(self.par.xLabel);

    this.yAx = this.svg.append('g')
      .attr('class', 'y axis')
      .style('font-size', '10px')
      .style('font-family', 'sans-serif')
      .attr('transform', 'translate(' +
      ((self.par.yAxisPlacement === 'left' ? 0 : 1) * this.width) + ', 0)')
      .call(this.yAxis);

    this.yAx
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', (self.par.yAxisPlacement === 'left' ? 6 : -12))
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(self.par.yLabel);
    ;

    this.line = d3.svg.line()
      .x(d=>this.x(d.x))
      .y(d=>this.y(d.y));

    this.updateFunction(data, params);
  },

  destroyFunction() {
    this.tooltip.remove();
  },

  updateFunction(data, params) {
    let self = this;
    self.par = Object.assign({}, this.defaultParams, params);

    let {xMax, yMax, xMin, yMin} = self.par;
    data.map(line => {
      line.values.map(val => {
        xMax = Math.max(val.x, xMax);
        yMax = Math.max(val.y, yMax);
        xMin = Math.min(val.x, xMin);
        yMin = Math.min(val.y, yMin);
      })
    });

    this.x.domain([xMin, xMax]);
    this.y.domain([yMin, yMax]);

    this.xAx
      .transition()
      .duration(self.par.defaultDuration)
      .call(this.xAxis);

    this.yAx
      .transition()
      .duration(self.par.defaultDuration)
      .call(this.yAxis);

    this.svg.select('.y.axis')
      .transition()
      .duration(self.par.defaultDuration)
      .call(this.yAxis);

    this.svg.select('.x.axis')
      .transition()
      .duration(self.par.defaultDuration)
      .call(this.xAxis);

    this.svg.selectAll('.axis line')
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('shape-rendering', 'crispEdges');

    this.svg.selectAll('.axis path')
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('shape-rendering', 'crispEdges');

    this.joinLine = this.svg.selectAll('.lineGroup')
      .data(data,
        d => {
        return d.id;
      });

    //ENTER
    this.lineGroup = this.joinLine.enter().append('g')
      .attr('class', 'lineGroup');

    this.lineGroup.append('path')
      .attr('class', 'line')
      .attr('id', d => 'line' + d.id)
      .style('fill', 'none')
      .style('stroke', (d, i) => self.par.colorArray[i])
      .style('stroke-width', self.par.strokeWidth)
      .style('stroke-linecap', 'round')
      .on('mouseover', d => this.mouseoverLine.call(self, d, this))
      .on('mouseout', d => this.mouseoutLine.call(self, d, this))
      .on('mousemove', d => this.mousemoveLine.call(self, d, this))
      .attr('d', d=> {
        return this.line(d.values);
      });

    this.joinLine.select('path')
      .transition()
      .duration(self.par.defaultDuration)
      .attr('d', d=> {
        return this.line(d.values);
      });

    //EXIT
    this.joinLine.select('.line')
      .attr('d', this.line);

    this.joinLine.exit().remove();

  },

  onEvent(obj) {
    let self = this;
    let {d, e} = obj;
    switch (e) {
      case 'mouseover':
        this.svg.selectAll('.line')
          .style('stroke-width', self.par.strokeWidth);
        this.svg.select('#line' + d.id)
          .style('stroke-width', '10px');
        break;
      case 'mouseout':
        this.svg.selectAll('.line')
          .style('stroke-width', self.par.strokeWidth);
        break;
    }
  },

  onEvent2(obj) {
    let self = this;
    let {d, e} = obj;

    if (self.par.companyMap.has(d.id)) {
      let compFunds = [...self.par.companyMap.get(d.id)];

      switch (e) {
        case 'mouseover':
          compFunds.map(fID => {
            this.svg.selectAll('.views' + fID)
              .style('opacity', 1);
          });
          break;
        case 'mouseout':
          compFunds.map(fID => {
            this.svg.selectAll('.views' + fID)
              .style('opacity', 0.5);
          });
          break;
      }
    } else {
      switch (e) {
        case 'mouseover':
          this.svg.selectAll('.views' + d.id)
            .style('opacity', 1);
          break;
        case 'mouseout':
          this.svg.selectAll('.views' + d.id)
            .style('opacity', 0.5);
          break;
      }
    }
  },

  mouseoverLine(d) {
    //pass the event to the partent component
    this.reactComp.handleChartEvent(d, 'mouseover');
    //this.reactComp.handleChartEvent({id: this.par.fundMap.get(d.id).comp}, 'mouseover');

    this.svg.select('#line' + d.id)
      .style('stroke-width', '10px');

    //show tooltip
    this.tooltip.html(this.par.tooltip(d))
      .style('opacity', 1)
      .style('top', (d3.event.pageY - 10) + 'px')
      .style('left', (d3.event.pageX + 10) + 'px');
  },

  mouseoutLine(d) {
    //pass the event to the partent component
    this.reactComp.handleChartEvent(d, 'mouseout');

    this.svg.select('#line' + d.id)
      .transition()
      .duration(this.par.defaultDuration)
      .style('stroke-width', this.par.strokeWidth);

    //hide tooltip
    this.tooltip.style('opacity', 0);
  },

  mousemoveLine() {
    //note: we do not pass that event to parent component

    //move tooltip
    this.tooltip
      .style('top', (d3.event.pageY) + 'px')
      .style('left', (+!this.par.debugMode * d3.event.pageX + 10) + 'px');
  }
};
