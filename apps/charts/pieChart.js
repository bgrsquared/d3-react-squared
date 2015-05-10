'use strict';

let d3 = require('d3');

export let pieChart = {
  defaultParams: {
    col1: 'green',
    col2: 'red',
    defaultDuration: 500
  },

  mainFunction(loc, data, params, reactComp) {
    let self = this;
    this.reactComp = reactComp;

    let par = Object.assign({}, this.defaultParams, params);

    let size = 250;

    let width = size - 20,
      height = size - 20,
      radius = Math.min(width, height) / 2;
    let fullWidth = size;
    let fullHeight = size;

    this.arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    this.pie = d3.layout.pie()
      .sort(null)
      .value(function(d) {
        return d.value;
      });

    this.svg = loc.append("svg")
      .attr('id', 'd3graphSVG')
      .style('display', 'inline-block')
      .style('position', 'absolute')
      .attr('preserveAspectRatio', 'xMinYMin slice')
      .attr('viewBox', '0 0 ' + fullWidth + ' ' + fullHeight)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    this.updateFunction(data, params);
  },

  tweenFunc(a, context) {
    let i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {

      return context.arc(i(t));
    };
  },

  updateFunction(data, params) {
    let self = this;
    let par = Object.assign({}, this.defaultParams, params);
    this.join = this.svg.selectAll(".pie")
      .data(this.pie(data), function(d) {
        return d.data.id
      });
    let angMax = d3.max(this.pie(data).map(function(d) {
      return d.endAngle - d.startAngle
    }));

    this.join
      .transition()
      .duration(500)
      .attrTween('d', function(d) {
        return self.tweenFunc.apply(this, [d, self])
      })
      .style('fill', function(d) {
        return d3.interpolateHsl(par.col1, par.col2)
        ((d.endAngle - d.startAngle) / angMax)
      });

    //ENTER
    this.join.enter().append("path")
      .attr('class', 'pie cross-highlight-pie')
      .attr('id', function(d) {
        return 'cross-highlight-pie-sector-' + d.data.id
      })
      .style('stroke', 'white')
      .style('stroke-width', '2px')
      .attr("d", this.arc)
      .each(function(d) {
        this._current = d;
      })
      .style('fill', function(d) {
        return d3.interpolateHsl(par.col1, par.col2)((d.endAngle - d.startAngle) / angMax)
      })
      .on('mouseover', function(d) {
        self.mouseoverSector.call(self, d, this)
      })
      .on('mouseleave', function(d) {
        self.mouseleaveSector.call(self, d, this);
      });

    //EXIT
    this.join.exit().remove();
  },

  mouseoverSector(d, me) {
    // phone mommy
    this.reactComp.handleChartEvent(d.data, 'over');
  },

  mouseleaveSector(d, me) {
    // phone mommy
    this.reactComp.handleChartEvent(d.data, 'leave');
  }
};
