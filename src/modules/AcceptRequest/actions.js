// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';

import {
  ACCEPT_REQUEST,
  ACCEPT_SUCCESS,
  ACCEPT_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';



export const acceptRequestAPI = async (bookingId: string, customerId: string) => async (
  dispatch: ReduxDispatch

) => {
  dispatch({
    type: ACCEPT_REQUEST
  });

  try {
     var details = {
       'bookingId': bookingId,
       'customerId': customerId
     };




      const user = await postAPI('/api/v1/artist/acceptrequest', JSON.stringify(details));

     return dispatch({
       type: ACCEPT_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: ACCEPT_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
