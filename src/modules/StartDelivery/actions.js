// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  START_ORDER_REQUEST,
  START_ORDER_SUCCESS,
  START_ORDER_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const startOrderAPI = async (loadId: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: START_ORDER_REQUEST
  });

  try {
     let details = {
       'loadId': loadId
     };



    console.log("params",details);

      const user = await postAPI('/api/v1/user/startloaddelivered', JSON.stringify(details));

     return dispatch({
       type: START_ORDER_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: START_ORDER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
