'use strict'

import * as types from '../constants/ActionTypes';

export function setEvent(event) {
  return {
    type: types.SET_EVENT,
    event
  };
}
