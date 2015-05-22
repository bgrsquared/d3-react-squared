'use strict';

import Reflux from 'reflux';
import d3Actions from '../actions/D3actions.js';

const d3Store = Reflux.createStore({
  //link actions
  listenables: d3Actions,

  //define actions
  onD3Event(data, event) {
    this.update(data, event);
  },

  //publish
  update(d, e) {
    //d is the data object, we want to pass on the id
    //e is the event, such as 'mouseover'. We set accordingly
    this.trigger({d, e});
  }
});

export default d3Store;