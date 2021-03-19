// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  PAYNOW_REQUEST,
  PAYNOW_SUCCESS,
  PAYNOW_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const paynowAPI = async (loadId) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: PAYNOW_REQUEST
  });

  try {
      let details = {
        'loadId': loadId
      };
       const user = await postAPI('/api/v1/user/paymentload', JSON.stringify(details));

     return dispatch({
       type: PAYNOW_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: PAYNOW_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
