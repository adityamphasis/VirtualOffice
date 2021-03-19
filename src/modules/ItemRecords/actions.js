// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  ITEMRECORDS_REQUEST,
  ITEMRECORDS_SUCCESS,
  ITEMRECORDS_FAILURE
} from './types';
// import { get } from '../../utils/api';
// import { getConfiguration } from '../../utils/configuration';
// import { postAPI } from '../../utils/api';



export const ItemRecordsApi = async (data) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: ITEMRECORDS_REQUEST
  });

  try {

    //  var details = {
    //    'fireBaseToken': 'none',
    //    'location': getConfiguration('Location')


    //  };

    // const user = await postAPI('/api/v1/user/everything', JSON.stringify(details));


    // var path = '/api/v1/user/everything';
    // const user = await get(path);



    return dispatch({
      type: ITEMRECORDS_SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: ITEMRECORDS_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};