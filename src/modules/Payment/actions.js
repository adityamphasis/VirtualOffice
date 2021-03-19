// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import {  postAPI } from '../../utils/api';



export const paymentAPI = async (bookingId: string, paymentSourceRefNo: string, type: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: PAYMENT_REQUEST
  });

  try {

   var details = {
     'bookingId': bookingId,
     'paymentSourceRefNo': paymentSourceRefNo,
     'type': type
   };

  const user = await postAPI('/api/v1/user/payment', JSON.stringify(details));



     return dispatch({
       type: PAYMENT_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: PAYMENT_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
