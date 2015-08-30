'use strict';

let d3 = require('d3');

export const barChart = {
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
    tooltip: (d) => {
      return ('<div>ID: ' + d.id + '<br/>Value: ' + d.value + '</div>');
    }
  },

  mainFunction(loc, data, params, reactComp) {
    let self = this;
    this.reactComp = reactComp;

    self.par = Object.assign({}, this.defaultParams, params);

    this.size = this.par.size;
    let labelSize = this.par.labelSize;
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

    this.x = d3.scale.ordinal()
      .rangeRoundBands([0, this.width], .1);

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .innerTickSize(this.size / 250)
      .outerTickSize(this.size / 250)
      .tickPadding(this.size / 250)
      .orient('bottom');

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      //.ticks(Math.floor(10 / labelSize))
      .innerTickSize(this.size / 250)
      .outerTickSize(this.size / 250)
      .tickPadding(this.size / 250)
      .tickFormat(d3.format('s'))
      .orient('left');

    this.svg = loc.append('svg')
      .attr('id', 'd3graphSVG')
      .style('display', 'inline-block')
      .style('position', 'absolute')
      .attr('preserveAspectRatio', 'xMinYMin slice')
      .attr('viewBox', '0 0 ' + this.fullWidth + ' ' + this.fullHeight)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');


    this.x.domain(data.map(function(d) {
      return d.id;
    }));
    this.yMax = d3.max(data, function(d) {
        return d.value;
      }) || 100;
    this.y.domain([0, this.yMax]);


    this.xAx = this.svg.append('g')
      .attr('class', 'x axis')
      .style('stroke-width', this.par.size / 1000 + 'px')
      .style('font-size', this.fontSize + 'px')
      .style('font-family', 'sans-serif')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis);

    this.yAx = this.svg.append('g')
      .attr('class', 'y axis')
      .style('stroke-width', this.par.size / 1000 + 'px')
      .style('font-size', this.fontSize + 'px')
      .style('font-family', 'sans-serif')
      .call(this.yAxis);

    this.yAx
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', this.fontSize / 2)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(self.par.yLabel);

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

    this.updateFunction(data, params);
  },

  destroyFunction() {
    this.tooltip.remove();
  },

  updateFunction(data, params) {
    let self = this;
    self.par = Object.assign({}, this.defaultParams, params);

    self.colFunc = this.colorFunction(self.par);

    this.x.domain(data.map(function(d) {
      return d.id;
    }));
    this.yMax = d3.max(data, function(d) {
        return d.value;
      }) || 100;
    this.y.domain([0, this.yMax]);

    this.yAx
      .transition()
      .duration(self.par.defaultDuration)
      .call(this.yAxis);

    this.xAx
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

    this.join = this.svg.selectAll('.bar')
      .data(data, function(d) {
        return d.id;
      });

    this.join
      .transition()
      .duration(self.par.defaultDuration)
      .attr('y', function(d) {
        return self.y(d.value);
      })
      .attr('height', function(d) {
        return self.height - self.y(d.value);
      })
      .attr('width', self.x.rangeBand())
      .attr('x', function(d) {
        return self.x(d.id);
      })
      .style('fill', (d, i) => self.colFunc(d, i));

    //ENTER
    this.join.enter().append('rect')
      .attr('width', 0)
      .attr('height', 0)
      .attr('y', 0)
      .attr('rx', self.par.rx)
      .attr('ry', self.par.ry)
      .style('stroke', 'transparent')
      .style('stroke-width', '2px')
      .on('mouseover', (d) => {
        self.mouseoverBar.call(self, d, this);
      })
      .on('mouseout', (d) => {
        self.mouseoutBar.call(self, d, this);
      })
      .on('mousemove', (d) => {
        self.mousemoveBar.call(self, d, this);
      })
      .transition()
      .duration(self.par.defaultDuration)
      .attr('class', 'bar bar')
      .attr('id', (d) => {
        return 'bar-' + d.id;
      })
      .attr('x', (d) => {
        return self.x(d.id);
      })
      .attr('width', self.x.rangeBand())
      .attr('y', function(d) {
        return self.y(d.value);
      })
      .attr('height', function(d) {
        return self.height - self.y(d.value);
      })
      .style('fill', (d, i) => self.colFunc(d, i));

    //EXIT
    this.join.exit()
      .transition()
      .duration(self.par.defaultDuration)
      .attr('width', 0)
      .attr('height', 0)
      .remove();
  },

  onEvent(obj) {
    let self = this;
    let {d, e} = obj;
    switch (e) {
      case 'mouseover':
        this.svg.selectAll('.bar')
          .style('fill-opacity', 0.15)
          .style('stroke-opacity', 0)
          .style('stroke-width', '5px')
          .style('stroke', (dd, i) => self.colFunc(dd, i));
        this.svg.selectAll('#bar-' + d.id)
          .style('fill-opacity', 0.5)
          .style('stroke-opacity', 1);
        break;
      case 'mouseout':
        this.svg.selectAll('.bar')
          .style('fill-opacity', 1)
          .style('stroke', 'transparent')
          .style('stroke-width', '2px')
          .style('stroke-opacity', 1);
        break;
    }
  },

  colorFunction(par) {
    let self = this;
    if (par.colorType === 'gradient') {
      return d => {
        return d3.interpolateHsl(par.col1, par.col2)(d.value / self.yMax);
      };
    } else if (par.colorType === 'category') {
      let cols = par.colorArray;
      return (d, i) => {
        return cols[i];
      };
    } else {
      return () => 'gray';
    }
  },

  mouseoverBar(d) {
    //pass the event to the partent component
    this.reactComp.handleChartEvent(d, 'mouseover');

    //show tooltip
    this.tooltip.html(this.par.tooltip(d))
      .style('opacity', 1)
      .style('top', (d3.event.pageY - 10) + 'px')
      .style('left', (d3.event.pageX + 10) + 'px');
  },

  mouseoutBar(d) {
    //pass the event to the partent component
    this.reactComp.handleChartEvent(d, 'mouseout');

    //hide tooltip
    this.tooltip.style('opacity', 0);
  },

  mousemoveBar() {
    //note: we do not pass that event to parent component

    //move tooltip
    this.tooltip
      .style('top', (d3.event.pageY) + 'px')
      .style('left', (d3.event.pageX + 10) + 'px');
  }
};
