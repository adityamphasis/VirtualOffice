import React, { PropTypes } from 'react'

import {
  StyleSheet, Text, View, TouchableOpacity,
  ImageBackground, Image, StatusBar, Keyboard,
  Platform, SafeAreaView, Linking, NativeModules, FlatList, BackHandler, Alert
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { getConfiguration, setConfiguration, unsetConfiguration } from '../../utils/configuration';


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
    setConfiguration('isSupport', false)
    // this.validateTokenApi();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    // this.focusListener.remove();
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  closePopup = async () => {
    this.props.navigation.goBack();
  }

  onComposeMail = (input) => {

    try {
      Linking.openURL(`mailto:${input}?subject=M-Smart App Support`);
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }

  }

  onCallPress = (input) => {

    console.log('onCallPress', input);

    if (Platform.OS === 'android')
      phoneNumber = `tel:${input}`;
    else
      phoneNumber = `telprompt:${input}`;

    try {
      Linking.openURL(phoneNumber);
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }

  }

  raiseTicket = () => {
    Linking.openURL("https://bhartiaxagi.symphonysummit.com/");
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
                <TouchableOpacity
                  onPress={() => this.onComposeMail('digitalappsupport@bhartiaxa.com')}
                  style={styles.buttonContainer}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/eml_icon.png')} />
                  <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>Email ID</Text>
                    <Text style={styles.appName}>digitalappsupport@bhartiaxa.com</Text>
                  </View>
                </TouchableOpacity>
              </View>


              <View
                style={styles.appcontaine2}>
                <TouchableOpacity
                  onPress={() => this.onCallPress('7400115321')}
                  style={styles.buttonContainer}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/phn_icon.png')} />
                  <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>NINAD KAMBLI</Text>
                    <Text style={styles.appName}>7400115321</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onCallPress('90821774183')}
                  style={styles.buttonContainer}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/phn_icon.png')} />
                  <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>AKASH ACHREKAR</Text>
                    <Text style={styles.appName}>90821774183</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onCallPress('9867984199')}
                  style={styles.buttonContainer}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/phn_icon.png')} />
                  <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>DHANASHREE PARAB</Text>
                    <Text style={styles.appName}>9867984199</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onCallPress('9067586964')}
                  style={styles.buttonContainer}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/phn_icon.png')} />
                  <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>HARSHIKA BUCHE</Text>
                    <Text style={styles.appName}>9067586964</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onCallPress('7350718325')}
                  style={styles.buttonContainer}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/phn_icon.png')} />
                  <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>SHUBHAM PATIL</Text>
                    <Text style={styles.appName}>7350718325</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onCallPress('8898107104')}
                  style={styles.buttonContainer}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/phn_icon.png')} />
                  <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>GAURAV CHANDRAWALE</Text>
                    <Text style={styles.appName}>8898107104</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onCallPress('7057052813')}
                  style={styles.buttonContainer}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/phn_icon.png')} />
                  <View style={styles.appBackground1}>
                    <Text style={styles.appName1}>AKSHAY PHAPALE</Text>
                    <Text style={styles.appName}>7057052813</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              <Text style={styles.appName1}>To raise ticket in Symphony</Text>
              <TouchableOpacity onPress={() => this.raiseTicket()}>
                <Text style={{ color: 'blue', textDecorationLine: 'underline', marginLeft: 5, marginTop: 5 }}>Click here</Text>
              </TouchableOpacity>
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
    marginLeft: '20%',
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
    flex: 0.9,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  appcontainer2: {
    backgroundColor: 'yellow',
    width: wp('90%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

});
