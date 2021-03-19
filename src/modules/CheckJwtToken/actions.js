// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  JWT_TOKEN_REQUEST,
  JWT_TOKEN_SUCCESS,
  JWT_TOKEN_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const checkToken = async (DecodeJWT: string, PartnerKey: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: JWT_TOKEN_REQUEST
  });

  try {
     let details = {
       'DecodeJWT': DecodeJWT,
       'PartnerKey': 'JWT12SER02'
     };


      const user = await postAPI('JWTCheckAgentCodeService/Service1.svc', JSON.stringify(details));

     return dispatch({
       type: JWT_TOKEN_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: JWT_TOKEN_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
