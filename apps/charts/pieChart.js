const d3 = require('d3');

export const pieChart = {
  defaultParams: {
    size: 1000, // debug switch, for exact values
    col1: 'green',
    col2: 'red',
    defaultDuration: 500,
    innerRadius: 0,
    cornerRadius: 5,
    colorType: 'gradient',
    colorArray: d3.scale.category20().range(),
    tooltip: (d) => {
      return ('<div>ID: ' + d.id + '<br/>Value: ' + d.value + '</div>');
    },
  },

  mainFunction(loc, data, params, reactComp) {
    this.reactComp = reactComp;

    this.par = Object.assign({}, this.defaultParams, params);

    const size = this.par.size;

    const width = size - 20;
    const height = size - 20;
    const radius = Math.min(width, height) / 2;
    const fullWidth = size;
    const fullHeight = size;

    this.arc = d3.svg.arc()
      .outerRadius(radius - 10);

    this.pie = d3.layout.pie()
      .sort(null)
      .value((d) => {
        return d.value;
      });

    this.svg = loc.append('svg')
      .attr('id', 'd3graphSVG')
      .style('display', 'inline-block')
      .style('position', 'absolute')
      .attr('preserveAspectRatio', 'xMinYMin slice')
      .attr('viewBox', '0 0 ' + fullWidth + ' ' + fullHeight)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

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

  tweenFunc(a, context) {
    const i = d3.interpolate(this._current || a, a);
    this._current = i(0);
    return (t) => {
      return context.arc(i(t));
    };
  },

  updateFunction(data, params) {
    const self = this;
    this.par = Object.assign({}, this.defaultParams, params);

    this.colFunc = this.colorFunction(this.par);

    this.arc
      .innerRadius(this.par.innerRadius)
      .cornerRadius(this.par.cornerRadius);

    this.join = this.svg.selectAll('.pie')
      .data(this.pie(data), (d) => {
        return d.data.id;
      });
    this.angMax = d3.max(this.pie(data).map((d) => {
      return d.endAngle - d.startAngle;
    }));

    this.join
      .transition()
      .duration(500)
      .attrTween('d', (d) => {
        return self.tweenFunc.apply(this, [d, self]);
      })
      .style('fill', (d, i) => self.colFunc(d, i));

    // ENTER
    this.join.enter().append('path')
      .attr('class', 'pie pie-sector')
      .attr('id', (d) => {
        return 'pie-sector-' + d.data.id;
      })
      .style('stroke', 'white')
      .style('stroke-width', '2px')
      .attr('d', this.arc)
      .each((d) => {
        this._current = d;
      })
      .style('fill', (d, i) => self.colFunc(d, i))
      .on('mouseover', (d) => {
        self.mouseoverSector.call(self, d, this);
      })
      .on('mouseout', (d) => {
        self.mouseoutSector.call(self, d, this);
      })
      .on('mousemove', (d) => {
        self.mousemoveSector.call(self, d, this);
      });

    // EXIT
    this.join.exit().remove();
  },

  colorFunction() {
    const self = this;
    if (this.par.colorType === 'gradient') {
      return (d) => {
        return d3.interpolateHsl(self.par.col1, self.par.col2)(
          (d.endAngle - d.startAngle) / self.angMax);
      };
    } else if (self.par.colorType === 'category') {
      const cols = self.par.colorArray;
      return (d, i) => {
        return cols[i];
      };
    }
    return () => 'gray';
  },

  onEvent(obj) {
    const self = this;
    const {d, e} = obj;
    switch (e) {
      case 'mouseover':
        this.svg.selectAll('.pie-sector')
          .style('fill-opacity', 0.15)
          .style('stroke-opacity', 0)
          .style('stroke-width', '5px')
          .style('stroke', (dd, i) => self.colFunc(dd, i));
        this.svg.selectAll('#pie-sector-' + d.id)
          .style('fill-opacity', 0.5)
          .style('stroke-opacity', 1);
        break;
      case 'mouseout':
        this.svg.selectAll('.pie-sector')
          .style('fill-opacity', 1)
          .style('stroke', 'white')
          .style('stroke-width', '2px')
          .style('stroke-opacity', 1);
        break;
      default:
    }
  },

  mouseoverSector(d) {
    // pass the event to the partent component
    this.reactComp.handleChartEvent(d.data, 'mouseover');

    // show tooltip
    this.tooltip.html(this.par.tooltip(d.data))
      .style('opacity', 1)
      .style('top', (d3.event.pageY - 10) + 'px')
      .style('left', (d3.event.pageX + 10) + 'px');
  },

  mouseoutSector(d) {
    // pass the event to the partent component
    this.reactComp.handleChartEvent(d.data, 'mouseout');

    // hide tooltip
    this.tooltip.style('opacity', 0);
  },

  mousemoveSector() {
    // note: we do not pass that event to parent component

    // move tooltip
    this.tooltip
      .style('top', (d3.event.pageY) + 'px')
      .style('left', (d3.event.pageX + 10) + 'px');
  },
};
