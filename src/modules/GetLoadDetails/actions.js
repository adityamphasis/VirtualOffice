// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETLOADDETAILS_REQUEST,
  GETLOADDETAILS_SUCCESS,
  GETLOADDETAILS_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const getLoadDetailAPI = async (loadId) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETLOADDETAILS_REQUEST
  });

  try {
     var path ='/api/v1/trip/bookingdetails/'+loadId;
      const user = await get(path);

     return dispatch({
       type: GETLOADDETAILS_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETLOADDETAILS_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
