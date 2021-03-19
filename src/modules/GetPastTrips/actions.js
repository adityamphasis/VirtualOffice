// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETPAST_REQUEST,
  GETPAST_SUCCESS,
  GETPAST_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const getPastTripsAPI = async () => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETPAST_REQUEST
  });

  try {
     const user_id = getConfiguration('user_id');
     var path ='/api/v1/trip/user/past/1';
      const user = await get(path);

     return dispatch({
       type: GETPAST_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETPAST_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
