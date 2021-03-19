// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const registerAPI = async (name: string,mobileNumber: string,email: string,  password: string,address: string, otp:string,countryCode:string,gid: string, fbid: string,appleid:string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: REGISTER_REQUEST
  });

  try {
     // let details = {
     //   "name":name,
     //   "city": city,
     //   	"address": address,
     // 	"email":email,
	   //   "mobileNumber":mobileNumber,
    	// "password": password,
     // 	"OTP":otp
     // };


       let details = {
      "name":name,
	    "mobileNumber":mobileNumber,
      "email":email,
    	"password": password,
      "address": address,
    	"OTP":otp,
      'countryCode': countryCode,
      'appleid':appleid,
      "gid": gid,
      "fbid": fbid,

     };






    console.log('cgdfhfdgfg',details);

      const user = await postAPI('/api/v1/user/register', JSON.stringify(details));

     return dispatch({
       type: REGISTER_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
