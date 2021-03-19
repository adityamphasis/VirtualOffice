// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  ADDLOAD_REQUEST,
  ADDLOAD_SUCCESS,
  ADDLOAD_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const addLoadAPI = async (item: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: ADDLOAD_REQUEST
  });

  try {
     let details = item
      const user = await postAPI('/api/v1/user/addload', JSON.stringify(details));

     return dispatch({
       type: ADDLOAD_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: ADDLOAD_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
