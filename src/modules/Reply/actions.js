// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  REPLY_REQUEST,
  REPLY_SUCCESS,
  REPLY_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import {  postAPI } from '../../utils/api';



export const replyAPI = async (disputeId: string, message: string, type: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: REPLY_REQUEST
  });

  try {

   var details = {
     'disputeId': disputeId,
     'message': message,
     'type': type
   };

  const user = await postAPI('/api/v1/user/dispute/reply', JSON.stringify(details));



     return dispatch({
       type: REPLY_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: REPLY_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
