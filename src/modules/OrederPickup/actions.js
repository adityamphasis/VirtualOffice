// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  PICKUP_ORDER_REQUEST,
  PICKUP_ORDER_SUCCESS,
  PICKUP_ORDER_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const pickupOrderAPI = async (loadId: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: PICKUP_ORDER_REQUEST
  });

  try {
     let details = {
       'loadId': loadId
     };



    console.log("params",details);

      const user = await postAPI('/api/v1/user/loadpickup', JSON.stringify(details));

     return dispatch({
       type: PICKUP_ORDER_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: PICKUP_ORDER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
