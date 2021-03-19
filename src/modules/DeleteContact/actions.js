// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  DELETECONTACT_REQUEST,
  DELETECONTACT_SUCCESS,
  DELETECONTACT_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import {  postAPI } from '../../utils/api';



export const deleteContactAPI = async (contactId: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: DELETECONTACT_REQUEST
  });

  try {
    var url = '/api/v1/user/removecontact/'+contactId;
  const user = await get(url);

     return dispatch({
       type: DELETECONTACT_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: DELETECONTACT_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
