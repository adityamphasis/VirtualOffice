// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  CANCEL_LOAD_REQUEST,
  CANCEL_LOAD_SUCCESS,
  CANCEL_LOAD_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const cancelLoadAPI = async (loadId: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: CANCEL_LOAD_REQUEST
  });

  try {
     let details = {
       'bookingId': loadId,
     };
      const user = await postAPI('/api/v1/trip/user/cancelrecurring', JSON.stringify(details));

     return dispatch({
       type: CANCEL_LOAD_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: CANCEL_LOAD_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
