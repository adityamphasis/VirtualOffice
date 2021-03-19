// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
//import serviceComponent from '../../containers/Password';
import {
  RATING_REQUEST,
  RATING_SUCCESS,
  RATING_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const ratingAPI = async (tripId: string, driverRating: int) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: RATING_REQUEST
  });

  try {
     let details = {

       'driverRating': driverRating,
       'tripId': tripId,

     };
      const user = await postAPI('/api/v1/trip/feedbackcustomer', JSON.stringify(details));

     return dispatch({
       type: RATING_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: RATING_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
