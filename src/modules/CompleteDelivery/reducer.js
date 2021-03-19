// @flow
import { Map } from 'immutable';
import {
  COMPLETE_DELIVERY_REQUEST,
  COMPLETE_DELIVERY_SUCCESS,
  COMPLETE_DELIVERY_FAILURE
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
    case COMPLETE_DELIVERY_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case COMPLETE_DELIVERY_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case COMPLETE_DELIVERY_FAILURE:
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
