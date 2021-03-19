// @flow
import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE
} from './types';
import type State from './types';


const INITIAL_STATE = [{
  error: null,
  response: '',
  isBusy: false

}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKING_REQUEST:
    return {
        ...state,
        isBusy: true

      };
      //return state.update('isBusy', () => true);
    case BOOKING_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload

      };


      case BOOKING_FAILURE:
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
