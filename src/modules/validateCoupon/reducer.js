// @flow
import { Map } from 'immutable';
import {
  validateCoupon_SUCCESS,
  validateCoupon_FAILURE,
  validateCoupon_REQUEST
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
    case validateCoupon_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case validateCoupon_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case validateCoupon_FAILURE:
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
