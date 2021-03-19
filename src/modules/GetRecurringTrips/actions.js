// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETRECURRING_REQUEST,
  GETRECURRING_SUCCESS,
  GETRECURRING_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const getRecurringTripsAPI = async () => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETRECURRING_REQUEST
  });

  try {
     const user_id = getConfiguration('user_id');
     var path ='/api/v1/trip/user/upcomingrecurring/1';
      const user = await get(path);

     return dispatch({
       type: GETRECURRING_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETRECURRING_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
