'use strict';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ChartActions from '../actions/ChartActions';

import C3Component from './c3component';

function mapStateToProps(state) {
  return {
    eventData: state.d3ReactSquared
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(C3Component);