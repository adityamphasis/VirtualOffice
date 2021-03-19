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


export const addOverSeaTripAPI = async (pickupDate1:string, pickuptime1:string, pickuptime2:string, deliverydate1:string, deliverytime1:string, deliverytime2:string,timeZone1:string, booking_type1:string,isRecurring1:string,recurringDays1:string,locationAddr1:string,location1:string,houseNo1:string,landmark1:string,paymentMethod1:string,paymentSourceRefNo1:string,products1:string,totalPrice1:string,serviceTax1:string,deliverFee1:string,promoCode1:string,serviceId1:string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: ADD_TRIP_REQUEST
  });

  try {
     let details = {



       'pickupDate': pickupDate1,
       'pickupTimeSlotOne': pickuptime1,
       'pickupTimeSlotTwo': pickuptime2,
       'deliverDate': deliverydate1,
       'deliverTimeSlotOne': deliverytime1,
       'deliverTimeSlotTwo': deliverytime2,
       'timezone':timeZone1,
       'booking_type': booking_type1,
       'isRecurring':isRecurring1,
       'recurringDays':recurringDays1,
       'locationAddr':locationAddr1,
       'location':location1,
       'houseNo':houseNo1,
       'landmark':landmark1,
       'paymentMethod':paymentMethod1,
       'paymentSourceRefNo':paymentSourceRefNo1,
       'products':products1,
       'totalPrice':totalPrice1,
       'serviceTax':serviceTax1,
       'deliverFee':deliverFee1,
       'promoCode':promoCode1,
       'serviceId':serviceId1,
     };

   console.log("Params",details);

      const user = await postAPI('/api/v1/user/addload', JSON.stringify(details));

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
