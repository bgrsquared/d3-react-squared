import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChartActions from '../actions/ChartActions';

import D3Component from './d3component';

function mapStateToProps(state) {
  return {
    eventData: state.d3ReactSquared,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(D3Component);
