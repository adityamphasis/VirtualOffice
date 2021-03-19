// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  LOGIN_WITH_PASSWORD_REQUEST,
  LOGIN_WITH_PASSWORD_SUCCESS,
  LOGIN_WITH_PASSWORD_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const checkPasswordAPI = async (mobileNumber: string, password: string, fireBaseToken: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: LOGIN_WITH_PASSWORD_REQUEST
  });

  try {
     let details = {
       'mobileNumber': mobileNumber,
       'password': password,
       'firebaseToken': '11232'
     };
      const user = await postAPI('/api/v1/user/password', JSON.stringify(details));

     return dispatch({
       type: LOGIN_WITH_PASSWORD_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: LOGIN_WITH_PASSWORD_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
