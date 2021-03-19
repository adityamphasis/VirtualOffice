// @flow
import {
  GETLOADDETAILS_REQUEST,
  GETLOADDETAILS_SUCCESS,
  GETLOADDETAILS_FAILURE
} from './types';
import type State from './types';


const INITIAL_STATE = [{
  error: null,
  response: '',
  isBusy: false
}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETLOADDETAILS_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: ''

      };
      //return state.update('isBusy', () => true);
    case GETLOADDETAILS_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload


      };


      case GETLOADDETAILS_FAILURE:
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
