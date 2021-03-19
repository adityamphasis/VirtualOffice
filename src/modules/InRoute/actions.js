// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  IN_ROUTE_REQUEST,
  IN_ROUTE_SUCCESS,
  IN_ROUTE_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const inRouteAPI = async (loadId: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: IN_ROUTE_REQUEST
  });

  try {
     let details = {
       'loadId': loadId
     };



    console.log("params",details);

      const user = await postAPI('/api/v1/user/inroute', JSON.stringify(details));

     return dispatch({
       type: IN_ROUTE_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: IN_ROUTE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
