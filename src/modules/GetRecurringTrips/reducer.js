// @flow
import {
  GETRECURRING_REQUEST,
  GETRECURRING_SUCCESS,
  GETRECURRING_FAILURE
} from './types';
import type State from './types';


const INITIAL_STATE = [{
  error: null,
  response: '',
  isBusy: false,
  name: '',
  mobileNumber: '',
  profileImage: '',
  email: '',
  commodity: ''
}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETRECURRING_REQUEST:
    return {
        ...state,
        isBusy: true

      };
      //return state.update('isBusy', () => true);
    case GETRECURRING_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload,
        name: action.payload.data.name,
        mobileNumber:  action.payload.data.countryCode+" " + action.payload.data.mobileNumber,
        profileImage: action.payload.data.profileImage,
        email: action.payload.data.email,
        commodity: action.payload.data.commodity,
        address: action.payload.data.address

      };


      case GETRECURRING_FAILURE:
      return {
          ...state,
          isBusy: false,
          response: null,
           name: '',
           mobileNumber: '',
           profileImage: '',
           email: '',
           commodity: '',
           address: ''
        };
    default:
      return state;
  }
};

export default reducer;
