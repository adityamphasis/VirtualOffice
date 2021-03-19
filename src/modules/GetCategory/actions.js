// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETCATEGORY_REQUEST,
  GETCATEGORY_SUCCESS,
  GETCATEGORY_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const getCategoryAPI = async () => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETCATEGORY_REQUEST
  });

  try {
     const user_id = getConfiguration('user_id');
     var path ='/api/v1/user/categorylist';
      const user = await get(path);

     return dispatch({
       type: GETCATEGORY_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETCATEGORY_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
