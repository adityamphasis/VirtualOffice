// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETOFFER_REQUEST,
  GETOFFER_SUCCESS,
  GETOFFER_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const getOffersAPI = async () => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETOFFER_REQUEST
  });

  try {
     const user_id = getConfiguration('user_id');
     var path ='/api/v1/promo/visibleList';
      const user = await get(path);

     return dispatch({
       type: GETOFFER_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETOFFER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
