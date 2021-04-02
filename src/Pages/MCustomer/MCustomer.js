import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Platform,
  processColor,
  window,
  Linking
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { WebView } from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { getConfiguration, setConfiguration } from '../../utils/configuration';
import { Loader } from '../../../components';


export default class MCustomer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: getConfiguration('encryptedToken', ''),
      platform: '',
      isSales: getConfiguration('salesflag', ''),
      comingScreen: this.props.navigation.getParam('screen'),
      isLoading: true
    };

  }

  componentDidMount() {

    if (Platform.OS === 'ios') {
      this.setState({ platform: 'ios' });
    } else {
      this.setState({
        platform: 'android'
      })
    }

  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

        <Loader visible={this.state.isLoading} />

        {/* {this.state.comingScreen == 'service' ?
          <View style={styles.headerView}>
            <TouchableOpacity
              style={styles.backTouchable}
              onPress={() => this.goBack()}>
              <Image resizeMode="contain" style={styles.leftLogo}
                source={require('../../../assets/logo_rht.png')} />
              <Text style={[styles.headerTitle1, { marginLeft: 5, color: 'black' }]}>i-Service</Text>
            </TouchableOpacity>
            <View style={styles.welcomContainer}>
              <Text style={styles.headerTitle}> Welcome to</Text>
              <Text style={styles.headerTitle1}>i-Service</Text>
            </View>
          </View>
          : */}
          {this.state.comingScreen != 'service' && <View style={styles.headerView}>
            <TouchableOpacity
              style={styles.backTouchable}
              onPress={() => this.goBack()}>
              <Image resizeMode="contain" style={styles.leftLogo}
                source={require('../../../assets/logo_rht.png')} />
              <Text style={[styles.headerTitle1, { marginLeft: 5, color: 'black' }]}>M-Customer</Text>
            </TouchableOpacity>
            <View style={styles.welcomContainer}>
              <Text style={styles.headerTitle}> Welcome to</Text>
              <Text style={styles.headerTitle1}>M-Customer</Text>
            </View>
          </View>
        }

        <View style={styles.gridViewBackground}>
          <View style={{ width: '100%', flex: 1, overflow: 'hidden', backgroundColor: 'white' }}>

            {
              this.state.comingScreen == 'customer' ?
                <WebView
                  ref={(ref) => { this.webview = ref; }}
                  originWhitelist={['*']}
                  cacheEnabled={false}
                  incognito={true}
                  cacheMode={'LOAD_NO_CACHE'}
                  // setSupportMultipleWindows={false}
                  // saveFormDataDisabled={true}
                  // allowsBackForwardNavigationGestures={true}
                  // // onShouldStartLoadWithRequest={this.shouldStartLoadWithRequest}
                  // onError={console.error.bind(console, 'error')}
                  // // injectedJavaScript={runFirst}
                  // // onMessage={this.onMessage.bind(this)}
                  // javaScriptEnabled={true}
                  onNavigationStateChange={(event) => {
                    if (event.url.includes('https://uat.bhartiaxa.tk/app?ssoid=')) {
                      this.setState({ isLoading: false });
                      this.webview.stopLoading();
                      this.goBack();
                      Linking.openURL(event.url);
                    }
                  }}
                  source={{
                    html: '<script type="text/javascript"> ' +
                      'window.onload=function(){' +
                      'document.forms["myForm"].submit();' +
                      '}</script>' +
                      '<body>' +
                      '<form id="myForm" method="POST" action="https://id2hs3de2e.execute-api.ap-south-1.amazonaws.com/uat/api/v1/auth/externalLogin">' +
                      '<input type="hidden" name="source" value="' + this.state.platform + '"/>' +
                      '<input type="hidden" name="jwtToken" value="' + this.state.accessToken + '"/>' +
                      '<input type="hidden" type="submit" value="Login"/>' +
                      '</form>' +
                      '</body>'
                  }}
                />
                :
                <WebView
                  originWhitelist={['*']}
                  cacheEnabled={false}
                  setSupportMultipleWindows={false}
                  saveFormDataDisabled={true}
                  allowsBackForwardNavigationGestures={true}
                  // onShouldStartLoadWithRequest={this.shouldStartLoadWithRequest}
                  onError={console.error.bind(console, 'error')}
                  // injectedJavaScript={runFirst}
                  incognito={true}
                  cacheMode={'LOAD_NO_CACHE'}
                  // onMessage={this.onMessage.bind(this)}
                  javaScriptEnabled={true}
                  onLoadEnd={() => this.setState({ isLoading: false })}
                  source={{
                    html: '<script type="text/javascript"> ' +
                      'window.onload=function(){' +
                      'document.forms["myForm"].submit();' + '}</script>' +
                      '<body >' +
                      '<form id="myForm" method="POST" action="https://online.bharti-axalife.com/BAL_DSS_PREPROD/Login.aspx?VO=1">' +
                      '<input type="hidden" name="isSales" value="' + this.state.isSales + '"/>' +
                      '<input type="hidden" name="jwtToken" value="' + this.state.accessToken + '"/>' +
                      '<input type="hidden" type="submit" value="Login"/>' +
                      '</form>' +
                      '</body>'
                  }}
                />
            }

          </View>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  gridViewBackground: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    borderColor: 'white',
    borderWidth: 0.0,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: 'rgb(234,240,248)',
    justifyContent: 'center',
    alignItems: 'center',


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
    backgroundColor: '#ffffff',
    height: wp('10.66%'),
    width: '100%'
  },
  tab1BG: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab2BG: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '25%'
  },
  tab3BG: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '25%'
  },
  tab4BG: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
    width: 40,
    height: '90%',
    top: 0,
    marginLeft: '40%',
    backgroundColor: 'transparent',
  },
  imgprofile: {
    width: 80,
    height: 80,
    borderRadius: 40,

  },

  appiconView:
  {
    width: 70,
    height: 70,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50
  },

  appIcon:
  {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
  },
  cmgsoonIcon:
  {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
  },
  backTouchable: {
    width: '25%',
    height: '100%',
    marginEnd: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'

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
  welcomContainer:
  {
    width: '30%',
    height: '100%',

    marginLeft: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerTitle: {
    color: 'rgb(30,77,155)',
    fontSize: 15,

  },
  headerTitle1: {
    color: 'rgb(30,77,155)',
    fontSize: 15,
    fontWeight: 'bold'

  },
  quickLinksText: {
    color: 'rgb(30,77,155)',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 15,


  },
  appName: {
    color: 'rgb(30,77,155)',
    fontWeight: 'bold',
    fontSize: 15,
    top: 5
  },
  appdppescription: {
    color: 'rgb(30,77,155)',
    fontSize: 12,
    textAlign: 'center',

  },
  appBackground: {
    width: wp('45%'),
    height: wp('25%'),
    top: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
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
    elevation: 5
  },
  quicklinkcontainer: {
    backgroundColor: 'transparent',
    width: wp('100%'),
    flex: 0.1,

    flexDirection: 'row',
    marginStart: 10,
    marginEnd: 10,

  },
  imgcontainer: {
    backgroundColor: 'transparent',
    width: wp('100%'),
    flex: 0.2,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection:'row'
  },
  container1: {
    backgroundColor: 'transparent',
    width: wp('100%'),
    flex: 0.2,
    marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  container: {
    backgroundColor: 'transparent',
    width: wp('100%'),
    flex: 0.2,
    marginTop: '20%',
    justifyContent: 'space-between',
    flexDirection: 'row'
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
  description: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },

});
