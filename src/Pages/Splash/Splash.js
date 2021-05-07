import React, { PropTypes } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image,
  StatusBar, Keyboard, Platform, NativeModules, BackHandler, Alert, Linking
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import axios from 'react-native-axios';
import DeviceInfo from 'react-native-device-info';
import { checkVersion } from "react-native-check-version";
import FingerprintScanner from 'react-native-fingerprint-scanner';
import JailMonkey from 'jail-monkey'
import RNGoogleSafetyNet from 'react-native-google-safetynet';
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from '@react-native-firebase/analytics';
import { fetch } from 'react-native-ssl-pinning';

import { clearAll, getConfiguration, setConfiguration, unsetConfiguration } from '../../utils/configuration';
import { getStorage, setStorage, clearStorage } from '../../utils/authentication';
import { apiConfig, CERTS_SHA } from '../../utils/apiConfig';

import { authorize } from 'react-native-app-auth';
import { Page } from '../../../components';

import { Loader } from '../../../components';
import { encryptData, decryptData, rasData } from '../../utils/AES';

const API_KEY = 'AIzaSyA2X9535aZI2NG3AgVevcfr4qYmVbOJuFM';

const config = {
  issuer: apiConfig.SSO_BASE,
  clientId: apiConfig.SSO_CLIENT_ID,
  redirectUrl: 'com.bhartiaxa.virtualoffice://oauth',
  scopes: ['openid'],
  additionalParameters: {
    prompt: 'login',
    display: 'popup'
  },
  serviceConfiguration: {
    authorizationEndpoint: apiConfig.SSO_BASE + '/oauth2/authorize',
    tokenEndpoint: apiConfig.SSO_BASE + '/oauth2/token',
    // revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
  }
};

