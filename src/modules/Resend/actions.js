// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  RESEND_REQUEST,
  RESEND_SUCCESS,
  RESEND_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const resendAPI = async (mobileNumber: string, countryCode: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: RESEND_REQUEST
  });

  try {
     let details = {
       'mobileNumber': mobileNumber,
       'countryCode': countryCode
     };


      const user = await postAPI('/api/v1/user/resendotp', JSON.stringify(details));

     return dispatch({
       type: RESEND_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: RESEND_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
