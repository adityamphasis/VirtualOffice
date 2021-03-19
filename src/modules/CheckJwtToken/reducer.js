// @flow
import { Map } from 'immutable';
import {
  JWT_TOKEN_REQUEST,
  JWT_TOKEN_FAILURE,
  JWT_TOKEN_SUCCESS
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
    case JWT_TOKEN_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case JWT_TOKEN_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case JWT_TOKEN_FAILURE:
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
