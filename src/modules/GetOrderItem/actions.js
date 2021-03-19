// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETORDERITEM_REQUEST,
  GETORDERITEM_SUCCESS,
  GETORDERITEM_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import {  postAPI } from '../../utils/api';



export const getOrderItemAPI = async (oredrid: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETORDERITEM_REQUEST
  });

  try {

       var path ='/api/v1/item/currentOrderItems/'+oredrid;

      const user = await get(path);

     return dispatch({
       type: GETORDERITEM_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETORDERITEM_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
