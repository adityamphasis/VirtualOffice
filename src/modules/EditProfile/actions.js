// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  EDITPROFILE_REQUEST,
  EDITPROFILE_SUCCESS,
  EDITPROFILE_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';

export const EditProfileAPI = async (name: string, email: string,address: string,city:string, treatment:string,rate:string, usertype:string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: EDITPROFILE_REQUEST
  });

  try {
     var details = {
       'name': name,
       'email': email,
       'address': address,
       'city':city,
       'treatment':treatment,
       'hourlyPrice':rate,
       'userType':usertype

     };

   console.log("finalparam",details)

      const user = await postAPI('/api/v1/user/updateprofile', JSON.stringify(details));

     return dispatch({
       type: EDITPROFILE_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: EDITPROFILE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
