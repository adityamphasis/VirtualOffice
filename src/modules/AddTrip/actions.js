// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  ADD_TRIP_REQUEST,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const addTripAPI = async (trip_type, distance, estimatedTime, estimatedCost, carTypeRequired, paymentMethod, paymentSourceRefNo, startLocationAddr, startLocation, endLocationAddr, endLocation, scheduleTimezone, scheduleDate, scheduleTime,orderId,name,phone,info) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: ADD_TRIP_REQUEST
  });

  try {
     let details = {
       'trip_type': trip_type,
       'distance': distance,
       'estimatedTime': estimatedTime,
       'estimatedCost': estimatedCost,
       'carTypeRequired': carTypeRequired,
       'paymentMethod': paymentMethod,
       'paymentSourceRefNo': paymentSourceRefNo,
       'startLocationAddr': startLocationAddr,
       'startLocation': startLocation,
       'endLocationAddr': endLocationAddr,
       'endLocation': endLocation,
       'scheduleTimezone': scheduleTimezone,
       'scheduleDate': scheduleDate,
       'scheduleTime': scheduleTime,
       'orderId':orderId,
       'receiptName':name,
       'receiptNumber':phone,
       'additionalInfo':info,
       'receiptCountyCode':'+91'
     };


      const user = await postAPI('/api/v1/trip/addtrip', JSON.stringify(details));

     return dispatch({
       type: ADD_TRIP_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: ADD_TRIP_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
