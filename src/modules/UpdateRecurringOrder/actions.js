// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  UPDATE_RECURRING_REQUEST,
  UPDATE_RECURRING_SUCCESS,
  UPDATE_RECURRING_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const updateRecurringOrderAPI = async (loadId: string,address:string,location,recurringDyas) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: UPDATE_RECURRING_REQUEST
  });

  try {
     let details = {
       'bookingId': loadId,
       'locationAddr':address,
       'location':location,
       'recurringDays':recurringDyas
     };


console.log("data for update api",details);

      const user = await postAPI('/api/v1/trip/user/updaterecurring', JSON.stringify(details));

     return dispatch({
       type: UPDATE_RECURRING_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: UPDATE_RECURRING_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
