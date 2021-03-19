// @flow
import { Map } from 'immutable';
import {
  UPDATE_RECURRING_REQUEST,
  UPDATE_RECURRING_SUCCESS,
  UPDATE_RECURRING_FAILURE
} from './types';
import type State from './types';
import { setAuthenticationToken } from './actions';




const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_RECURRING_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case UPDATE_RECURRING_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case UPDATE_RECURRING_FAILURE:
      return {
          ...state,
          isBusy: false,
          response: null
        };
    default:
      return state;
  }
};

export default reducer;
