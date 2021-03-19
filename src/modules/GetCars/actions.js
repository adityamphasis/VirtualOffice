// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  GETCARS_REQUEST,
  GETCARS_SUCCESS,
  GETCARS_FAILURE
} from './types';
import {  get } from '../../utils/api';


export const getCarsAPI = async () => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETCARS_REQUEST
  });

  try {

      var user;
    user = await get('/api/v1/admin/getcountries');


     return dispatch({
       type: GETCARS_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETCARS_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
