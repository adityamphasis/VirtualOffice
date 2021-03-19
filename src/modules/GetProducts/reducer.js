// @flow
import {
  GETPRODUCTS_REQUEST,
  GETPRODUCTS_SUCCESS,
  GETPRODUCTS_FAILURE
} from './types';
import type State from './types';


const INITIAL_STATE = [{
  error: null,
  response: '',
  isBusy: false
}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETPRODUCTS_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: ''

      };
      //return state.update('isBusy', () => true);
    case GETPRODUCTS_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload


      };


      case GETPRODUCTS_FAILURE:
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
