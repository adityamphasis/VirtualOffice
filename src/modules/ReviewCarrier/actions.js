// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
//import serviceComponent from '../../containers/Password';
import {
  RATING_CARRIER_REQUEST,
  RATING_CARRIER_SUCCESS,
  RATING_CARRIER_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const ratingCarrierAPI = async (tripId: string, driverRating: int) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: RATING_CARRIER_REQUEST
  });

  try {
     let details = {

       'carrierRating': driverRating,
       'loadId': tripId,
       'carrierReview':"Chaman"
     };
      const user = await postAPI('/api/v1/user/feedbackbycustomer', JSON.stringify(details));

     return dispatch({
       type: RATING_CARRIER_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: RATING_CARRIER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
