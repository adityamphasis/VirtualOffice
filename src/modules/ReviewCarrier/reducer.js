// @flow
import { Map } from 'immutable';
import {
  RATING_CARRIER_REQUEST,
  RATING_CARRIER_SUCCESS,
  RATING_CARRIER_FAILURE
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
    case RATING_CARRIER_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case RATING_CARRIER_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case RATING_CARRIER_FAILURE:
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
