import {
  StyleSheet, Text, View, TouchableOpacity,
  ImageBackground, Image, StatusBar, Keyboard,
  Platform, SafeAreaView, Linking, NativeModules, FlatList,BackHandler,Alert
} from 'react-native';
import React, { PropTypes } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import moment from "moment";

import { DrawerActions } from 'react-navigation-drawer';
import { getConfiguration, setConfiguration } from '../../utils/configuration';
import axios from 'react-native-axios';
import { Page, Button, ButtonOutline, ButtonContainer, Form, FormLabel, FormValue, Heading } from '../../../components';

import AppLink from 'react-native-app-link';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import Clipboard from '@react-native-community/clipboard';
import { Loader } from '../../../components';
import { encryptData, decryptData } from '../../utils/AES';

const appArray = [
  {
    icon: require('../../../assets/vymo.png'),
    appName: 'VYMO',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    androidId: 'com.getvymo.android',
    bundleId: 'com.getvymo.android',
    iosId: ''
  }, {
    icon: require('../../../assets/m_shell.png'),
    appName: 'MSell',
    isInstalled: false,
    isLatest: false,
    versionCode: 0,
    lastUpdated: 1,
    androidId: 'com.enparadigm.bharthiaxa',
    bundleId: 'com.enparadigm.bharthiaxa',
    iosId: 'm-sell/id1518565564'
  }, {
    icon: require('../../../assets/i-WIN.png'),
    appName: 'i-Win',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    androidId: 'com.xoxoday.compass',
    bundleId: 'com.xoxoday.compass',
    iosId: 'compass-xoxo/id1504258298'
  }, {
    icon: require('../../../assets/i-EARN.png'),
    appName: 'B.A.S.E Academy',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    androidId: 'com.xoxoday.compass',
    bundleId: 'com.xoxoday.compass',
    iosId: 'compass-xoxo/id1504258298'
  }, {
    icon: require('../../../assets/i-LEARN.png'),
    appName: 'i-Learn',
    isInstalled: false,
    isLatest: false,
    versionCode: 0,
    lastUpdated: 1,
    androidId: 'com.chaptervitamins.bhartiaxa',
    bundleId: 'com.chaptervitamins.bharthiaxa',
    iosId: ''
  }, {
    icon: require('../../../assets/i-EARN.png'),
    appName: 'i-Earn',
    isInstalled: false,
    isLatest: false,
    versionCode: 1,
    lastUpdated: 1,
    androidId: 'com.bhartiaxa.mlife',
    bundleId: 'com.bhartiaxa.mlife',
    iosId: 'm-life/id1550263609'
  }, {
    icon: require('../../../assets/i-WIN.png'),
    appName: 'i-Win',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    androidId: 'com.xoxoday.compass',
    bundleId: 'com.xoxoday.compass',
    iosId: 'compass-xoxo/id1504258298'
  }, {
    icon: require('../../../assets/i-RECRUIT.png'),
    appName: 'i-Recruit',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    androidId: 'com.bhartiaxa.recruit',
    bundleId: 'com.bhartiaxa.recruit',
    iosId: ''
  }
]


