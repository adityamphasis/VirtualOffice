// @flow
import {
  ADDCONTACT_REQUEST,
  ADDCONTACT_SUCCESS,
  ADDCONTACT_FAILURE
} from './types';
import type State from './types';


const INITIAL_STATE = [{
  error: null,
  response: '',
  isBusy: false

}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDCONTACT_REQUEST:
    return {
        ...state,
        isBusy: true

      };
      //return state.update('isBusy', () => true);
    case ADDCONTACT_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload

      };


      case ADDCONTACT_FAILURE:
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
