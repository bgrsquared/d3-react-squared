'use strict';

let d3 = require('d3');

module.exports = function() {
  return {
    //default parameters (mandatory)
    defaultParams: {
      param1: 'value1', //will be used as default as not explicitly set
      param2: 'value2'
    },

    //mainFunction (mandatory) will be called on chart creation
    mainFunction: function(loc, data, params, reactComp) {
      let self = this;
      this.reactComp = reactComp;

      //set parameters (explicit overrides default)
      let par = Object.assign({}, this.defaultParams, params);

      //size (absolute!) of the chart (will be scaled in viewbox!
      let size = 250;

      //some examplary size/width/etc. setup
      let width = size - 20,
        height = size - 20,
        radius = Math.min(width, height) / 2;
      let fullWidth = size;
      let fullHeight = size;

      //svg setup
      this.svg = loc.append("svg")
        .attr('id', 'd3graphSVG')
        .style('display', 'inline-block')
        .style('position', 'absolute')
        .attr('preserveAspectRatio', 'xMinYMin slice')
        .attr('viewBox', '0 0 ' + fullWidth + ' ' + fullHeight)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      //call updateFunction
      this.updateFunction(data, params);
    },

    // updateFunction routine (mandatory), will be called on new data
    // (and usually after mainFunction)
    updateFunction: function(data, params) {

      let self = this;
      let par = Object.assign({}, this.defaultParams, params);

      // here is where you do some D3 magic...
      // (see the examples) (for code, not magic)
      // make sure to use D3's enter/update/exit pattern with proper joins, to
      // get the full power of data updates.

      // if you want to pass events to the parent reactComponent, you could do something like:
      // .on('mouseover', (d) => {
      //   self.mouseoverBar.call(self, d, otherArguments)
      //  })
    },

    genericEvent: function(d, otherArguments) {
      // send an event to the parent reactComp.
      this.reactComp.handleChartEvent(d.data, 'eventName');
    }
  };
};
