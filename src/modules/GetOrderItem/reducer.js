// @flow
import {
  GETORDERITEM_REQUEST,
  GETORDERITEM_SUCCESS,
  GETORDERITEM_FAILURE
} from './types';
import type State from './types';


const INITIAL_STATE = [{
  error: null,
  response: '',
  isBusy: false

}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETORDERITEM_REQUEST:
    return {
        ...state,
        isBusy: true

      };
      //return state.update('isBusy', () => true);
    case GETORDERITEM_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload

      };


      case GETORDERITEM_FAILURE:
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
