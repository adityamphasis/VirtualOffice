// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';

import {
  DECLINE_REQUEST,
  DECLINE_SUCCESS,
  DECLINE_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';



export const declineRequestAPI = async (bookingId: string) => async (
  dispatch: ReduxDispatch

) => {
  dispatch({
    type: DECLINE_REQUEST
  });

  try {
     var details = {
       'bookingId': bookingId

     };




      const user = await postAPI('/api/v1/user/cancelbooking', JSON.stringify(details));

     return dispatch({
       type: DECLINE_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: DECLINE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
