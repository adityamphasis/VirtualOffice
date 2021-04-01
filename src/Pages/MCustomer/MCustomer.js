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
// import { CachedImage } from 'react-native-cached-image';
import { getConfiguration, setConfiguration } from '../../utils/configuration';
// var Browser = require('react-native-browser');

// const htmlContent = '<body onload="document.createElement("form").submit.call(document.getElementById("myForm"))">' +
// '<form id="myForm" method="POST" action="https://id2hs3de2e.execute-api.ap-south-1.amazonaws.com/uat/api/v1/auth/externalLogin">' +
// '<input type="hidden" name="source" value="surce"/>' +
// '<input type="hidden" name="jwtToken" value="eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMzk0OTAiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiV09uMF9LUzhLQm84SHozWFkxZWtjdG5fUXRzYSIsIm5iZiI6IjE2MTMxMjQ4MzQiLCJhenAiOiJXT24wX0tTOEtCbzhIejNYWTFla2N0bl9RdHNhIiwic2NvcGUiOiJvcGVuaWQiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmJoYXJ0aS1heGFsaWZlLmNvbTo0NDMvb2F1dGgyL3Rva2VuIiwiZXhwIjoxNjEzMzkxMjY4LCJpYXQiOiIxNjEzMTI0ODM0IiwianRpIjoiZjdkNjAyNjMtZTljMS00ZjlkLWIzYzEtN2EzNTMzZTQ2Njg2In0"/>' +
// '<input type="submit" value="Login"/>' +
// '</form>' +
// '</body>';



const createFormData = (token) => {
  const data = new FormData();

  data.append("jwtToken", token);
  data.append('source', 'android')

  console.log(data);

  return JSON.stringify(data);
};


