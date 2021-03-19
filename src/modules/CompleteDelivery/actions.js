// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  COMPLETE_DELIVERY_REQUEST,
  COMPLETE_DELIVERY_SUCCESS,
  COMPLETE_DELIVERY_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const completeDeliveryAPI = async (loadId: string, code: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: COMPLETE_DELIVERY_REQUEST
  });

  try {
     let details = {
       'loadId': loadId,
       'verificationCode': code
     };



    console.log("params",details);

      const user = await postAPI('/api/v1/user/loaddelivered', JSON.stringify(details));

     return dispatch({
       type: COMPLETE_DELIVERY_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: COMPLETE_DELIVERY_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
