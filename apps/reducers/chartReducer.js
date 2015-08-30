'use strict';

import {
  SET_EVENT
} from '../constants/ActionTypes';

const initialState = {
  data: {},
  eventGroup: [],
  event: '',
  timeStamp: 0

};

export default function chartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENT:
      let {data, event, eventGroup} = action.event;
      let timeStamp = new Date().getTime();
      let newState = Object.assign(
        {},
        state,
        {data, event, eventGroup, timeStamp}
      );
      return newState;
    default:
      return state;
  }
}