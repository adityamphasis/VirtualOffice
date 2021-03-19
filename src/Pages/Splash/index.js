import Splash from "./Splash";
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkToken } from '../../modules/CheckJwtToken';


 const mapStateToProps = state => ({
   isBusy: state.TokenReducer.isBusy,
   response: state.TokenReducer,



 });



 export default connect(
   mapStateToProps,
   dispatch => {
     return {
        checkToken: bindActionCreators(checkToken, dispatch),
       navigate: bindActionCreators(NavigationActions.navigate, dispatch)
     };
   }
 )(Splash);

//export default Splash;