export default class MCustomer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: getConfiguration('encryptedToken', ''),
      //accessToken:getConfiguration('token')
      platform: '',
      isSales: getConfiguration('salesflag', ''),
      comingScreen: this.props.navigation.getParam('screen')
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

    // Linking.openURL('data:text/html;charset=utf-8,' +
    // encodeURIComponent( // Escape for URL formatting
    //   '<script type="text/javascript"> window.onload=function(){document.forms["myForm"].submit();}</script>' +
    //   '<body >' +
    //   '<form id="myForm" method="POST" action="https://id2hs3de2e.execute-api.ap-south-1.amazonaws.com/uat/api/v1/auth/externalLogin">' +
    //   '<input type="hidden" name="source" value="'+this.state.platform+'"/>' +
    //  ' <input type="hidden" name="jwtToken" value="'+this.state.accessToken+'"/>' +
    //  ' <input type="hidden" type="submit" value="Login"/>' +
    //  ' </form>' +
    //   '</body>')
    // );

    //     window.open('data:text/html;charset=utf-8,' +
    //     encodeURIComponent( // Escape for URL formatting
    //       '<script type="text/javascript"> window.onload=function(){document.forms["myForm"].submit();}</script>' +
    //       '<body >' +
    //       '<form id="myForm" method="POST" action="https://id2hs3de2e.execute-api.ap-south-1.amazonaws.com/uat/api/v1/auth/externalLogin">' +
    //       '<input type="hidden" name="source" value="'+this.state.platform+'"/>' +
    //      ' <input type="hidden" name="jwtToken" value="'+this.state.accessToken+'"/>' +
    //      ' <input type="hidden" type="submit" value="Login"/>' +
    //      ' </form>' +
    //       '</body>'
    //     )
    // );

  }

  goBack() {
    this.props.navigation.goBack();
  }

  openDrawerClick() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  sendMessage() {
    this.props.navigation.navigate('SendMessage');
  }

  onMessage(e) {

    console.log('onMessage');

    // retrieve event data
    var data = e.nativeEvent.data;
    // maybe parse stringified JSON
    try {
      data = JSON.parse(data)
    } catch (e) { }

    // check if this message concerns us
    if ('object' == typeof data && data.external_url_open) {
      // proceed with URL open request
    }
  }

  shouldStartLoadWithRequest = (req) => {
    // open the link in native browser
    // Linking.openURL(req.url);

    // returning false prevents WebView to navigate to new URL
    return false;
  };

  render() {

    // const runFirst = `ios.isNativeApp = true; true; // note: this is required, or you'll sometimes get silent failures`;

    // let jsCode = `!function(){var e=function(e,n,t){if(n=n.replace(/^on/g,""),"addEventListener"in window)e.addEventListener(n,t,!1);else if("attachEvent"in window)e.attachEvent("on"+n,t);else{var o=e["on"+n];e["on"+n]=o?function(e){o(e),t(e)}:t}return e},n=document.querySelectorAll("a[href]");if(n)for(var t in n)n.hasOwnProperty(t)&&e(n[t],"onclick",function(e){new RegExp("^https?://"+location.host,"gi").test(this.href)||(e.preventDefault(),window.postMessage(JSON.stringify({external_url_open:this.href})))})}();`

    const localScript = '';

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

        {this.state.comingScreen == 'service' ?
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
          :
          <View style={styles.headerView}>
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

            {/* <WebView
                 source={{uri: 'https://id2hs3de2e.execute-api.ap-south-1.amazonaws.com/uat/api/v1/auth/externalLogin', body:createFormData(this.state.accessToken),method:'POST'}}
                 style={{ width: '100%', height: '100%', backgroundColor: 'white' }}

               /> */}
            {/* <WebView
                 originWhitelist={['*']}
                 injectedJavaScript={runFirst}
                 source={{ html: '<script>adocument.createElement("form").submit.call(document.getElementById("myForm"))</script>' +
                 '<body onload="document.createElement("form").submit.call(document.getElementById("myForm"))>'+
                 '<form id="myForm" method="POST" action="https://id2hs3de2e.execute-api.ap-south-1.amazonaws.com/uat/api/v1/auth/externalLogin">'+
                 '<input type="hidden" name="source" value="surce"/>'+
                 '<input type="hidden" name="jwtToken" value="eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMzk0OTAiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiV09uMF9LUzhLQm84SHozWFkxZWtjdG5fUXRzYSIsIm5iZiI6IjE2MTMxMjQ4MzQiLCJhenAiOiJXT24wX0tTOEtCbzhIejNYWTFla2N0bl9RdHNhIiwic2NvcGUiOiJvcGVuaWQiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmJoYXJ0aS1heGFsaWZlLmNvbTo0NDMvb2F1dGgyL3Rva2VuIiwiZXhwIjoxNjEzMzkxMjY4LCJpYXQiOiIxNjEzMTI0ODM0IiwianRpIjoiZjdkNjAyNjMtZTljMS00ZjlkLWIzYzEtN2EzNTMzZTQ2Njg2In0. "/>'+
                 '<input type="submit" value="Login"/>'+
                 '</form></body>'}}

               /> */}

            {
              this.state.comingScreen == 'customer' ?
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
                  source={{
                    html: '<script type="text/javascript"> ' +
                      'window.onload=function(){' +
                      'document.forms["myForm"].submit();' +
                      // 'for(var els = document.getElementsByTagName(\'a\'), i = els.length; i--;){' +
                      // 'var href = els[i].href;' +
                      // 'els[i].href = \'javascript:void(0);\';' +
                      // 'els[i].onclick = (function(el, href){' +
                      // 'return function(){' +
                      // 'window.location.href = href;' +
                      // '};' +
                      // '})(els[i], href);' +
                      // '}' +
                      // 'document.querySelectorAll(\'a\')].map((el) => {el.target = "_self"});' +
                      // 'document.documentElement.addEventListener(\'click\', function (event) {' +
                      // 'if(event.ctrlKey){event.preventDefault()}' +
                      // '});' +

                      // '[...document.querySelectorAll(\'a\')].map((el) => {' +
                      // 'el.target = "_self"' +
                      // '});' +

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
                  source={{
                    html: '<script type="text/javascript"> ' +
                      'window.onload=function(){' +
                      'document.forms["myForm"].submit();' +

                      // '[...document.querySelectorAll(\'a\')].map((el) => {' +
                      // 'el.target = "_self"' +
                      // '});' +

                      '}</script>' +
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
