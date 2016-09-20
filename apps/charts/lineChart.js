const d3 = require('d3');

export const lineChart = {
  defaultParams: {
    defaultDuration: 500,
    size: 1000, // debug switch, for exact values
    aspectRatio: 1 / 2,
    labelSize: 1,
    yLabel: 'Value',
    xLabel: 'Value',
    colorArray: d3.schemeCategory20,
    strokeWidth: 3,
    yAxisPlacement: 'left',
    xMax: -Infinity,
    yMax: -Infinity,
    xMin: Infinity,
    yMin: Infinity,
    interpolate: 'linear',
    tooltip: (d) => `<div>ID: ${d.id}</div>`,
  },

  mainFunction(loc, data, params, reactComp) {
    const self = this;
    this.reactComp = reactComp;

    self.par = Object.assign({}, this.defaultParams, params);

    this.size = this.par.size;
    const labelSize = this.par.labelSize;
    this.fontSize = labelSize * this.size / 100;
    let lM = 1;
    let rM = 1;

    if (this.par.yAxisPlacement === 'left') {
      lM = (1 + labelSize / 2) * 5;
    } else {
      rM = (1 + labelSize / 2) * 5;
    }

    this.margin = {
      top: this.size / 20,
      right: rM * this.size / 100,
      bottom: this.fontSize + this.size / 20,
      left: lM * this.size / 100,
    };
    this.width = this.size - this.margin.left - this.margin.right;
    this.height = this.size * this.par.aspectRatio -
      this.margin.top - this.margin.bottom;
    this.fullWidth = this.size;
    this.fullHeight = this.size * this.par.aspectRatio;

    this.x = d3.scaleLinear()
      .range([0, this.width]);

    this.y = d3.scaleLinear()
      .range([this.height, 0]);

    this.xAxis = d3.axisBottom(this.x)
      .tickSizeInner([this.size / 250])
      .tickSizeOuter([this.size / 250])
      .tickPadding([this.size / 250]);

    this.yAxis = d3.axisRight(this.y)
      .tickSizeInner([this.size / 250])
      .tickSizeOuter([this.size / 250])
      .tickPadding([this.size / 250]);
      // .orient(self.par.yAxisPlacement);

    this.vb = loc.append('svg')
      .attr('id', 'd3graphSVG')
      .style('display', 'inline-block')
      .style('position', 'absolute')
      .attr('preserveAspectRatio', 'xMinYMin slice')
      .attr('viewBox', `0 0 ${this.fullWidth} ${this.fullHeight}`);

    this.svg = this.vb.append('g')
      .attr('transform',
        `translate(${this.margin.left},${this.margin.top})`);

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
      .style('stroke-width', `${(this.par.size / 1000)}px`)
      .style('font-size', `${this.fontSize}px`)
      .style('font-family', 'sans-serif')
      .attr('transform', `translate(0,${this.height})`)
      .call(this.xAxis);

    this.xAx.append('text')
      .attr('x', (self.par.yAxisPlacement === 'left' ? this.width : 0))
      .attr('y', -this.fontSize / 2)
      .style('text-anchor', (self.par.yAxisPlacement === 'left' ?
        'end' : 'start'))
      .text(self.par.xLabel);

    this.yAx = this.svg.append('g')
      .attr('class', 'y axis')
      .style('stroke-width', `${(this.par.size / 1000)}px`)
      .style('font-size', `${this.fontSize}px`)
      .style('font-family', 'sans-serif')
      .attr('transform',
        `translate(${((self.par.yAxisPlacement === 'left' ? 0 : 1) * this.width)}, 0)`)
      .call(this.yAxis);

    this.yAx
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', (self.par.yAxisPlacement === 'left' ?
      this.fontSize / 2 : -this.fontSize))
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(self.par.yLabel);

    this.updateFunction(data, params);
  },

  destroyFunction() {
    this.tooltip.remove();
  },

  updateFunction(data, params) {
    const self = this;
    self.par = Object.assign({}, this.defaultParams, params);

    let curveGen = d3.curveLinear();
    switch (self.par.interpolate) {
      case 'linear-closed': {
        curveGen = d3.curveLinearClosed;
        break;
      }
      case 'step': {
        curveGen = d3.curveStep;
        break;
      }
      case 'step-after': {
        curveGen = d3.curveStepAfter;
        break;
      }
      case 'step-before': {
        curveGen = d3.curveStepBefore;
        break;
      }
      case 'basis': {
        curveGen = d3.curveBasis;
        break;
      }
      case 'basisClosed': {
        curveGen = d3.curveBasisClosed;
        break;
      }
      case 'bundle': {
        curveGen = d3.curveBundle;
        break;
      }
      case 'cardinal': {
        curveGen = d3.curveCardinal;
        break;
      }
      case 'cardinal-open': {
        curveGen = d3.curveCardinalOpen;
        break;
      }
      case 'cardinal-closed': {
        curveGen = d3.curveCardinalClosed;
        break;
      }
      case 'monotone': {
        curveGen = d3.curveMonotoneX;
        break;
      }
      default:
        curveGen = d3.curveLinear;
    }

    this.line = d3.line()
      //.curve(self.par.interpolate)
      .curve(curveGen)
      .x(d => this.x(d.x))
      .y(d => this.y(d.y));

    let { xMax, yMax, xMin, yMin } = self.par;
    data.forEach(line => {
      line.values.forEach(val => {
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
      .data(data, d => d.id);

    // ENTER
    this.lineGroup = this.joinLine.enter().append('g')
      .attr('class', 'lineGroup');

    this.joinLine.select('path')
      .transition()
      .duration(self.par.defaultDuration)
      .attr('d', d => this.line(d.values));

    this.lineGroup.append('path')
      .attr('class', 'line')
      .attr('id', d => `line${d.id}`)
      .style('fill', 'none')
      .style('stroke', (d, i) => self.par.colorArray[i])
      .style('stroke-width', self.par.strokeWidth)
      .style('stroke-linecap', 'round')
      .on('mouseover', d => this.mouseoverLine.call(self, d, this))
      .on('mouseout', d => this.mouseoutLine.call(self, d, this))
      .on('mousemove', d => this.mousemoveLine.call(self, d, this))
      .attr('d', d => this.line(d.values))
      .style('opacity', 0)
      .transition()
      .duration(self.par.defaultDuration)
      .style('opacity', 1);


    // EXIT
    this.joinLine.exit()
      .transition()
      .duration(self.par.defaultDuration)
      .style('opacity', 0)
      .remove();
  },

  onEvent(obj) {
    const self = this;
    const { d, e } = obj;
    switch (e) {
      case 'mouseover':
        this.svg.selectAll('.line')
          .style('stroke-width', self.par.strokeWidth);
        this.svg.select(`#line${d.id}`)
          .style('stroke-width', self.par.strokeWidth * 3);
        break;
      case 'mouseout':
        this.svg.selectAll('.line')
          .style('stroke-width', self.par.strokeWidth);
        break;
      default:
    }
  },

  mouseoverLine(d) {
    // pass the event to the partent component
    this.reactComp.handleChartEvent(d, 'mouseover');
    // this.reactComp
    // .handleChartEvent({id: this.par.fundMap.get(d.id).comp}, 'mouseover');

    this.svg.select(`#line${d.id}`)
      .style('stroke-width', this.par.strokeWidth * 3);

    // show tooltip
    this.tooltip.html(this.par.tooltip(d))
      .style('opacity', 1)
      .style('top', `${(d3.event.pageY - 10)}px`)
      .style('left', `${(d3.event.pageX + 10)}px`);
  },

  mouseoutLine(d) {
    // pass the event to the partent component
    this.reactComp.handleChartEvent(d, 'mouseout');

    this.svg.select(`#line${d.id}`)
      .transition()
      .duration(this.par.defaultDuration)
      .style('stroke-width', this.par.strokeWidth);

    // hide tooltip
    this.tooltip.style('opacity', 0);
  },

  mousemoveLine() {
    // note: we do not pass that event to parent component

    // move tooltip
    this.tooltip
      .style('top', `${(d3.event.pageY)}px`)
      .style('left', `${(+!this.par.debugMode * d3.event.pageX + 10)}px`);
  },
};
