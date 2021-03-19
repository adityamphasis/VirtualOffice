// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  CALCULATECOST_REQUEST,
  CALCULATECOST_SUCCESS,
  CALCULATECOST_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';

export const calculateCostAPI = async (distance: string, estimatedTime: string,startLocation: string,endLocation:string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: CALCULATECOST_REQUEST
  });

  try {
     var details = {
       'distance': distance,
       'estimatedTime': estimatedTime,
       'startLocation': startLocation,
       'endLocation':endLocation

     };

   console.log("finalparam",details)

      const user = await postAPI('/api/v1/trip/estimatedcost', JSON.stringify(details));

     return dispatch({
       type: CALCULATECOST_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: CALCULATECOST_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
