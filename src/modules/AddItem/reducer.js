// @flow
import {
  ADDITEM_REQUEST,
  ADDITEM_REQUEST_SUCCESS,
  ADDITEM_REQUEST_FAILURE
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
    case ADDITEM_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case ADDITEM_REQUEST_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case ADDITEM_REQUEST_FAILURE:
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
