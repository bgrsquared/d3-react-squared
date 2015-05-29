'use strict';

import Reflux from 'reflux';
import d3Actions from '../actions/D3actions.js';

const d3Store = Reflux.createStore({
  //link actions
  listenables: d3Actions,

  //define actions
  onD3Event(data, event, emit) {
    this.update(data, event, emit);
  },

  //publish
  update(d, e, emit) {
    //d is the data object, we want to pass on the id
    //e is the event, such as 'mouseover'. We set accordingly
    this.trigger({d, e}, emit);
  }
});

export default d3Store;