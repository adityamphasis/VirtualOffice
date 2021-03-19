// @flow
import { Map } from 'immutable';
import {
  ACCEPT_BID_REQUEST,
  ACCEPT_BID_SUCCESS,
  ACCEPT_BID_FAILURE
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
    case ACCEPT_BID_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case ACCEPT_BID_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case ACCEPT_BID_FAILURE:
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
