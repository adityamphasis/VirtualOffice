import {
    StyleSheet, Text, View, TouchableOpacity,
    ImageBackground, Image, StatusBar, Keyboard,
    Platform, SafeAreaView, Linking, NativeModules, FlatList, BackHandler, Alert
  } from 'react-native';
  import React, { PropTypes } from 'react'
  import AppLink from 'react-native-app-link';
  import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
  import Clipboard from '@react-native-community/clipboard';
  import axios from 'react-native-axios';
  import { DrawerActions } from 'react-navigation-drawer';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
  
  import { getConfiguration, setConfiguration, unsetConfiguration } from '../../utils/configuration';
  import { clearStorage, getStorage } from '../../utils/authentication';
  
  import {
    Page, Button, ButtonOutline, ButtonContainer,
    Form, FormLabel, FormValue, Heading
  } from '../../../components';
  
  import { Loader } from '../../../components';
  import { encryptData, decryptData } from '../../utils/AES';
  
  
  export default class Support extends React.Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: false,
        clickOnApp: false,
        isShownCmgSoon: true,
        checkinstallstatus: true,
        AgentName: getConfiguration('AgentName', ''),
        AgentMobile: getConfiguration('MobileNumber', ''),
        //isSupportClicked:getConfiguration('isSupport')
      };
  
    }
  
  
    componentDidMount() {
      setConfiguration('isSupport',false)
     // this.validateTokenApi();
     // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  
    componentWillUnmount() {
      // this.focusListener.remove();
     // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
  
    componentDidUpdate()
    {
      console.log("zhfbfxvjcvbn");
    }
  
    validateTokenApi = async () => {
  
      console.log("validateTokenApi");
  
      this.setState({ isLoading: true });
  
      let url = "https://online.bharti-axalife.com/MiscServices/JWTAgentRESTServiceNew/Service1.svc/ValidateJWT"
  
      let params = {
        'DecodeJWT': getConfiguration('encryptedToken'),
        'PartnerKey': 'JWT12SER02'
      }
  
      const encryptedParam = await encryptData(JSON.stringify(params));
  
      console.log('validate ecrypted data: ', encryptedParam);
  
      let encParams = {
        "request": encryptedParam
      };
  
      axios.post(url, encParams, {
        "headers": {
          "content-type": "application/json",
        }
      }).then(response => {
  
        console.log("validate response => ", JSON.stringify(response.data));
  
        this.parseData(response.data);
  
      }).catch(error => {
        console.log("validate error", JSON.stringify(error));
      });
  
    }
  
    parseData = async (data) => {
  
      const result = await decryptData(data.response);
  
      this.setState({ isLoading: false });
      console.log('validate result => ', result);
  
      if (!result.IsValidToken) {
  
        Alert.alert(
          'Expired!',
          'Your session has been expired. Please login again.',
          [
            { text: 'Login Again', onPress: () => this.onSessionExpired() },
          ]
        );
  
        return;
  
      }
  
      const isDialogShown = await getStorage('isDialogShown');
      console.log('isDialogShown', isDialogShown);
  
      if (!isDialogShown) {
        this.props.navigation.navigate('AppVersionDialog');
      }
  
      this.setState({ isLoading: false });
  
    }
  
    onSessionExpired = async () => {
  
      unsetConfiguration('token');
      unsetConfiguration('salesflag');
      unsetConfiguration('encryptedToken');
      unsetConfiguration('Agent');
      unsetConfiguration('Employee');
      unsetConfiguration('AgentName');
      unsetConfiguration('MobileNumber');
  
      await clearStorage();
  
      if (Platform.OS == 'android')
        NativeModules.HelloWorldModule.ShowMessage('', 'false', 5000);
      else if (Platform.OS == 'ios')
        NativeModules.HelloWorld.ShowMessage('Awesome!its working!', 0.5);
  
      this.props.navigation.navigate('SplashScreen');
  
  
    }
  
    handleBackButton = () => {
  
      try {
        const drawerState = getConfiguration('drawerState');
        console.log('drawerState:', drawerState);
        if (drawerState && drawerState === 'open') {
          this.props.navigation.closeDrawer();
          return true;
        }
      } catch (error) {
  
      }
  
      if (this.props.navigation.isFocused()) {
        Alert.alert(
          'Exit!',
          'Are you sure you want to exit the app?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ]
        );
        return true;
      } else {
        return false;
      }
  
    }
  
    openDrawerClick = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }
  
    appInstall() {
      AppLink.openInStore({ appName: "M-Sell", appStoreId: '529379082', appStoreLocale: 'us', playStoreId: 'id=com.enparadigm.bharthiaxa' }).then((datares) => {
        // do stuff
        console.log("ghfbbbnbbn", datares);
        alert("app installed")
  
      }).catch((err) => {
        // handle error
        alert(err)
      });
    }
  
    clickApp = () => {
      this.setState({
        clickOnApp: true
      })
    }
  
    gotomlife = () => {
      //this.logout()
      this.props.navigation.navigate('MLife')
    }
  
    gotomcustomer = () => {
      console.log("salesflag", getConfiguration('salesflag'));
      if (getConfiguration('salesflag')) {
        this.props.navigation.navigate('MCustomer', { encToken: this.state.encryptedToken, screen: 'customer' })
      } else {
        alert('Available only for Agents')
      }
    }
  
    copyToClipboard = () => {
  
      console.log("copy to clipboard", getConfiguration('encryptedToken', ''));
  
      Clipboard.setString(getConfiguration('encryptedToken', ''))
    }
  
    closePopup = async () => {
        this.props.navigation.goBack();
      }
    gotoVymo = () => {
  
      IntentLauncher.startAppByPackageName('com.getvymo.android')
        .then((result) => {
          console.log('startAppByPackageName started');
        }).catch((error) => {
          console.warn('startAppByPackageName: could not open', error);
  
          if (this.versionApiData) {
            const index = this.versionApiData.findIndex(x => x.PackageName === 'com.getvymo.android');
            console.log('index', index);
            if (index != -1) {
              Linking.openURL(this.versionApiData[index].AppDownloadLink);
              return;
            }
          }
  
          Linking.openURL('https://play.google.com/store/apps/details?id=com.getvymo.android');
  
        });
  
    }
  
    gotoMSell = () => {
  
      IntentLauncher.startAppByPackageName('com.enparadigm.bharthiaxa')
        .then((result) => {
          console.log('startAppByPackageName started');
        })
        .catch((error) => {
          console.warn('startAppByPackageName: could not open', error);
  
          if (this.versionApiData) {
            const index = this.versionApiData.findIndex(x => x.PackageName === 'com.enparadigm.bharthiaxa');
            console.log('index', index);
            if (index != -1) {
              Linking.openURL(this.versionApiData[index].AppDownloadLink);
              return;
            }
          }
  
          Linking.openURL('https://play.google.com/store/apps/details?id=com.enparadigm.bharthiaxa');
  
        });
    }
  
 
  
    installApp = () => {
      // https://play.google.com/store/apps/details?id=com.enparadigm.bharthiaxa&hl=en&gl=US
      Linking.openURL("market://details?id=com.enparadigm.bharthiaxa&hl=en&gl=US");
    }
  
    showAlert = () => {
      alert('Coming Soon')
    }
  
  
  
   
   
   
  
    render = () => {
      return (
  
        <SafeAreaView style={styles.background}>
  
          <ImageBackground style={styles.overlayView} source={require('../../../assets/bg.png')}>
            <View style={styles.popupcontainer}>
  
              <TouchableOpacity
                style={styles.crossContainer}
                onPress={() => this.closePopup()}>
                <Image resizeMode="contain" style={styles.crossButton}
                  source={require('../../../assets/close.png')} />
              </TouchableOpacity>
              <View style={styles.appcontainer}>
                <View style={styles.appcontainer1}>
                 <TouchableOpacity style={styles.buttonContainer}>
                    <Image resizeMode="contain" style={styles.appIcon}
                      source={require('../../../assets/eml_icon.png')} />
                      <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>Email ID</Text>
                    <Text style={styles.appName}>support@bhartiaxa.com</Text>
                    </View>
                    </TouchableOpacity>
                  </View>
                  
            
               
              
                  <View
                    style={styles.appcontainer1}
                    >
                    <TouchableOpacity style={styles.buttonContainer}>
                    <Image resizeMode="contain" style={styles.appIcon}
                      source={require('../../../assets/phn_icon.png')} />
                     <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>Phone</Text>
                    <Text style={styles.appName}>9999341059</Text>
                    </View>
                    </TouchableOpacity>
                  </View>
                 
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
  
      );
    }
  
  }
  
  
  const styles = StyleSheet.create({
    imgcontainer: {
      backgroundColor: 'transparent',
      width: wp('100%'),
      flex: 0.1,
      marginTop: 10,
      alignItems: 'center',
      flexDirection: 'row'
    },
    prfltitleContainer:
    {
      width: '100%',
      height: 60,
      top: 10,
      marginLeft: '2%',
    },
    headerTitle: {
      color: 'rgb(30,77,155)',
      fontSize: 15,
      fontFamily: 'WorkSans-Regular'
    },
    headerTitle1: {
      width: 'auto',
      color: 'rgb(30,77,155)',
      fontSize: 15,
      fontFamily: 'WorkSans-Bold'
    },
    cmgsooncontainer: {
      backgroundColor: 'transparent',
      width: wp('90%'),
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    appStatuts: {
      // flex: 1,
      margin: 10,
      color: 'rgb(30,77,155)',
      fontWeight: 'bold',
      fontSize: 16,
      alignSelf: 'center'
    },
    imgprofile: {
      width: 30,
      height: 30,
      marginLeft: 10,
      tintColor: 'red'
  
    },
    background: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    headerView: {
      flexDirection: 'row',
      height: '8%',
      width: '100%',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      shadowOffset: {
        height: 0.5,
        width: 0,
      },
      elevation: 10,
    },
    overlayView: {
      flex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      opacity: 0.95,
      padding: 25,
   
    },
    overlayAppView: {
      flex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      opacity: 0.95,
      padding: 25
    },
  
    appStatusContainer: {
      flex: 1,
      backgroundColor: 'white',
      elevation: 3,
      borderRadius: 15,
      // borderColor: 'grey',
      padding: 10,
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      shadowOffset: {
        height: 0.5,
        width: 0,
      },
      elevation: 10,
    },
    welcomContainer:
    {
      width: '30%',
      height: '100%',
  
      marginLeft: '30%',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    overlayView1: {
      // top: wp('60%'),
      top: '35%',
      left: 0,
      right: 0,
      bottom: 0,
      flex: 0.7,
      position: 'absolute',
      backgroundColor: 'rgb(234,240,248)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.8
    },
    overlayView2: {
      //flex: 0.8,
      top: '30%',
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      backgroundColor: 'rgb(234,240,248)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.9
  
  
    },
    rupeeContainer: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      height: '50%',
      width: '50%',
      alignItems: 'center',
      justifyContent: 'space-between'
  
    },
    txttab: {
      fontSize: wp('4.8%'),
      fontWeight: 'bold',
      color: 'rgb(30,77,155)'
    },
    tabViewBG: {
      flexDirection: 'row',
      marginHorizontal: 0,
      backgroundColor: 'white',
      height: wp('10.66%'),
      width: '100%',
      marginTop: '5%',
    },
    tab1BG: {
      backgroundColor: 'white',
      height: '100%',
      width: '25%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    tab2BG: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: '100%',
      width: '25%'
    },
    tab3BG: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: '100%',
      width: '25%'
    },
    tab4BG: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: '100%',
      width: '25%'
    },
    stngLogo: {
      width: 30,
      height: 30,
    },
    rghtLogo: {
      width: 30,
      height: '90%',
  
      marginStart: 5,
      backgroundColor: 'transparent',
    },
    leftLogo: {
      width: 50,
      height: '90%',
      marginStart: 5,
      backgroundColor: 'transparent',
    },
    cmngsnIcon:
    {
      width: 200,
      height: 200,
      backgroundColor: 'transparent',
    },
    appIcon:
    {
      width: 30,
      height: 30,
     // marginTop:15,
     marginLeft:'20%',
      backgroundColor: 'transparent',
    },
    cmgsoonIcon:
    {
      width: 150,
      height: 150,
      backgroundColor: 'transparent',
      alignSelf: 'center'
    },
    backTouchable: {
      width: 60,
      height: '100%',
      //backgroundColor:'red',
      top: 0,
      marginEnd: 5,
      justifyContent: 'center',
      alignItems: 'center',
      // flexDirection:'row'
  
    },
  
  
  
    crossContainer: {
      width: '95%',
      height: 50,
      top: 5,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    crossButton: {
      width: 25,
      height: 25,
      top: 10,
      backgroundColor: 'transparent',
  
    },
  
    appName1: {
        color: 'rgb(30,77,155)',
        fontSize: 15,
        top: 5,
        fontFamily: 'WorkSans-Regular'
      },
    appName: {
      color: 'rgb(30,77,155)',
      fontWeight: 'bold',
      fontSize: 15,
      top: 5,
      fontFamily: 'WorkSans-Bold'
    },
    appBackground1: {
      width: wp('70%'),
      height: wp('15%'),
      top: 0,
      backgroundColor: 'transparent',
      marginStart: 10,
      marginEnd: 10,
    },
  
    appBackground: {
      width: wp('25%'),
      height: wp('25%'),
      top: 0,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginStart: 10,
      marginEnd: 10,
      borderRadius: 10,
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      shadowOffset: {
      },
      elevation: 10
    },
    quickLinksText: {
      color: 'rgb(30,77,155)',
      fontFamily: 'WorkSans-Semibold',
      textAlign: 'center',
      fontSize: 15,
    },
    appdppescription: {
      color: 'rgb(30,77,155)',
      fontSize: 16,
      textAlign: 'center',
      top: 5,
  
    },
    container: {
      backgroundColor: 'transparent',
      width: wp('96%'),
      flex: 0.2,
      marginTop: 15,
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginHorizontal: '2%'
    },
    cmgcontainer: {
      backgroundColor: 'white',
      width: wp('95%'),
      flex: 0.5,
      marginTop: 10,
      flexDirection: 'column',
      marginStart: 10,
      marginEnd: 10,
      borderRadius: 10,
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      shadowOffset: {
        height: 0.5,
        width: 0,
      },
    },
    popupcontainer: {
      backgroundColor: 'white',
      width: wp('90%'),
      flex: 0.4,
      borderRadius: 10,
      shadowColor: "lightgray",
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowOffset: {
        height: 0.5,
        width: 0,
      },
      elevation: 15
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        width: wp('90%'),
       // flex: 0.9,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row'
      },
    appcontainer: {
      backgroundColor: 'white',
      width: wp('90%'),
      flex: 0.9,
      marginTop: 10,
      flexDirection: 'column'
    },
    appcontainer1: {
      backgroundColor: 'transparent',
      width: wp('90%'),
      justifyContent: 'flex-start',
      alignItems:'flex-start',
      flexDirection: 'row',
    },
  
  
  });
  