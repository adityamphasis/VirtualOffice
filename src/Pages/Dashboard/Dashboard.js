import React, { PropTypes } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  ImageBackground, Image, StatusBar, Keyboard,
  Platform, SafeAreaView, Linking, NativeModules, FlatList, BackHandler, Alert
} from 'react-native';
import AppLink from 'react-native-app-link';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import Clipboard from '@react-native-community/clipboard';
import analytics from '@react-native-firebase/analytics';

import axios from 'react-native-axios';
import { fetch } from 'react-native-ssl-pinning';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  Page, Button, ButtonOutline, ButtonContainer,
  Form, FormLabel, FormValue, Heading
} from '../../../components';

import { Loader } from '../../../components';

import { apiConfig, UAT, CERTS_SHA } from '../../utils/apiConfig';
import { getConfiguration, unsetConfiguration } from '../../utils/configuration';
import { clearStorage, getStorage } from '../../utils/authentication';

import { encryptData, decryptData } from '../../utils/AES';


export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      clickOnApp: false,
      isShownCmgSoon: true,
      checkinstallstatus: true,
      AgentName: getConfiguration('AgentName', ''),
      AgentMobile: getConfiguration('MobileNumber', ''),
    };

  }


  componentDidMount = async () => {
    await analytics().logScreenView({ screen_name: 'DashboardScreen', screen_class: 'DashboardScreen' });
    this.validateTokenApi();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    // this.focusListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  validateTokenApi = async () => {

    this.setState({ isLoading: true });

    let params = {
      'DecodeJWT': getConfiguration('encryptedToken'),
      'PartnerKey': 'JWT12SER02'
    }

    const URL = apiConfig.VALIDATE_JWT;
    console.log('URL:' + URL);

    const encryptedParam = await encryptData(JSON.stringify(params));

    console.log('validate ecrypted data: ', encryptedParam);

    let encParams = {
      "request": encryptedParam
    };

    fetch(URL, {
      method: "POST",
      timeoutInterval: 100000,
      body: JSON.stringify(encParams),
      pkPinning: true,
      disableAllSecurity: true,
      sslPinning: {
        certs: CERTS_SHA
      },
      headers: {
        Accept: "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "e_platform": "mobile",
        // "content-type": "application/json"
      }
    }).then((response) => response.json()).then(result => {
      console.log('dashboard ssl pinning success', JSON.stringify(result));
      this.parseData(result);
    }).catch(async error => {
      console.log('dashboard error pinning: ', JSON.stringify(error));
      this.setState({ isLoading: false });
      alert('Something went wrong. Please try again after some time.');
    });


    // axios.post(URL, encParams, {
    //   "headers": {
    //     "content-type": "application/json",
    //   }
    // }).then(response => {

    //   console.log("validate response => ", JSON.stringify(response.data));
    //   this.parseData(response.data);

    // }).catch(error => {
    //   console.log("validate error", JSON.stringify(error));
    //   this.setState({ isLoading: false });
    //   alert('Something went wrong. Please try again after some time.');
    // });

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

    const isDownloaded = await getStorage('isDownloaded');
    console.log('isDownloaded', isDownloaded);
    this.setState({ isLoading: false });

    if (!isDownloaded) {
      this.props.navigation.navigate('AppVersionDialog');
    }

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

    try {
      const appState = getConfiguration('appVersion');
      console.log('appState', appState)
      if (appState)
        return true;
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
          {
            text: 'OK', onPress: async () => {
              await analytics().logEvent('Action', { click: 'ExitApp' });
              BackHandler.exitApp();
            }
          },
        ]
      );
      return true;
    } else {
      return false;
    }

  }

  openDrawerClick = async () => {
    // this.props.navigation.dispatch(DrawerActions.openDrawer());
    // await analytics().logEvent('Action', { click: 'DrawerOpen' });
    this.props.navigation.openDrawer();

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

  gotomlife = async () => {
    //this.logout()
    await analytics().logEvent('MLife', { click: 'MLife' });
    this.props.navigation.navigate('MLife')
  }

  gotomcustomer = async () => {
    console.log("salesflag", getConfiguration('salesflag'));
    if (getConfiguration('salesflag')) {
      await analytics().logEvent('MCustomre', { click: 'MCustomre' });
      this.props.navigation.navigate('MCustomer', { encToken: this.state.encryptedToken, screen: 'customer' })
    } else {
      alert('Application is not applicable to login user.');
    }
  }

  copyToClipboard = () => {

    console.log("copy to clipboard", getConfiguration('encryptedToken', ''));
    // if (UAT)
      Clipboard.setString(getConfiguration('encryptedToken', ''));
  }

  closePopUp = () => {
    this.setState({
      clickOnApp: false,
      checkinstallstatus: true
    });
  }

  gotoVymo = async () => {

    await analytics().logEvent('vymo', { click: 'vymo' });

    if (!getConfiguration('salesflag')) {
      alert('Application is not applicable to login user.');
      return;
    }

    const clientId = 'baxa';
    const accessToken = getConfiguration('encryptedToken');

    const url = 'vymo://auth_session?client_id=' + clientId + '&auth_token=' + accessToken;
    // const url = 'maps://app?saddr=Cupertino&San+Francisco';

    Linking.openURL(url)
      .catch(error => {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.getvymo.android');
      });


    // IntentLauncher.startAppByPackageName('com.getvymo.android')
    //   .then((result) => {
    //     console.log('startAppByPackageName started');
    //   }).catch((error) => {
    //     console.warn('startAppByPackageName: could not open', error);
    //     Linking.openURL('https://play.google.com/store/apps/details?id=com.getvymo.android');
    //   });

  }

  gotoMSell = async () => {

    await analytics().logEvent('MSell', { click: 'MSell' });

    IntentLauncher.startAppByPackageName('com.enparadigm.bharthiaxa')
      .then((result) => {
        console.log('startAppByPackageName started');
      })
      .catch((error) => {
        console.warn('startAppByPackageName: could not open', error);
        Linking.openURL('https://play.google.com/store/apps/details?id=com.enparadigm.bharthiaxa');
      });

  }

  closePopUp = () => {
    this.setState({
      clickOnApp: false,
      checkinstallstatus: true
    });
  }

  installApp = () => {
    // https://play.google.com/store/apps/details?id=com.enparadigm.bharthiaxa&hl=en&gl=US
    Linking.openURL("market://details?id=com.enparadigm.bharthiaxa&hl=en&gl=US");
  }

  showAlert = () => {
    alert('Coming Soon');
  }

  rederHeader = () => {

    return (
      <View style={[styles.headerView]}>
        <TouchableOpacity
          style={styles.backTouchable}
          onPress={() => this.copyToClipboard()}>
          <Image resizeMode="contain" style={styles.leftLogo}
            source={require('../../../assets/logo_rht.png')} />
        </TouchableOpacity>
        {UAT && <Text style={[styles.headerTitle1, { alignSelf: 'center', fontSize: 12 }]}> UAT (27 May 17:00) </Text>}
        <View style={[styles.welcomContainer, { marginLeft: UAT ? '5%' : '30%' }]}>
          <Text style={styles.headerTitle}> Welcome to</Text>
          <Text style={styles.headerTitle1}>M-Smart</Text>
        </View>
        <TouchableOpacity
          style={styles.backTouchable}
          onPress={() => this.openDrawerClick()}>
          <Image resizeMode="contain" style={styles.rghtLogo}
            source={require('../../../assets/menu.jpeg')} />
        </TouchableOpacity>
      </View>
    )

  }

  renderItem = ({ item }) => {

    return (
      <ImageBackground style={{
        // backgroundColor:'red',
        borderColor: '#a4a4a4',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
      }}
        source={require('../../../assets/grad.png')}>

        <View style={{ flex: 2.5, alignItems: 'center' }}>
          <Image style={[{ height: 40, width: 40, margin: 10 }]}
            resizeMode='contain'
            source={item.icon} />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(30,77,155)', textAlign: 'center' }}>{item.appName}</Text>
        </View>
        <View style={{ width: 1, backgroundColor: 'grey', height: '90%' }} />
        <View style={{ flex: 4, alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
          {!item.isInstalled && <ButtonOutline onPress={() => this.onInstallUpdatePress(item)} textColor='rgb(30,77,155)' borderColor='green' title='Install' />}
          {item.isInstalled && !item.isLatest && <ButtonOutline onPress={() => this.onInstallUpdatePress(item)} textColor='rgb(30,77,155)' borderColor='yellow' title='Update' />}
          {item.isInstalled && item.isLatest && <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(30,77,155)', textAlign: 'center' }}>{'Installed'}</Text>}
          {item.isInstalled && <Text style={{ fontSize: 12, color: 'rgb(30,77,155)', textAlign: 'center' }}>{'Last Updated on ' + item.lastUpdated}</Text>}
        </View>

      </ImageBackground>
    )

  }

  renderVersionPopup = () => {

    return (
      <View style={[styles.overlayAppView, { alignItems: 'stretch' }]}>

        <View style={styles.appStatusContainer}>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', height: '10%', justifyContent: 'space-between' }}>
            <Text style={styles.appStatuts}>APPS STATUS</Text>
            <TouchableOpacity
              style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => this.closeVersionPopup()}>
              <Image style={{ width: 25, height: 25 }}
                source={require('../../../assets/close.png')} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.appList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />

        </View>

      </View>
    )

  }

  renderPopup = () => {
    if (this.state.clickOnApp) {
      return (

        <View style={styles.overlayView}>
          <View style={styles.popupcontainer}>

            <TouchableOpacity
              style={styles.crossContainer}
              onPress={() => this.closePopUp()}>
              <Image resizeMode="contain" style={styles.crossButton}
                source={require('../../../assets/close.png')} />
            </TouchableOpacity>
            <View style={styles.appcontainer}>
              <View style={styles.appcontainer1}>
                <TouchableOpacity
                  style={styles.appBackground1}
                  onPress={() => this.gotoVymo()}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/vymo.png')} />
                  <Text style={styles.appName}> VYMO </Text>
                </TouchableOpacity>
                <Text style={styles.appdppescription}>Manage</Text>
                <Text style={styles.appdppescription}>Leads</Text>
              </View>
              <View style={styles.appcontainer1}>
                <TouchableOpacity
                  style={styles.appBackground1}
                  onPress={() => this.gotoMSell()}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/m_shell.png')} />
                  <Text style={styles.appName}> M-Sell </Text>
                </TouchableOpacity>
                <Text style={styles.appdppescription}>Engage with</Text>
                <Text style={styles.appdppescription}>Customers</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }

  renderComingSoonPopup = () => {
    if (this.state.isShownCmgSoon) {
      return (

        <View style={styles.overlayView1}>
          <View style={styles.cmgsooncontainer}>
            <Image resizeMode="contain" style={styles.cmgsoonIcon}
              source={require('../../../assets/coming_soon.png')} />
          </View>
        </View>
      )
    }

  }

  render = () => {
    return (

      <SafeAreaView style={styles.background}>
        {this.rederHeader()}

        <View style={styles.imgcontainer}>
          <Image resizeMode="contain" style={styles.imgprofile}
            source={require('../../../assets/arw.png')} />
          <View style={styles.prfltitleContainer}>
            <Text style={styles.headerTitle1}>Hi {this.state.AgentName}</Text>
            <Text style={styles.headerTitle}>What would you like to do now ?</Text>
          </View>
        </View>

        <Loader visible={this.state.isLoading} />

        <View style={styles.container}>

          <TouchableOpacity
            style={styles.appBackground}
            onPress={() => this.clickApp()}>
            <Image resizeMode="contain" style={styles.appIcon}
              source={require('../../../assets/m_shell.png')} />
            <Text style={styles.appName}> M-Sell </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBackground}
            onPress={() => this.gotomcustomer()}>
            <Image resizeMode="contain" style={styles.appIcon}
              source={require('../../../assets/m_customer.png')} />
            <Text style={styles.appName}> M-Customer </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBackground}
            onPress={() => this.gotomlife()}>
            <Image resizeMode="contain" style={styles.appIcon}
              source={require('../../../assets/mlife.png')} />
            <Text style={styles.appName}> M-Life </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.tabViewBG}>
          <TouchableOpacity style={styles.tab1BG} >
            <Text style={styles.txttab}>Today</Text>
          </TouchableOpacity>
          <View style={{ width: 1, height: '75%', backgroundColor: 'rgb(30,77,155)', marginVertical: 5 }}>
          </View>
          <TouchableOpacity style={styles.tab2BG}  >
            <Text style={styles.txttab}>Week</Text>
          </TouchableOpacity>
          <View style={{ width: 1, height: '75%', backgroundColor: 'rgb(30,77,155)', marginVertical: 5 }}>
          </View>
          <TouchableOpacity style={styles.tab3BG}  >
            <Text style={styles.txttab}>Month</Text>
          </TouchableOpacity>
          <View style={{ width: 1, height: '75%', backgroundColor: 'rgb(30,77,155)', marginVertical: 5 }}>
          </View>
          <TouchableOpacity style={styles.tab4BG}  >
            <Image resizeMode="contain" style={styles.stngLogo}
              source={require('../../../assets/stng.png')} />

          </TouchableOpacity>

          <View style={{ height: 3, width: '100%', backgroundColor: '#F5F5F5', position: 'absolute', left: 0, bottom: 0 }}>
            <View style={{ height: 3, width: '50%', backgroundColor: 'transparent', position: 'absolute', left: this.state.underLineLeft, bottom: 0 }}>
              <View style={{ height: '100%', width: '25%', backgroundColor: 'rgb(30,77,155)', marginHorizontal: 25 }}>
              </View>
            </View>

          </View>
        </View>

        <View style={styles.cmgcontainer}>
          <View style={{ width: '100%', flex: 0.3, flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center' }}>
            <TouchableOpacity style={styles.rupeeContainer}  >
              <Image resizeMode="contain" style={styles.stngLogo}
                source={require('../../../assets/rupee.png')} />
              <View>
                <Text style={styles.quickLinksText}> 14250 </Text>
                <Text style={styles.quickLinksText}> Total target </Text>
              </View>
              <Image resizeMode="contain" style={styles.stngLogo}
                source={require('../../../assets/arw.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rupeeContainer}  >
              <Image resizeMode="contain" style={styles.stngLogo}
                source={require('../../../assets/prcnt.png')} />
              <View>
                <Text style={styles.quickLinksText}> 14250 </Text>
                <Text style={styles.quickLinksText}> Total target </Text>
              </View>
              <Image resizeMode="contain" style={styles.stngLogo}
                source={require('../../../assets/arw.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', flex: 0.3, flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center' }}>
            <TouchableOpacity style={styles.rupeeContainer}  >
              <Image resizeMode="contain" style={styles.stngLogo}
                source={require('../../../assets/reniew.png')} />
              <View>
                <Text style={styles.quickLinksText}> 14250 </Text>
                <Text style={styles.quickLinksText}> Total target </Text>
              </View>
              <Image resizeMode="contain" style={styles.stngLogo}
                source={require('../../../assets/arw.png')} />

            </TouchableOpacity>

            <TouchableOpacity style={styles.rupeeContainer}  >
              <Image resizeMode="contain" style={styles.stngLogo}
                source={require('../../../assets/pndng.png')} />
              <View>
                <Text style={styles.quickLinksText}> 14250 </Text>
                <Text style={styles.quickLinksText}> Total target </Text>
              </View>
              <Image resizeMode="contain" style={styles.stngLogo}
                source={require('../../../assets/arw.png')} />

            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', height: 1, backgroundColor: 'rgb(30,77,155)' }}>
          </View>
          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', backgroundColor: 'transparent', flex: 0.4, alignItems: 'center', justifyContent: 'space-between' }} >

            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.quickLinksText}> 05 </Text>
              <Text style={styles.quickLinksText}> Your task </Text>
            </View>
            <View style={{ width: 1, height: '75%', backgroundColor: 'rgb(30,77,155)', marginVertical: 5 }}>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.quickLinksText}> 02 </Text>
              <Text style={styles.quickLinksText}> Send wishes </Text>
            </View>

            <View style={{ width: 1, height: '75%', backgroundColor: 'rgb(30,77,155)', marginVertical: 5 }}>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.quickLinksText}> 02 </Text>
              <Text style={styles.quickLinksText}> Hot leads </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.quicklinkcontainer} >
          <Text style={[styles.txttab, { alignSelf: 'center' }]}>Quick links</Text>
          <View style={{ width: '60%', height: 1, backgroundColor: 'rgb(30,77,155)', marginVertical: 5, alignSelf: 'center', marginLeft: 10 }}>
          </View>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.appBackground}
            onPress={() => this.clickApp()}>
            <Text style={styles.quickLinksText}>Create a Lead</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBackground}
            onPress={() => this.clickApp()}>
            <Text style={styles.quickLinksText}>Onboard Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBackground}
            onPress={() => this.clickApp()}>
            <Text style={styles.quickLinksText}>Track application status</Text>
          </TouchableOpacity>

        </View>

        {this.renderComingSoonPopup()}
        {this.renderPopup()}

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
    padding: 25
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
    // width: '30%',
    height: '100%',
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
    width: 50,
    height: 50,
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

  appName: {
    color: 'rgb(30,77,155)',
    fontWeight: 'bold',
    fontSize: 15,
    top: 5,
    fontFamily: 'WorkSans-Bold'
  },
  appBackground1: {
    width: wp('25%'),
    height: wp('25%'),
    top: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 10,
    marginEnd: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a4a4a4'
    // shadowColor: "#000000",
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // shadowOffset: {
    // },
    // elevation: 10
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
    borderRadius: 10
  },
  appcontainer: {
    backgroundColor: 'white',
    width: wp('90%'),
    flex: 0.9,
    marginTop: 10,
    flexDirection: 'row'
  },
  appcontainer1: {
    backgroundColor: 'white',
    width: wp('90%'),
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },


});
