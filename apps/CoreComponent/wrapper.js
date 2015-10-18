import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ChartActions from '../actions/ChartActions';

function mapStateToProps(state) {
  return {
    eventData: state.d3ReactSquared,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChartActions, dispatch);
}

export default function(component) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
