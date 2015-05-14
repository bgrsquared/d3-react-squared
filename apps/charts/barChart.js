'use strict';

let d3 = require('d3');

export let barChart = {
  defaultParams: {
    col1: 'green',
    col2: 'red',
    defaultDuration: 500,
    rx: 5,
    ry: 5,
    yLabel: 'Value',
    colorType: 'gradient',
    colorArray: d3.scale.category20().range()
  },

  mainFunction(loc, data, params, reactComp) {
    let self = this;
    this.reactComp = reactComp;

    let par = Object.assign({}, this.defaultParams, params);

    let size = 250;

    let margin = {top: 10, right: 20, bottom: 50, left: 40},
      width = size - margin.left - margin.right;
    this.height = size - margin.top - margin.bottom;
    let fullWidth = size;
    let fullHeight = size;

    this.x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("bottom");

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .tickFormat(d3.format('s'))
      .orient("left");

    this.svg = loc.append("svg")
      .attr('id', 'd3graphSVG')
      .style('display', 'inline-block')
      .style('position', 'absolute')
      .attr('preserveAspectRatio', 'xMinYMin slice')
      .attr('viewBox', '0 0 ' + fullWidth + ' ' + fullHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    this.x.domain(data.map(function(d) {
      return d.id;
    }));
    this.yMax = d3.max(data, function(d) {
        return d.value;
      }) || 100;
    this.y.domain([0, this.yMax]);


    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.xAxis);

    this.svg.append("g")
      .attr("class", "y axis")
      .call(this.yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(par.yLabel);

    this.updateFunction(data, params);
  },

  updateFunction(data, params) {
    let self = this;
    let par = Object.assign({}, this.defaultParams, params);

    let colFunc = this.colorFunction(par);

    this.x.domain(data.map(function(d) {
      return d.id;
    }));
    this.yMax = d3.max(data, function(d) {
        return d.value;
      }) || 100;
    this.y.domain([0, this.yMax]);

    this.svg.select('.y.axis')
      .style('font-size', '10px')
      .style('font-family', 'sans-serif')
      .transition()
      .duration(par.defaultDuration)
      .call(this.yAxis);

    this.svg.select('.x.axis')
      .style('font-size', '10px')
      .style('font-family', 'sans-serif')
      .transition()
      .duration(par.defaultDuration)
      .call(this.xAxis);

    this.svg.selectAll('.axis line')
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('shape-rendering', 'crispEdges');

    this.svg.selectAll('.axis path')
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('shape-rendering', 'crispEdges');

    this.join = this.svg.selectAll(".bar")
      .data(data, function(d) {
        return d.id
      });

    this.join
      .transition()
      .duration(par.defaultDuration)
      .attr("y", function(d) {
        return self.y(d.value);
      })
      .attr("height", function(d) {
        return self.height - self.y(d.value);
      })
      .attr("width", self.x.rangeBand())
      .attr("x", function(d) {
        return self.x(d.id);
      })
      .style('fill', (d, i) => colFunc(d, i));

    //ENTER
    this.join.enter().append("rect")
      .attr('width', 0)
      .attr('height', 0)
      .attr('y', 0)
      .attr('rx', par.rx)
      .attr('ry', par.ry)
      .on('mouseover', function(d) {
        self.mouseoverBar.call(self, d, this)
      })
      .on('mouseleave', function(d) {
        self.mouseleaveBar.call(self, d, this);
      })
      .transition()
      .duration(par.defaultDuration)
      .attr("class", "bar bar")
      .attr('id', function(d) {
        return 'bar-' + d.id
      })
      .attr("x", function(d) {
        return self.x(d.id);
      })
      .attr("width", self.x.rangeBand())
      .attr("y", function(d) {
        return self.y(d.value);
      })
      .attr("height", function(d) {
        return self.height - self.y(d.value);
      })
      .style('fill', (d, i) => colFunc(d, i));

    //EXIT
    this.join.exit()
      .transition()
      .duration(par.defaultDuration)
      .attr('width', 0)
      .attr('height', 0)
      .remove();
  },

  onEvent(obj) {
    let {d, e} = obj;
    switch (e) {
      case 'mouseover':
        this.svg.selectAll('.bar')
          .transition()
          .duration(100)
          .style('opacity', 0.25);
        this.svg.selectAll('#bar-' + d.id)
          .transition()
          .duration(100)
          .style('opacity', 1);
        break;
      case 'mouseleave':
        this.svg.selectAll('.bar')
          .transition()
          .duration(100)
          .style('opacity', 1);
        break;
    }
  },

  colorFunction(par) {
    let self = this;
    if (par.colorType === 'gradient') {
      return (
        (d) => {
          return d3.interpolateHsl(par.col1, par.col2)
          (d.value / self.yMax)
        })
    } else if (par.colorType === 'category') {
      let cols = par.colorArray;
      return ((d, i) => {
        return cols[i];
      })
    } else {
      return () => 'gray';
    }
  },

  mouseoverBar(d, me) {
    //pass the event to the partent component
    this.reactComp.handleChartEvent(d, 'mouseover');
  },

  mouseleaveBar(d, me) {
    //pass the event to the partent component
    this.reactComp.handleChartEvent(d, 'mouseleave');
  }
};
