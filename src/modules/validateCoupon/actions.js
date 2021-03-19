// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
//import serviceComponent from '../../container/Password';
import {
  validateCoupon_FAILURE,
  validateCoupon_REQUEST,
  validateCoupon_SUCCESS
} from './types';
import {  postAPI } from '../../utils/api';


export const validateCouponAPI = async (coupon: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: validateCoupon_REQUEST
  });

  try {
     let details = {
       'promocode': coupon,

     };
      const user = await postAPI('/api/v1/promo/validatepromocode', JSON.stringify(details));

     return dispatch({
       type: validateCoupon_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: validateCoupon_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
