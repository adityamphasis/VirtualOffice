// @flow
import { Map } from 'immutable';
import {
  PICKUP_ORDER_REQUEST,
  PICKUP_ORDER_SUCCESS,
  PICKUP_ORDER_FAILURE
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
    case PICKUP_ORDER_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case PICKUP_ORDER_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case PICKUP_ORDER_FAILURE:
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
