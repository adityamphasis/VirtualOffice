// @flow
import { Map } from 'immutable';
import {
  ADD_BID_REQUEST,
  ADD_BID_SUCCESS,
  ADD_BID_FAILURE
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
    case ADD_BID_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case ADD_BID_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case ADD_BID_FAILURE:
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