export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      clickOnApp: false,
      isShownCmgSoon: true,
      checkinstallstatus: true,
      savedToken: this.props.navigation.getParam('accessToken'),
      showVersionPopup: false,
      AgentName:getConfiguration('AgentName',''),
      AgentMobile:getConfiguration('MobileNumber',''),
      appList: []
    };

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

  componentDidMount() {
    this.getVersionControlsApi();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  handleBackButton = () => {
  

    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'Alert',
        'Are you sure want to exit the app',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () =>  BackHandler.exitApp()},
        ]
      );
      // BackHandler.exitApp();
      return true;
    } else {
      return false;
    }

  }

  

 

  openDrawerClick = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
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
    // console.log("sdfbsn", getConfiguration('salesflag'));
    if (getConfiguration('salesflag')) {
      this.props.navigation.navigate('MCustomer', { encToken: this.state.encryptedToken, screen: 'customer' })
    } else {
      alert('Available only for Agents')
    }
  }

  gotoVymo = () => {
    IntentLauncher.startAppByPackageName('com.getvymo.android')
      .then((result) => {
        console.log('startAppByPackageName started');
      })
      .catch((error) => console.warn('startAppByPackageName: could not open', error));
  }

  copyToClipboard = () => {

    console.log("copy to clipboard", getConfiguration('encryptedToken', ''));

    Clipboard.setString(getConfiguration('encryptedToken', ''))
  }

  closePopUp = () => {
    this.setState({
      clickOnApp: false,
      checkinstallstatus: true
    })
  }

  gotoMSell = () => {

    IntentLauncher.startAppByPackageName('com.enparadigm.bharthiaxa')
      .then((result) => {
        console.log('startAppByPackageName started');
      })
      .catch((error) => console.warn('startAppByPackageName: could not open', error));

  }

  closePopUp = () => {
    this.setState({
      clickOnApp: false,
      checkinstallstatus: true
    })
  }

  checkAppInstallStatus = () => {

    IntentLauncher.isAppInstalled('com.enparadigm.bharthiaxa')
      .then((result) => {
        console.log('isAppInstalled yes', result);

        this.setState({
          checkinstallstatus: true
        })
      })
      .catch((error) => {
        console.log("gdfsdvfgfvfhg", error);
        this.setState({
          checkinstallstatus: false
        })
      }

      );
  }

  installApp = () => {
    // https://play.google.com/store/apps/details?id=com.enparadigm.bharthiaxa&hl=en&gl=US
    Linking.openURL("market://details?id=com.enparadigm.bharthiaxa&hl=en&gl=US");
  }

  // logout = () => {

  //   const savedToken = getConfiguration('token');

  //   let url = "https://accounts.bharti-axalife.com/oidc/logout?"


  //   let finalurl = url + "id_token_hint=" + savedToken + "&post_logout_redirect_uri=com.bhartiaxa.virtualoffice://oauth"

  //   console.log("gczdhvb", finalurl);

  //   //console.log("vdgfhhg", decryptData(response.CheckAgentCodeJWTResult,key,salt));

  //   axios.get(finalurl, {
  //     "headers": {
  //       "content-type": "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       console.log("vdgf42253465656hhg", response);
  //       //let decResponse = decryptData("rT/lgzM78o/24AyqFmdOF3/PeVhs6Exj0gXuU6LbWEPyWbe7cbfqZj3YbrmbqV+OQz5deQp4CLj2efcjM/jLyHe2wBSLaS3HVJYT8fj7us/2xOqjJWsDwRwZObUofyUJriGmFXwTtrNolsTW4h4VOWffql3OecJsdELEaSF/I1POKXi2MmEtZKA63glc7MctDg5ApcmpZuKLKKVqxB0YdZ9D6/7/wYDUZJ/MFlLiA23ywwkTdeKnbYeI0kJ0mjFN",'6c0ce6669b01b8e918f786f466be6968e70025c573a42753b7efb13cd89d6e5a','$!rl@$b!')
  //       //console.log("vdgfhhg",decResponse);

  //     })

  //     .catch(function (error) {

  //       console.log("cvzgvxbhvb", error);

  //     });
  // }

  // CheckJWTToken = () => {

  //   let url = "https://online.bharti-axalife.com/MiscServices/JWTAgentRESTService/Service1.svc/WE_CheckAgentCodeJWT"

  //   let params = {
  //     "DecodeJWT": this.state.savedToken,
  //     "PartnerKey": "JWT12SER02"
  //   };

  //   axios.post(url, params, {
  //     "headers": {
  //       "content-type": "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       console.log("vdgf42253465656hhg", response.data);

  //       var sales = response.data.IsSalesAgent;
  //       var etoken = response.data.EncodedJWT
  //       console.log("gafsvfhvb", sales);

  //       setConfiguration('salesflag', sales)
  //       setConfiguration('encryptedToken', etoken)

  //       if (Platform.OS == 'android') {
  //         NativeModules.HelloWorldModule.ShowMessage(
  //           etoken,
  //           'false',
  //           5000,
  //         );
  //       } else if (Platform.OS == 'ios') {
  //         NativeModules.HelloWorld.ShowMessage('Awesome!its working!', 0.5);
  //       }

  //     })
  //     .catch(function (error) {

  //       console.log("cvzgvxbhvb", error);

  //     });


  // }

  parseVersionApiData = async (data) => {

    const result = await decryptData(data.response);

    this.setState({ isLoading: false });
    console.log('result => ', result);

    this.versionApiData = result.AppDetails ? result.AppDetails : [];

    this.versionControlPopupLogin();

  }

  versionControlPopupLogin = async () => {

    if (this.state.isLoading)
      return;

    if (!this.versionApiData)
      return;

    try {

      const installedApps = await RNAndroidInstalledApps.getNonSystemApps();

      console.log('installedApps', JSON.stringify(installedApps));

      let tempList = [];

      this.versionApiData.map(item => {

        let index = installedApps.findIndex(x => x.packageName === item.PackageName);
        let iconIndex = appArray.findIndex(x => x.androidId === item.PackageName);

        const iObj = {
          icon: iconIndex != -1 ? appArray[iconIndex].icon : '',// require('../../../assets/m_shell.png'),
          appName: item.AppName,
          versionCode: item.MandatoryVersion,
          androidId: item.PackageName,
          bundleId: item.PackageName,
          lastUpdated: index != -1 ? moment(installedApps[index].lastUpdateTime).format("DD/MM/YYYY") : '',
          isInstalled: index != -1 ? true : false,
          isLatest: (index != -1 && item.MandatoryVersion == installedApps[index].versionName + '') ? true : false
        }

        tempList.push(iObj);

      });

      if (tempList.length > 0)
        this.setState({ showVersionPopup: true, appList: tempList });

    } catch (error) {
      console.log('error', JSON.stringify(error));
    }


  }

  getVersionControlsApi = async () => {


    console.log("getVersionControlsApi");

    this.setState({ isLoading: true });

    let url = "https://online.bharti-axalife.com/MiscServices/VersionControlRestService/Service1.svc/GetVersionControlDetails"

    // const param = 'bIUNut6Ks+Z1mTyaFx9dI+N9nxOrxQPSNsOkASCTDquWxiWumx6e8gKAn7YrNcikIxHS9Z9LEYjMDOxwHivKFw==';

    let params = {
      'Platform': Platform.OS === 'android' ? 'Android' : 'Ios',
      'PartnerKey': 'VC18APP02SER'
    }

    const encryptedParam = await encryptData(JSON.stringify(params));

    console.log('version ecrypted data: ', encryptedParam);

    let encParams = {
      "request": encryptedParam
    };

    axios.post(url, encParams, {
      "headers": {
        "content-type": "application/json",
      }
    }).then(response => {
      // const result =  response.toJson();
      console.log("version response => ", JSON.stringify(response.data));

      this.parseVersionApiData(response.data);

    }).catch(error => {
      console.log("version error", JSON.stringify(error));
    });

  }

  showAlert = () => {
    alert('Coming Soon')
  }

  rederHeader = () => {

    return (
      <View style={[styles.headerView, { elevation: this.state.showVersionPopup ? 0 : 10 }]}>
        <TouchableOpacity
          style={styles.backTouchable}
          onPress={() => this.copyToClipboard()}>
          <Image resizeMode="contain" style={styles.leftLogo}
            source={require('../../../assets/logo_rht.png')} />
        </TouchableOpacity>
        <View style={styles.welcomContainer}>
          <Text style={styles.headerTitle}> Welcome to</Text>
          <Text style={styles.headerTitle1}> Virtual Office</Text>
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

  closeVersionPopup = async () => {
    this.setState({ showVersionPopup: false });
  }

  onInstallUpdatePress = (item) => {

    if (Platform.OS == 'android') {

      if (item.androidId === '') {
        alert('Application details not available.');
        return;
      }

      if (item.androidId === 'com.enparadigm.bharthiaxa') {
        Linking.openURL("https://slack-files.com/T85QWDR0V-F01SA1Z4C3U-69b095adf7");
        return;
      }

      if (item.androidId === 'com.bhartiaxa.recruit') {
        Linking.openURL("https://we.tl/t-F0IemaPQsd");
        return;
      }

      Linking.openURL("http://play.google.com/store/apps/details?id=" + item.androidId);
    } else {

      if (item.iosId === '') {
        alert('Application details not available.');
        return;
      }

      Linking.openURL("https://apps.apple.com/us/app/" + item.iosId);
    }

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

      }} source={require('../../../assets/grad.png')}>

        <View style={{ flex: 2.5, alignItems: 'center' }}>
          <Image style={[{ height: 40, width: 40, margin: 10 }]}
            resizeMode='contain'
            source={item.icon} />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(30,77,155)' }}>{item.appName}</Text>
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

            <Text style={styles.quickLinksText}> Create a Lead </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBackground}
            onPress={() => this.clickApp()}>

            <Text style={styles.quickLinksText}> Onboard Customer </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBackground}
            onPress={() => this.clickApp()}>

            <Text style={styles.quickLinksText}> Track application status </Text>
          </TouchableOpacity>

        </View>

        {this.renderComingSoonPopup()}
        {this.state.showVersionPopup && this.renderVersionPopup()}
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
    width: '30%',
    height: '100%',

    marginLeft: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  overlayView1: {
    top: wp('66%'),
    left: 0,
    right: 0,
    bottom: 0,
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
    fontWeight: 'bold',
    alignSelf: 'center',
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
