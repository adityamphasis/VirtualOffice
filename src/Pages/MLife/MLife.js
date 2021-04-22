import React, { PropTypes } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  ImageBackground, Image, Linking, StatusBar, Keyboard, Platform,
  SafeAreaView, ScrollView
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import axios from 'react-native-axios';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import { DrawerActions } from 'react-navigation-drawer';

import { getConfiguration, setConfiguration } from '../../utils/configuration';
import { Loader } from '../../../components';
import { encryptData, decryptData } from '../../utils/AES';

export default class MLife extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      clickOnApp: false,
      isLoading: false,
    };

  }

  componentDidMount = () => {
    this.versionApiData = getConfiguration('appsData');
  }

  goBack() {
    this.props.navigation.goBack();
  }

  openDrawerClick() {

    console.log('openDrawerClick');

    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  clickiLearn = () => {

    IntentLauncher.startAppByPackageName('com.chaptervitamins.bharatiaxa')
      .then((result) => {
        console.log('startAppByPackageName started');
      })
      .catch((error) => {
        console.warn('startAppByPackageName: could not open', error);

        // if (this.versionApiData) {
        //   const index = this.versionApiData.findIndex(x => x.PackageName === 'com.chaptervitamins.bharatiaxa');
        //   console.log('index', index);
        //   if (index != -1) {
        //     Linking.openURL(this.versionApiData[index].AppDownloadLink);
        //     return;
        //   }
        // }

        Linking.openURL('https://play.google.com/store/apps/details?id=com.chaptervitamins.bharatiaxa');

      });


  }

  clickiearn = () => {

    IntentLauncher.startAppByPackageName('com.bhartiaxa.mlife')
      .then((result) => {
        console.log('startAppByPackageName started');
      })
      .catch((error) => {
        console.warn('startAppByPackageName: could not open', error);

        // if (this.versionApiData) {
        //   const index = this.versionApiData.findIndex(x => x.PackageName === 'com.bhartiaxa.mlife');
        //   console.log('index', index);
        //   if (index != -1) {
        //     Linking.openURL(this.versionApiData[index].AppDownloadLink);
        //     return;
        //   }
        // }

        Linking.openURL('https://play.google.com/store/apps/details?id=com.bhartiaxa.mlife');

      });

  }

  gotoRecruit() {

    IntentLauncher.startAppByPackageName('com.bhartiaxa.recruit')
      .then((result) => {
        console.log('startAppByPackageName started');
      })
      .catch((error) => {
        console.warn('startAppByPackageName: could not open', error);

        // if (this.versionApiData) {
        //   const index = this.versionApiData.findIndex(x => x.PackageName === 'com.bhartiaxa.recruit');
        //   console.log('index', index);
        //   if (index != -1) {
        //     Linking.openURL(this.versionApiData[index].AppDownloadLink);
        //     return;
        //   }
        // }

        Linking.openURL('https://play.google.com/store/apps/details?id=com.bhartiaxa.recruit');

      });


  }

  gotoService = () => {

    if (getConfiguration('salesflag')) {
      this.props.navigation.navigate('MCustomer', { screen: 'service' })
    } else {
      alert('Application is not applicable to login user.')
    }

  }

  gotoiWIn() {
    if (getConfiguration('salesflag')) {
      this.ApiWin()
    } else {
      alert('Application is not applicable to login user.')
    }
  }

  ApiWin = async () => {

    console.log('ApiWin');
    this.setState({ isLoading: true });

    //let url = "https://online.bharti-axalife.com/MiscServices/iwin-uat-web/api/compass-sso-wrapper/login"

    let url = "https://online.bharti-axalife.com/MiscServices/iwin-uat-web/api/compass-sso-wrapper/login"

    let params = {
      'jwtToken': getConfiguration('encryptedToken', ''),
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

      console.log("iwin encrypted response => ", JSON.stringify(response.data));
      this.parseiWinApiData(response.data);

    }).catch(error => {
      console.log("cvzgvxbhvb", error);
      this.setState({ isLoading: false });
      alert('Something went wrong. Please try again after some time.');

    });

  }

  parseiWinApiData = async (data) => {

    try {

      const result = await decryptData(data.response);
      this.setState({ isLoading: false });

      console.log('iWIn result => ', result.data.deepLink);

      const url = result.data.deepLink

      if (url.includes("https")) {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
      } else {
        alert('No User found');
      }

    } catch (error) {
      // alert('No user found');
      this.setState({ isLoading: false });
      alert('Something went wrong. Please try again after some time.');
    }

  }

  clickApp = () => {
    this.setState({ clickOnApp: true });
  }

  closePopUp = () => {
    this.setState({ clickOnApp: false });
  }

  showAlert = () => {
    alert('Coming Soon');
  }

  render() {

    return (
      <SafeAreaView style={styles.background}>

        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.goBack()}>
            <Image resizeMode="contain" style={styles.leftLogo}
              source={require('../../../assets/logo_rht.png')} />
            <Text style={[styles.headerTitle1, { marginLeft: 5, color: 'black' }]}>M-Life</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.openDrawerClick()}>
            <Image resizeMode="contain" style={styles.rghtLogo}
              source={require('../../../assets/menu.jpeg')} />
          </TouchableOpacity>

        </View>

        <ScrollView style={styles.mainContainer}>

          <Loader visible={this.state.isLoading} />

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.appBackground}
              onPress={() => this.gotoRecruit()}>
              <View style={styles.appiconView}>
                <Image resizeMode="contain" style={styles.appIcon}
                  source={require('../../../assets/i-RECRUIT.png')} />
              </View>
              <Text style={styles.quickLinksText}> i-RECRUIT </Text>
              <Text style={styles.appdppescription}>For advisor prospecting and onboarding</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.appBackground}
              onPress={() => this.clickiLearn()}>
              <View style={styles.appiconView}>
                <Image resizeMode="contain" style={styles.appIcon}
                  source={require('../../../assets/i-LEARN.png')} />
              </View>
              <Text style={styles.quickLinksText}> i-LEARN </Text>
              <Text style={styles.appdppescription}>For learning and Development</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.appBackground}
              onPress={() => this.clickiearn()}>
              <View style={styles.appiconView}>
                <Image resizeMode="contain" style={styles.appIcon}
                  source={require('../../../assets/i-EARN.png')} />
              </View>
              <Text style={styles.quickLinksText}> i-EARN </Text>
              <Text style={styles.appdppescription}>For income and career planning</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.appBackground}
              onPress={() => this.gotoiWIn()}>
              <View style={styles.appiconView}>
                <Image resizeMode="contain" style={styles.appIcon}
                  source={require('../../../assets/i-WIN.png')} />
              </View>
              <Text style={styles.quickLinksText}> i-WIN </Text>
              <Text style={styles.appdppescription}>For reward and recognition</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container1}>
            <TouchableOpacity
              style={styles.appBackground}
              onPress={() => this.gotoService()}>
              <View style={styles.appiconView}>
                <Image resizeMode="contain" style={styles.appIcon}
                  source={require('../../../assets/i-SERVICE.png')} />
              </View>
              <Text style={styles.quickLinksText}> i-SERVICE </Text>
              <Text style={styles.appdppescription}>For self and customer service</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>


      </SafeAreaView>

    );
  }

}

const styles = StyleSheet.create({
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
  mainContainer: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //marginBottom:10,
    // position: 'absolute',
    backgroundColor: '#f7f7f7',
    // content: 'center',
    // justifyContent:'center',
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
    width: '20%',
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
    fontFamily: 'WorkSans-Bold'


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
    fontFamily: 'WorkSans-Regular'

  },
  appBackground: {
    width: wp('45%'),
    height: wp('25%'),
    top: 0,
    padding: 5,
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
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection:'row'
  },
  container1: {
    backgroundColor: 'transparent',
    width: wp('100%'),
    flex: 0.2,
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%'

  },
  container: {
    backgroundColor: 'transparent',
    width: wp('100%'),
    flex: 0.2,
    marginTop: '15%',
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