// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETSERVICES_REQUEST,
  GETSERVICES_SUCCESS,
  GETSERVICES_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const getServiceAPI = async () => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETSERVICES_REQUEST
  });

  try {
     const user_id = getConfiguration('user_id');
     var path ='/api/v1/user/serviceslist';
      const user = await get(path);

     return dispatch({
       type: GETSERVICES_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETSERVICES_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
