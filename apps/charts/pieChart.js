'use strict';

let d3 = require('d3');

export let pieChart = {
  defaultParams: {
    col1: 'green',
    col2: 'red',
    defaultDuration: 500,
    innerRadius: 0,
    cornerRadius: 5,
    colorType: 'gradient',
    colorArray: d3.scale.category20().range()
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
      .outerRadius(radius - 10);

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

    let colFunc = this.colorFunction(par);

    this.arc
      .innerRadius(par.innerRadius)
      .cornerRadius(par.cornerRadius);

    this.join = this.svg.selectAll(".pie")
      .data(this.pie(data), function(d) {
        return d.data.id
      });
    this.angMax = d3.max(this.pie(data).map(function(d) {
      return d.endAngle - d.startAngle
    }));

    this.join
      .transition()
      .duration(500)
      .attrTween('d', function(d) {
        return self.tweenFunc.apply(this, [d, self])
      })
      .style('fill', (d, i) => colFunc(d, i));

    //ENTER
    this.join.enter().append("path")
      .attr('class', 'pie pie-sector')
      .attr('id', function(d) {
        return 'pie-sector-' + d.data.id
      })
      .style('stroke', 'white')
      .style('stroke-width', '2px')
      .attr("d", this.arc)
      .each(function(d) {
        this._current = d;
      })
      .style('fill', (d, i) => colFunc(d, i))
      .on('mouseover', function(d) {
        self.mouseoverSector.call(self, d, this)
      })
      .on('mouseleave', function(d) {
        self.mouseleaveSector.call(self, d, this);
      });

    //EXIT
    this.join.exit().remove();
  },

  colorFunction(par) {
    let self = this;
    if (par.colorType === 'gradient') {
      return (
        (d) => {
          return d3.interpolateHsl(par.col1, par.col2)
          ((d.endAngle - d.startAngle) / self.angMax)
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

  onEvent(obj) {
    let {d, e} = obj;
    switch (e) {
      case 'mouseover':
        this.svg.selectAll('.pie-sector')
          .transition()
          .duration(100)
          .style('opacity', 0.25);
        this.svg.selectAll('#pie-sector-' + d.id)
          .transition()
          .duration(100)
          .style('opacity', 1);
        break;
      case 'mouseleave':
        this.svg.selectAll('.pie-sector')
          .transition()
          .duration(100)
          .style('opacity', 1);
        break;
    }
  },

  mouseoverSector(d, me) {
    //pass the event to the partent component
    this.reactComp.handleChartEvent(d.data, 'mouseover');
  },

  mouseleaveSector(d, me) {
    //pass the event to the partent component
    this.reactComp.handleChartEvent(d.data, 'mouseleave');
  }
};
