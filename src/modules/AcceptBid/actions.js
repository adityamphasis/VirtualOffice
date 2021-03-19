// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  ACCEPT_BID_REQUEST,
  ACCEPT_BID_SUCCESS,
  ACCEPT_BID_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const acceptBidAPI = async (loadId: string, carrierId: string,bidAmount: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: ACCEPT_BID_REQUEST
  });

  try {
     let details = {
       'loadId': loadId,
       'carrierId': carrierId,
       'bidAmount': bidAmount
     };



    console.log("params",details);

      const user = await postAPI('/api/v1/user/acceptbid', JSON.stringify(details));

     return dispatch({
       type: ACCEPT_BID_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: ACCEPT_BID_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
