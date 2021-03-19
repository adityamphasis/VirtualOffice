// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETPROFILE_REQUEST,
  GETPROFILE_SUCCESS,
  GETPROFILE_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const getProfileAPI = async () => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETPROFILE_REQUEST
  });

  try {
     const user_id = getConfiguration('user_id');
     var path ='/api/v1/user/profile';
      const user = await get(path);

     return dispatch({
       type: GETPROFILE_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETPROFILE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
