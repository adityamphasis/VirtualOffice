
//import { createStore, combineReducers, applyMiddleware } from 'redux';
//import TokenReducer from '../modules/CheckJwtToken';
//  import RegisterReducer from '../modules/Register';
//  import AuthSocialReducer from '../modules/AuthSocial';
//  import AuthPasswordReducer from '../modules/AuthPassword';
//  import ForgotPasswordReducer from '../modules/ForgotPassword';
//  import ChangePasswordReducer from '../modules/ChangePassword';
//  import GetProfileReducer from '../modules/GetProfile';
//  import EditProfileReducer from '../modules/EditProfile';
//  import ResendReducer from '../modules/Resend';
//  import ChangeProfilePasswordReducer from '../modules/ChangeProfilePassword';
//  import GetEverythingReducer from '../modules/GetEverything';
//  import NearMeReducer from '../modules/NearMe';
//  import BookingReducer from '../modules/AddBooking';
//  import PaymentReducer from '../modules/Payment';
//  import DeclineReducer from '../modules/DeclineRequest';
//  import AddContactReducer from '../modules/AddContact';
//  import DeleteContactReducer from '../modules/DeleteContact';
//  import RatingReducer from '../modules/Rating';
//  import ReplyReducer from '../modules/Reply';
//  import SupportReducer from '../modules/HelpSupport';
// import AcceptRequestReducer from '../modules/AcceptRequest';
// import AddItemReducer from "../modules/AddItem";
// import GetOrderItemReducer from "../modules/GetOrderItem";
// import CalculateCostReducer from "../modules/CalculateCost";
// import AddTripReducer from "../modules/AddTrip";
// import validateCouponReducer from "../modules/validateCoupon";
// import GetCarsReducer from '../modules/GetCars';
// import AddOverseasTripReducer from "../modules/AddOverseasTrip";
// import GetLoadDetailsReducer from "../modules/GetLoadDetails";
// import AddBidReducer from "../modules/AddBid";
// import AcceptBidReducer from "../modules/AcceptBid";
// import OrderPickupReducer from "../modules/OrederPickup";
// import StartDeliveryReducer from "../modules/StartDelivery";
// import InRouteReducer from "../modules/InRoute";
// import CompleteDeliveryReducer from "../modules/CompleteDelivery";
// import ReviewCarrierReducer from "../modules/ReviewCarrier";
// import GetServicesReducer from "../modules/GetServices";
// import GetProductsReducer from "../modules/GetProducts";
// import GetCategoryReducer from "../modules/GetCategory";
// import AddPOSReducer from '../modules/AddPOS';
// import DeletePOSReducer from '../modules/DeletePOS';
// import ItemRecordsReducer from '../modules/ItemRecords';
// import GetUpcomingTripsReducer from '../modules/GetUpcomingTrips';
// import GetPastTripsReducer from '../modules/GetPastTrips';
// import CancelLoadReducer from '../modules/CancelLoad';
// import GetOffersReducer from '../modules/GetOffers';
// import GetRecurringReducer from '../modules/GetRecurringTrips';
// import UpdateRecurringOrderReducer from '../modules/UpdateRecurringOrder';






import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import * as reduxLoop from 'redux-loop-symbol-ponyfill';
import middleware from './middleware';
import reducer from './reducer';


const enhancers = [
  applyMiddleware(...middleware),
  reduxLoop.install()
];



const rootReducer = combineReducers({
 // TokenReducer,
//   RegisterReducer,
//    AuthSocialReducer,
//    AuthPasswordReducer,
//    ForgotPasswordReducer,
//    ChangePasswordReducer,
//    GetProfileReducer,
//    EditProfileReducer,
//    ResendReducer,
//    ChangeProfilePasswordReducer,
//    GetEverythingReducer,
//    NearMeReducer,
//    AddPOSReducer,
//    BookingReducer,
//    PaymentReducer,
//    DeclineReducer,

//    AddContactReducer,
//    DeleteContactReducer,
//    RatingReducer,
//    ReplyReducer,
//    SupportReducer,
//    AcceptRequestReducer,
//    AddItemReducer,

//    GetOrderItemReducer,
//    CalculateCostReducer,
//    AddTripReducer,
//    DeletePOSReducer,
//    validateCouponReducer,
//    GetCarsReducer,

//    AddOverseasTripReducer,
//    GetLoadDetailsReducer,
//    AddBidReducer,
//    AcceptBidReducer,
//    OrderPickupReducer,
//    StartDeliveryReducer,
//    InRouteReducer,
// GetRecurringReducer,
//    CompleteDeliveryReducer,
//    ReviewCarrierReducer,
//    GetServicesReducer,
//    GetProductsReducer,
//    GetCategoryReducer,
//    ItemRecordsReducer,
//    GetUpcomingTripsReducer,
//    GetPastTripsReducer,
//    CancelLoadReducer,
//    GetOffersReducer,
//    UpdateRecurringOrderReducer


  // GetLoadDetailsReducer,
  // AddLoadsReducer,
  // AcceptBidReducer,
  // PayNowReducer,
  // RatingReducer,


})


const store = createStore(rootReducer,
                          applyMiddleware(...middleware));


console.log(store.getState());
// /* Enable redux dev tools only in development.
//  * We suggest using the standalone React Native Debugger extension:
//  * https://github.com/jhen0409/react-native-debugger
//  */
// /* eslint-disable no-undef */
const composeEnhancers = (
	__DEV__ &&
	typeof (window) !== 'undefined' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	) || compose;
// /* eslint-enable no-undef */
//
const enhancer = composeEnhancers(...enhancers);

export default store;
