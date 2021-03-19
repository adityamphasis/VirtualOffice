// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  ADD_BID_REQUEST,
  ADD_BID_SUCCESS,
  ADD_BID_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const addBidAPI = async (loadId: string, bidAmount: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: ADD_BID_REQUEST
  });

  try {
     let details = {
       'loadId': loadId,
       'bidAmount': bidAmount
     };
      const user = await postAPI('/api/v1/user/addbid', JSON.stringify(details));

     return dispatch({
       type: ADD_BID_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: ADD_BID_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
