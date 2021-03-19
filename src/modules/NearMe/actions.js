// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  NEARME_REQUEST,
  NEARME_SUCCESS,
  NEARME_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import {  postAPI } from '../../utils/api';



export const nearmeAPI = async (current_loc: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: NEARME_REQUEST
  });

  try {

   var details = {
     'location': current_loc
   };

  const user = await postAPI('/api/v1/customer/veterinary/nearby', JSON.stringify(details));



     return dispatch({
       type: NEARME_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: NEARME_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
