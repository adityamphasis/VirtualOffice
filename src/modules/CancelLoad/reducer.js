// @flow
import { Map } from 'immutable';
import {
  CANCEL_LOAD_REQUEST,
  CANCEL_LOAD_SUCCESS,
  CANCEL_LOAD_FAILURE
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
    case CANCEL_LOAD_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case CANCEL_LOAD_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case CANCEL_LOAD_FAILURE:
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
