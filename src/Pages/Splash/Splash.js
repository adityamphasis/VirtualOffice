import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, StatusBar, Keyboard, Platform, NativeModules, BackHandler } from 'react-native';
import React, { PropTypes } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { getConfiguration, setConfiguration } from '../../utils/configuration';
import { authorize, refresh, revoke, prefetchConfiguration } from 'react-native-app-auth';
import { Page, Button, ButtonContainer, Form, FormLabel, FormValue, Heading } from '../../../components';
import axios from 'react-native-axios';
import { Loader } from '../../../components';
import { encryptData, decryptData } from '../../utils/AES';

const config = {
  issuer: 'https://accounts.bharti-axalife.com',
  //clientId: 'Bj4ppdGozkaf4fOTeYameOExlfIa',
  clientId: '7Io_iFf5oiq3P2KjUqXbStKmKpYa',
  redirectUrl: 'com.bhartiaxa.virtualoffice://oauth',
  scopes: ['openid'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.bharti-axalife.com/oauth2/authorize',
    tokenEndpoint: 'https://accounts.bharti-axalife.com/oauth2/token',
    // revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'Bj
  }
};

export default class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }


  componentDidMount() {
    this.getData();
  }


  getData = async () => {

    try {
      const result = await authorize(config);

      console.log("accessToken", result.accessToken)

      setConfiguration('token', result.accessToken);

      this.JWTCheckAgentCode(result.accessToken);

    // this.props.navigation.navigate('SideMenu', { accessToken:result.accessToken })

    }
    catch (error) {
      console.log(error);
    }
  };


  JWTCheckAgentCode = async (token) => {

    this.setState({ isLoading: true });

    console.log('JWTTokenValidation');

    let url = "https://online.bharti-axalife.com/MiscServices/JWTAgentRESTService/Service1.svc/CheckAgentCodeJWT"

    let params = {
      'DecodeJWT': token,
      'PartnerKey': 'JWT12SER02'
    }

    const encryptedParams = await encryptData(JSON.stringify(params));

    console.log('encryptedParams', encryptedParams);

    let encParams = {
      "request": encryptedParams//"wZ41JrpUFxYN657xEboMROidcqi+SuudbDsP9Co2zeTjD6u1YHmdD5IYFReAL4vHAmty0BZVSxyiprqQbcNjZhS0ybG6D1HCTz7tU1CpN/ownifuNlThzFDgG9EHnXcUt5V4F76t4qcoBI6jkyKb37zgt5zRMWg51nECtBXVoYgYV35mYYCPNz8UK+JIjQRdB5trVjZblvfCj1ru4++DxGzr7KF3BY6KVnTAhuObg45O4fjdDQFsAtnG86IG9fMC9MEc+v8bNy1M3al+QmBfmRvYaavleXjbzJNpAS+bVLF0wZgD8SnaqfUFXwJxlgvoy7D7DpscCWonWZMQdKvZO66I/XQXt1fa5rHhfKy38qzki/g8o/GraaRRKjnq6xXxth5KKhG3ZM32PbMEvbYGvhPCSK0ZUb16Y60pdA98eK8qmpSlgm93XvisN/TDojkWRBq9MJKlczwOGocsWY8ih5VPKirjXGUaEEje8GmLKRmQ49OJtQYJUHuujDlblxSMHhHylyaiYUaI4wuhVQPGrqTrbw/2w9wRH/w3SQlcErsXNUOvcMWgPYiQwoQBl7kuhbTdhoEfFY95FNh1n7QQOtViCUIzhorCHKdNLTzbjuNYeiPWFtWl4G17tBz6EwxA"
    };

    axios.post(url, encParams, {
      "headers": {
        "content-type": "application/json",
      },
    }).then(response => {

      console.log("jwt response => ", JSON.stringify(response.data));
      this.parseTokenApiData(response.data, token);

    }).catch(error => {
      console.log("cvzgvxbhvb", error);
    });

  }

  parseTokenApiData = async (data, accessToken) => {

    const result = await decryptData(data.response);
    this.setState({ isLoading: false });

    console.log('jwt result => ', result);

    var sales = result.IsSalesAgent;
    var etoken = result.EncodedJWT;
    var agentToken = result.AgentCode;
    var employeeCode = result.EmployeeCode

    console.log("gafsvfhvb", sales);

    setConfiguration('salesflag', sales)
    setConfiguration('encryptedToken', etoken)
    setConfiguration('Agent', agentToken)
    setConfiguration('Employee', employeeCode)

    if (Platform.OS == 'android') {
      NativeModules.HelloWorldModule.ShowMessage(
        etoken,
        'false',
        5000,
      );
    } else if (Platform.OS == 'ios') {
      NativeModules.HelloWorld.ShowMessage('Awesome!its working!', 0.5);
    }


    this.props.navigation.navigate('SideMenu', { accessToken: accessToken })

  }


  render() {

    return (
      <Page>
         <Loader visible={this.state.isLoading}/>
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
    top: 20
    //   fontFamily: "CharlieDisplay-Regular"
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
