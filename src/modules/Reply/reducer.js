import {
  REPLY_REQUEST,
  REPLY_SUCCESS,
  REPLY_FAILURE
} from './types';
import type State from './types';


const INITIAL_STATE = [{
  error: null,
  response: '',
  isBusy: false

}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case REPLY_REQUEST:
    return {
        ...state,
        isBusy: true

      };
      //return state.update('isBusy', () => true);
    case REPLY_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload

      };


      case REPLY_FAILURE:
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
