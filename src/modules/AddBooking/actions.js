// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import {  postAPI } from '../../utils/api';



export const addbookingAPI = async (pDate, ptime1, ptime2, dedate, dtime1, dtime2,tZone1, booking_type1,isRecurring1,recurringDays1,locationAddr1,location1,houseNo1,landmark1,paymentMethod1,paymentSourceRefNo1,products1,totalPrice1,serviceTax1,deliverFee1,promoCode1,serviceId1,discount) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: BOOKING_REQUEST
  });

  try {

   var details = {
     'pickupDate': pDate,
     'pickupTimeSlotOne': ptime1,
     'pickupTimeSlotTwo': ptime2,
     'deliverDate': dedate,
     'deliverTimeSlotOne': dtime1,
     'deliverTimeSlotTwo': dtime2,
     'timezone':tZone1,
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
     'convenienceCharge':serviceTax1,
     'sameDayDeliverCharge':deliverFee1,
     'promoCode':promoCode1,
     'serviceId':serviceId1,
     'recurringDiscountPrice':discount
   };


   console.log("params data",details);

  const user = await postAPI('/api/v1/trip/addbook', JSON.stringify(details));



     return dispatch({
       type: BOOKING_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: BOOKING_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
