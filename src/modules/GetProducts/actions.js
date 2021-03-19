
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  GETPRODUCTS_REQUEST,
  GETPRODUCTS_SUCCESS,
  GETPRODUCTS_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const getProductsAPI = async (mobileNumber: string, categoryId: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETPRODUCTS_REQUEST
  });

  try {
     let details = {
       'serviceId': mobileNumber,
       'categoryId': categoryId
     };


      const user = await postAPI('/api/v1/user/productlist', JSON.stringify(details));

     return dispatch({
       type: GETPRODUCTS_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETPRODUCTS_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
