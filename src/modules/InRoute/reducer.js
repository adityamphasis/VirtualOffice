// @flow
import { Map } from 'immutable';
import {
  IN_ROUTE_REQUEST,
  IN_ROUTE_SUCCESS,
  IN_ROUTE_FAILURE
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
    case IN_ROUTE_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case IN_ROUTE_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case IN_ROUTE_FAILURE:
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
