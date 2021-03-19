// @flow
import {
  NEARME_REQUEST,
  NEARME_SUCCESS,
  NEARME_FAILURE
} from './types';
import type State from './types';


const INITIAL_STATE = [{
  error: null,
  response: '',
  isBusy: false

}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEARME_REQUEST:
    return {
        ...state,
        isBusy: true

      };
      //return state.update('isBusy', () => true);
    case NEARME_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload

      };


      case NEARME_FAILURE:
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
