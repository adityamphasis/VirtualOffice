// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  ADDCONTACT_REQUEST,
  ADDCONTACT_SUCCESS,
  ADDCONTACT_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import {  postAPI } from '../../utils/api';



export const addContactAPI = async (contactNumber: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: ADDCONTACT_REQUEST
  });

  try {

   var details = {
     'contactNumber': contactNumber


   };

  const user = await postAPI('/api/v1/user/addcontact', JSON.stringify(details));



     return dispatch({
       type: ADDCONTACT_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: ADDCONTACT_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
