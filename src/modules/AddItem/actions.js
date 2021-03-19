// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  ADDITEM_REQUEST,
  ADDITEM_REQUEST_SUCCESS,
  ADDITEM_REQUEST_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';

export const AddItemAPI = async (name: string, type: string,itemQuantity: string,weight:string,order_id:string, item_id:string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: ADDITEM_REQUEST
  });

  try {
     var details = {
       'name': name,
       'itemType': type,
       'totalItems': itemQuantity,
       'itemWeight':weight,
       'orderId':order_id,
       'itemId':item_id
     };

       console.log("finalparam",details)

      const user = await postAPI('/api/v1/item/add', JSON.stringify(details));

     return dispatch({
       type: ADDITEM_REQUEST_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: ADDITEM_REQUEST_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