export default class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      versionCode: ''
    }

  }


  componentDidMount = async () => {

    await analytics().logScreenView({ screen_name: 'SplashScreen', screen_class: 'SplashScreen' });

    const currentVersion = DeviceInfo.getVersion();
    this.setState({ versionCode: currentVersion });

    try {

      const verData = await checkVersion();

      console.log('version:' + JSON.stringify(verData) + ' currentVersion:' + currentVersion);

      if (verData.version && this.isUpdateNeeded(currentVersion, verData.version)) {

        Alert.alert(
          'Update!',
          'New mandatory version is available on store, please update to proceed.',
          [
            {
              text: 'UPDATE',
              onPress: () => { Linking.openURL(verData.url); },
            }
          ]
        );

        return;
      }

    } catch (error) {
      console.log('error', JSON.stringify(error));
    }

    // if (JailMonkey.isJailBroken()) {
    //   console.log('JailMonkey: ', JailMonkey.isJailBroken());
    //   this.showAlertForSplash('You can not use this app on rooted device as per security policy.');
    //   return;
    // }

    // const isPlayService = await RNGoogleSafetyNet.isPlayServicesAvailable();
    // console.log('isPlayService', isPlayService);

    // if (!isPlayService) {
    //   this.showAlertForSplash('Google play services is not availble.');
    //   return;
    // }

    // const nonce = await RNGoogleSafetyNet.generateNonce(16);
    // console.log('nounce', JSON.stringify(nonce));

    // const safetyResponse = await RNGoogleSafetyNet.sendAttestationRequest(nonce, API_KEY);
    // console.log('safetyReespone', JSON.stringify(safetyResponse));

    // if (!safetyResponse.ctsProfileMatch) {
    //   this.showAlertForSplash('OS or Application installed on your device are violating Android playstore safetynet policies.');
    //   return;
    // }

    const bioEnable = await getStorage('isBioEnabled');
    if (bioEnable)
      setConfiguration('isBioEnabled', bioEnable);
    else
      unsetConfiguration('isBioEnabled');

    const savedToken = await getStorage('token');

    if (savedToken && savedToken != '') {

      setConfiguration('token', savedToken);
      setConfiguration('idToken', await getStorage('idToken'));
      setConfiguration('refreshToken', await getStorage('refreshToken'));
      setConfiguration('encryptedToken', await getStorage('encryptedToken'));

      setConfiguration('salesflag', await getStorage('salesflag') === 'true' ? true : false);

      setConfiguration('Agent', await decryptData(await getStorage('Agent'), 8));
      setConfiguration('Employee', await decryptData(await getStorage('Employee'), 8));
      setConfiguration('AgentName', await getStorage('AgentName'));
      setConfiguration('MobileNumber', await decryptData(await getStorage('MobileNumber'), 8));

    }

    this.checkForBioAndProceed();

  }

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  isUpdateNeeded = (currentVersion, playVersion) => {

    const playArray = playVersion.split('.');
    const curVerArray = currentVersion.split('.');

    return parseInt(curVerArray[0]) < parseInt(playArray[0]);

  }

  showAlertForSplash = async (msg) => {

    Alert.alert(
      'Alert!',
      msg,
      [
        { text: 'Ok', onPress: () => BackHandler.exitApp() },
      ]
    );

  }

  checkForBioAndProceed = () => {

    try {
      const isBioEnabled = getConfiguration('isBioEnabled');
      if (isBioEnabled && isBioEnabled === 'enable') {
        this.onBioAuthenticate();
        return;
      }
    } catch (error) {

    }

    this.getData();

  }

  onBioAuthenticate = () => {

    FingerprintScanner
      .authenticate({ title: 'Log in with Biometrics' })
      .then(async () => {
        await analytics().logEvent('Action', { biometric: 'Yes' });
        await setStorage('isBioEnabled', 'enable');
        setConfiguration('isBioEnabled', 'enable');
        this.getData();
      }).catch(async (error) => {
        await analytics().logEvent('Action', { biometric: 'No' });
        try {
          const isBioEnabled = getConfiguration('isBioEnabled');
          if (isBioEnabled && isBioEnabled === 'enable') {
            BackHandler.exitApp();
            return;
          }
        } catch (error) {

        }
        this.getData();
      });

  }

  getData = async () => {

    try {
      const accessToken = getConfiguration('token');
      console.log('already logged in:', accessToken);
      if (accessToken && accessToken != '') {
        this.props.navigation.navigate('MainScreen');
        return
      }
    } catch (error) {

    }

    try {
      const result = await authorize(config);

      console.log('token result=>', JSON.stringify(result));
      await setStorage('idToken', result.idToken);
      await setStorage('refreshToken', result.refreshToken);

      setConfiguration('idToken', result.idToken);
      setConfiguration('refreshToken', result.refreshToken);

      this.JWTCheckAgentCode(result.accessToken);


    }
    catch (error) {
      console.log(error);
      BackHandler.exitApp();
    }

  };

  JWTCheckAgentCode = async (token) => {

    this.setState({ isLoading: true });

    console.log('splash jwt token');

    let params = {
      'DecodeJWT': token,
      'PartnerKey': 'JWT12SER02'
    }

    const URL = apiConfig.TOKEN_CODE;
    console.log('URL:' + URL);

    const encryptedParams = await encryptData(JSON.stringify(params));

    console.log('encryptedParams', encryptedParams);

    let encParams = {
      "request": encryptedParams//"wZ41JrpUFxYN657xEboMROidcqi+SuudbDsP9Co2zeTjD6u1YHmdD5IYFReAL4vHAmty0BZVSxyiprqQbcNjZhS0ybG6D1HCTz7tU1CpN/ownifuNlThzFDgG9EHnXcUt5V4F76t4qcoBI6jkyKb37zgt5zRMWg51nECtBXVoYgYV35mYYCPNz8UK+JIjQRdB5trVjZblvfCj1ru4++DxGzr7KF3BY6KVnTAhuObg45O4fjdDQFsAtnG86IG9fMC9MEc+v8bNy1M3al+QmBfmRvYaavleXjbzJNpAS+bVLF0wZgD8SnaqfUFXwJxlgvoy7D7DpscCWonWZMQdKvZO66I/XQXt1fa5rHhfKy38qzki/g8o/GraaRRKjnq6xXxth5KKhG3ZM32PbMEvbYGvhPCSK0ZUb16Y60pdA98eK8qmpSlgm93XvisN/TDojkWRBq9MJKlczwOGocsWY8ih5VPKirjXGUaEEje8GmLKRmQ49OJtQYJUHuujDlblxSMHhHylyaiYUaI4wuhVQPGrqTrbw/2w9wRH/w3SQlcErsXNUOvcMWgPYiQwoQBl7kuhbTdhoEfFY95FNh1n7QQOtViCUIzhorCHKdNLTzbjuNYeiPWFtWl4G17tBz6EwxA"
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
      console.log('ssl pinning success', JSON.stringify(result));
      this.parseTokenApiData(result, token);
    }).catch(async error => {
      console.log('error pinning: ', JSON.stringify(error));
      await clearStorage();
      this.setState({ isLoading: false });
      alert('Something went wrong. Please try again after some time.');
    });

    // axios.post(URL, encParams, {
    //   "headers": {
    //     "content-type": "application/json",
    //   },
    // }).then(response => {

    //   console.log("jwt response => ", JSON.stringify(response.data));
    //   this.parseTokenApiData(response.data, token);

    // }).catch(async error => {
    //   console.log("jwt error", error);
    //   await clearStorage();
    //   this.setState({ isLoading: false });
    //   alert('Something went wrong. Please try again after some time.');
    // });

  }

  parseTokenApiData = async (data, accessToken) => {

    const result = await decryptData(data.response);
    this.setState({ isLoading: false });

    console.log('jwt result => ', result);


    var sales = result.IsSalesAgent;
    var etoken = result.EncodedJWT;
    var agentToken = result.AgentCode ? result.AgentCode : '';
    var employeeCode = result.EmployeeCode ? result.EmployeeCode : '';
    var agentName = result.AgentName ? result.AgentName : '';
    var mobileNumber = result.Mobile ? result.Mobile : '';

    await analytics().logLogin({ method: 'M-Smart' });

    await analytics().setUserProperties({
      'account_name': agentName + '',
      'employeeCode': employeeCode + '',
      'AgentCode': agentToken + '',
      'sales': sales + ''
    });

    await setStorage('encryptedToken', etoken + '');
    await setStorage('salesflag', sales + '');
    await setStorage('Agent', await encryptData(agentToken + '', 8));
    await setStorage('Employee', await encryptData(employeeCode + '', 8));
    await setStorage('AgentName', agentName + '');
    await setStorage('MobileNumber', await encryptData(mobileNumber + '', 8));

    await setStorage('token', accessToken);
    setConfiguration('token', accessToken);

    setConfiguration('salesflag', sales);
    setConfiguration('encryptedToken', etoken);
    setConfiguration('Agent', agentToken);
    setConfiguration('Employee', employeeCode);
    setConfiguration('AgentName', agentName);
    setConfiguration('MobileNumber', mobileNumber);

    if (Platform.OS == 'android') {
      NativeModules.HelloWorldModule.ShowMessage(
        etoken,
        sales + '',
        5000,
      );
    } else if (Platform.OS == 'ios') {
      NativeModules.HelloWorld.ShowMessage('Awesome!its working!', 0.5);
    }

    try {
      const isBioEnabled = getConfiguration('isBioEnabled');
      if (isBioEnabled && isBioEnabled === 'enable') {
        this.props.navigation.navigate('MainScreen');
        return;
      }
    } catch (error) {

    }

    this.askForSettingBio();

  }

  askForSettingBio = () => {

    FingerprintScanner
      .isSensorAvailable()
      .then(biometryType => {
        console.log('Available');

        crashlytics().log("Request boimetric");

        Alert.alert(
          'Biometric Setup!',
          'Do you want to setup biometric for authentication?',
          [
            {
              text: 'YES',
              onPress: () => {
                crashlytics().log("accepted boimetric");
                this.onBioAuthenticate();
              },
              // style: 'cancel',
            },
            {
              text: 'NO', onPress: async () => {
                crashlytics().log("Denied boimetric");
                setConfiguration('isBioEnabled', 'disable');
                await setStorage('isBioEnabled', 'disable');
                this.props.navigation.navigate('MainScreen');
              }
            },
          ]
        );
      }).catch(error => this.props.navigation.navigate('MainScreen'));

  }

  render() {

    return (
      <Page>
        <Loader visible={this.state.isLoading} />
        <View style={{
          backgroundColor: 'transparent',
          width: wp('100%'),
          height: hp('15%'),
          marginTop: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image resizeMode="stretch" style={{ top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', backgroundColor: 'transparent' }}
            source={require('../../../assets/spalsh_logo.png')}
          />
          <Text style={styles.welocmeText}> Welcome to </Text>
        </View>

        <ImageBackground resizeMode="contain" source={require('../../../assets/splash_img3.png')} style={{
          backgroundColor: 'transparent',
          width: wp('100%'),
          height: hp('85%'),
          marginTop: 40,
        }}>
          <Image resizeMode="center" style={{ alignSelf: 'center', width: '40%', height: '40%', backgroundColor: 'transparent' }}
            source={require('../../../assets/splash_img2.png')}
          />
        </ImageBackground>

        <Text style={[{ position: 'absolute', bottom: 10, alignSelf: 'center', fontFamily: 'WorkSans-Medium' }]}>Version: {this.state.versionCode}</Text>

      </Page>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  searchTextInput: {
    height: wp('10.33%'),

    paddingHorizontal: 5,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    width: '100%',
    borderRadius: 0,
    fontSize: wp('4%'),

  },
  tileIcon: {
    width: wp('8%'),
    height: wp('10.33%'),
    marginLeft: 10
  },

  tile: {
    backgroundColor: 'white',
    width: 'auto',
    height: wp('16%'),
    marginTop: wp('8%'),
    marginHorizontal: wp('5.33%'),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#818e97'
  },
  touchableForgotPassword: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    height: 30
  },
  welocmeText: {
    color: 'black',
    fontSize: 25,
    top: 20,
    fontFamily: "WorkSans-Bold"
  },
  forgotTile: {
    backgroundColor: 'transparent',
    width: 'auto',
    height: 40,
    marginTop: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderColor: '#818e97'
  },
  arrowTile: {
    backgroundColor: 'transparent',
    height: wp('15%'),
    marginTop: wp('7.5%'),
    marginHorizontal: wp('5.33%'),
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'blue'
  },
  socialBtnContainer: {
    backgroundColor: 'transparent',
    width: 'auto',
    height: 50,
    marginTop: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  lowerView: {
    backgroundColor: 'white',
    width: wp('100%'),
    height: 'auto',
    justifyContent: 'center',
    marginTop: 0
  },
  headingBG: {
    marginTop: wp('4.8%'),
    width: '90%',
    height: 'auto',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '5%'
  },
  arrowIcon: {
    width: wp('10%'),
    height: wp('10%')
  },
  touchableArrow: {
    backgroundColor: '#00B8FB',
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: wp('15%'),
    width: wp('90%'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpTile: {
    position: 'absolute',
    height: wp('10.46%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    left: 0,
    bottom: wp('10.33%'),
    flexDirection: 'row'
  }
});
