// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETUPCOMING_REQUEST,
  GETUPCOMING_SUCCESS,
  GETUPCOMING_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const getUpcomingTripsAPI = async () => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETUPCOMING_REQUEST
  });

  try {
     const user_id = getConfiguration('user_id');
     var path ='/api/v1/trip/user/upcoming/1';
      const user = await get(path);

     return dispatch({
       type: GETUPCOMING_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETUPCOMING_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
