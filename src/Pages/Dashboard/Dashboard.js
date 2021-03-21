import {
  StyleSheet, Text, View, TouchableOpacity,
  ImageBackground, Image, StatusBar, Keyboard,
  Platform, SafeAreaView, Linking, NativeModules, FlatList
} from 'react-native';
import React, { PropTypes } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install';

import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import moment from "moment";

import { DrawerActions } from 'react-navigation-drawer';
import { getConfiguration, setConfiguration } from '../../utils/configuration';
import axios from 'react-native-axios';
import { Page, Button, ButtonOutline, ButtonContainer, Form, FormLabel, FormValue, Heading } from '../../../components';
import { ScrollView } from 'react-native-gesture-handler';
// import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install';
import AppLink from 'react-native-app-link';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
const { data } = NativeModules;

const HelloWorld = NativeModules.HelloWorldModule;

const appArray = [
  {
    icon: require('../../../assets/i-EARN.png'),
    appName: 'i-Earn',
    isInstalled: false,
    isLatest: false,
    versionCode: 0,
    lastUpdated: '27/07/2021',
    androidId: 'com.myntra.android',
    iosId: '123455'
  }, {
    icon: require('../../../assets/i-WIN.png'),
    appName: 'i-Win',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: '27/07/2021',
    androidId: 'com.app.flipkart',
    iosId: '123455'
  }, {
    icon: require('../../../assets/i-LEARN.png'),
    appName: 'i-Learn',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: '27/07/2021',
    androidId: 'com.app.flipkart',
    iosId: '123455'
  }, {
    icon: require('../../../assets/i-RECRUIT.png'),
    appName: 'i-Recruit',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: '27/07/2021',
    androidId: 'com.app.flipkart',
    iosId: '123455'
  }, {
    icon: require('../../../assets/i-SERVICE.png'),
    appName: 'i-Service',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: '27/07/2021',
    androidId: 'com.app.flipkart',
    iosId: '123455'
  }
]

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clickOnApp: false,
      isShownCmgSoon: true,
      checkinstallstatus: true,
      savedToken: this.props.navigation.getParam('accessToken'),
      showVersionPopup: true,

      appList: []
    };

    this.installedApps = [];
  }


  // componentDidMount() {

  //this.appInstall()
  //BackHandler.addEventListener("hardwareBackPress", this.handleBackPress); 

  //  IntentLauncher.isAppInstalled('com.enparadigm.bharthiaxa')
  // .then((result) => {
  //   console.log('isAppInstalled yes',result);
  // })
  // .catch((error) => console.warn('isAppInstalled: no', error));


  //this.saveData()

  // }

  // saveData()
  // {
  //   data.getTorchStatus((error, isOn) => {
  //     this.setState({isOn: isOn});
  //   });
  // }


  // handleBackButton = () => {
  //   Alert.alert(
  //       'Exit App',
  //       'Exiting the application?', [{
  //           text: 'Cancel',
  //           onPress = () => console.log('Cancel Pressed'),
  //           style: 'cancel'
  //       }, {
  //           text: 'OK',
  //           onPress = () => BackHandler.exitApp()
  //       }, ], {
  //           cancelable: false
  //       }
  //    )
  //    return true;
  //  } 

  appInstall() {
    AppLink.openInStore({ appName: "M-Sell", appStoreId: '529379082', appStoreLocale: 'us', playStoreId: 'id=com.enparadigm.bharthiaxa' }).then((datares) => {
      // do stuff
      console.log("ghfbbbnbbn", datares);
      alert("app installed")

    })
      .catch((err) => {
        // handle error
        alert(err)
      });
  }

  componentDidMount() {
    this.CheckJWTToken();
    this.getInstalledAppData();
  }

  componentWillUnmount() {

  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async     return true;   
  };

  getAppsData = async () => {

    const tempList = [];
    appArray.map(app => {
      console.log(JSON.stringify(app.androidId));
      let index = this.installedApps.findIndex(x => x.packageName === app.androidId);

      console.log('findApp index', JSON.stringify(index));

      if (index != -1) {
        app.isInstalled = true;
        app.lastUpdated = moment(this.installedApps[index].lastUpdateTime).format("DD/MM/YYYY");
        if (app.versionCode === this.installedApps[index].versionCode)
          app.isLatest = true;
        tempList.push(app);
      } else
        tempList.push(app);
    });


    this.setState({ appList: tempList });

  }

  getInstalledAppData = async () => {
    try {
      const apps = await RNAndroidInstalledApps.getNonSystemApps();
      if (apps)
        this.installedApps = apps;
      console.log('apps', JSON.stringify(this.installedApps));

      this.getAppsData();

    } catch (e) {
      console.log('apps Error', JSON.stringify(e));
      this.getAppsData();
    }


    // RNAndroidInstalledApps.getApps().then(apps => {
    //   console.log('apps', JSON.stringify(apps));
    //   // if (apps) {

    //   //   apps.map(app => {

    //   //   });

    //   // }
    // }).catch(error => {
    //   alert(error);
    // });

  }

  openDrawerClick() {
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
    console.log("sdfbsn", getConfiguration('salesflag'));
    if (getConfiguration('salesflag')) {
      this.props.navigation.navigate('MCustomer', { encToken: this.state.encryptedToken })
    }
    else {
      alert('Available only for Agents')
    }



  }

  gotoMSell() {

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



    // To check by app name:
    // AppInstalledChecker
    // .isAppInstalled('M-Sell')
    // .then((isInstalled) => {
    //     // isInstalled is true if the app is installed or false if not
    //     alert(isInstalled)

    //     this.setState({
    //       checkinstallstatus:isInstalled
    //     })

    // });

    //To check using URL (works on iOS and Android):
    // AppInstalledChecker
    // .checkURLScheme('M-Sell') // omit the :// suffix
    // .then((isInstalled) => {
    //     // isInstalled is true if the app is installed or false if not

    //     console.log("App not found",isInstalled);

    //     alert(isInstalled)

    //     this.setState({
    //       checkinstallstatus:isInstalled
    //     })

    //     //alert('App installed')
    // })

    // To check using package name (Android only):
    // AppInstalledChecker
    // .isAppInstalledAndroid('com.enparadigm.bharthiaxa')
    // .then((isInstalled) => {
    //     // isInstalled is true if the app is installed or false if not

    // });
  }

  installApp = () => {
    // https://play.google.com/store/apps/details?id=com.enparadigm.bharthiaxa&hl=en&gl=US
    Linking.openURL("market://details?id=com.enparadigm.bharthiaxa&hl=en&gl=US");
  }

  logout = () => {

    const savedToken = getConfiguration('token')

    let url = "https://accounts.bharti-axalife.com/oidc/logout?"


    let finalurl = url + "id_token_hint=" + savedToken + "&post_logout_redirect_uri=com.bhartiaxa.virtualoffice://oauth"

    console.log("gczdhvb", finalurl);

    //console.log("vdgfhhg", decryptData(response.CheckAgentCodeJWTResult,key,salt));

    axios.get(finalurl, {
      "headers": {

        "content-type": "application/json",

      },
    })
      .then(function (response) {
        console.log("vdgf42253465656hhg", response);
        //let decResponse = decryptData("rT/lgzM78o/24AyqFmdOF3/PeVhs6Exj0gXuU6LbWEPyWbe7cbfqZj3YbrmbqV+OQz5deQp4CLj2efcjM/jLyHe2wBSLaS3HVJYT8fj7us/2xOqjJWsDwRwZObUofyUJriGmFXwTtrNolsTW4h4VOWffql3OecJsdELEaSF/I1POKXi2MmEtZKA63glc7MctDg5ApcmpZuKLKKVqxB0YdZ9D6/7/wYDUZJ/MFlLiA23ywwkTdeKnbYeI0kJ0mjFN",'6c0ce6669b01b8e918f786f466be6968e70025c573a42753b7efb13cd89d6e5a','$!rl@$b!')
        //console.log("vdgfhhg",decResponse);

      })

      .catch(function (error) {

        console.log("cvzgvxbhvb", error);

      });
  }

  CheckJWTToken() {

    // let url = "https://online.bharti-axalife.com/MiscServices/JWTAgentRESTService/Service1.svc/CheckAgentCodeJWT"

    let url = "https://online.bharti-axalife.com/MiscServices/JWTAgentRESTService/Service1.svc/WE_CheckAgentCodeJWT"

    let params = {
      "DecodeJWT": this.state.savedToken,
      "PartnerKey": "JWT12SER02"
    };

    // let encParams = {

    //   "request":"LwxtRjw9brRKKRgOiXyKUgCZj7a6NEchDOVtTrtDsRjdEM84sxK6/zWMymmwKKiiD8URnPsH9SIHQ1Sl9gFCUhMKu8EJdGUt6U92oFGNrzmFSGVgajvu4OqrF8SBCWWJGj56hIrrleHgtQjZf3VqJ7/4rt7rUY8/ZGv33ccxV/WwPhN06uyefW+wWUHQ5sKHstZf2mSi+8iS87pYm0KTC02ZbWderNtRvR7Rn73rSxEYh0SoimTLfJ3didD2gY6hAXCunVcGA+d7Q6q+Kd7/LUlnCyP0FGonPc7dFEmYzUO4O4nU+H+2NBZM0c2S8DewbvlY5TGJG1WfO2CIdu5h9wfaUXAhBW0NDKb6hE1C6/gdoTj5bOCtQN92K1TfZkjUveDvAvcK3WNqXa6AnjS2aqgCU14U/YYPADhnI2zGOYeCWPRitEfWXuP3b5gYKNwXacB8aI58vma1Hhy9caLFGJknpf/rQIiePeUWbOGqgV0bAtomj18ks6Wbi3yaCknz/tGbov4izs70bKSftxFi6qnzl880NvEeApr2o3mJ/YnudwQoUpyyLEWwQ+Rbj4A8VLM/WE1LCOQ9dO0z7wN+hk2OYUgASrE7RUSjfuDI62GlRRtf3ny78/0x71oexk6oVgVc8+hRa+YbigjPv1hC3idYAdUBCFGrZ213eX4VAzBz+jXurkyNmYcEQ1wUQTX3QxNyrC+228AcN9cw5u9E4tzo5f1xshTGpskhk3r+KrFopjBKJBxGAILm8CHrhYO7mdDzEBxeSen9OrxBSszAqVfpZ3dDXhdCwKNsoQUooaPyERP8mR4h32feO6JPghG9rTLAO8rkGa64pVq4n5CuP+oMz5USoyZnhuWOFmWA8yE58lGlJwjAUsazPZMRzZh84H0wPrG1mwxEPQXMPBFUHgzhjFhb1w4KPj+xtKMZ9k8/lx9Lv+4bUKmg5FW40btyAMK2WEDNHtMo9rvfZTd0Px7tUJzktF1o6S8qWRwhnLYqeoIvKy+ApMnvNQWC9G7SBjHs2jHd64m4ulMV9h/teKSTkdvfoVD7IEmvQDwleRC4E8E5igXvjN3wuVE5DEzIe+1ciBjYLE4035BGABDwkxMv3IXaKVeGQctKmCi5pH56Y1AGAJE3e7k25dHGtqN2l7pocoDWbDjgMYJhF84xL1BFQ8bot1Gz9yj/yGfJusJfQa9njiuKa2djRE43fofIMsZWfRA9C9LPs2UNz+uIXgZgfVn1ss14KQ0oUz5s/MwS1dTSL0J0aSDlZKdG0IBNPWk2T8+MTBW3A9+LJ5oUIuAIZ0gpm6bn+4x4ezU8naRHzjH6Bt4yon4QBzuXw/sGQkh/L7ayfziSjlqqpgSyybwysX8KtLVARsffQW1WzW8uEK7K2zk+PWbgDt8qDxLv"



    //   };
    //console.log("vdgfhhg", decryptData(response.CheckAgentCodeJWTResult,key,salt));

    axios.post(url, params, {
      "headers": {

        "content-type": "application/json",

      },
    })
      .then(function (response) {
        console.log("vdgf42253465656hhg", response.data);
        //let decResponse = decryptData("rT/lgzM78o/24AyqFmdOF3/PeVhs6Exj0gXuU6LbWEPyWbe7cbfqZj3YbrmbqV+OQz5deQp4CLj2efcjM/jLyHe2wBSLaS3HVJYT8fj7us/2xOqjJWsDwRwZObUofyUJriGmFXwTtrNolsTW4h4VOWffql3OecJsdELEaSF/I1POKXi2MmEtZKA63glc7MctDg5ApcmpZuKLKKVqxB0YdZ9D6/7/wYDUZJ/MFlLiA23ywwkTdeKnbYeI0kJ0mjFN",'6c0ce6669b01b8e918f786f466be6968e70025c573a42753b7efb13cd89d6e5a','$!rl@$b!')
        //console.log("vdgfhhg",decResponse);

        // this.checkAppInstallStatus();

        var sales = response.data.IsSalesAgent;
        var etoken = response.data.EncodedJWT
        console.log("gafsvfhvb", sales);

        setConfiguration('salesflag', sales)
        setConfiguration('encryptedToken', etoken)

        if (Platform.OS == 'android') {
          NativeModules.HelloWorldModule.ShowMessage(
            etoken,
            'false',
            5000,
          );
        } else if (Platform.OS == 'ios') {
          NativeModules.HelloWorld.ShowMessage('Awesome!its working!', 0.5);
        }

      })

      .catch(function (error) {

        console.log("cvzgvxbhvb", error);

      });


  }

  versionControlService = () => {

    let url = "https://online.bharti-axalife.com/MiscServices/VersionControlRestService/Service1.svc/GetVersionControlDetails"

    let encParams = {
      "request": "bIUNut6Ks+Z1mTyaFx9dI+N9nxOrxQPSNsOkASCTDquWxiWumx6e8gKAn7YrNcikIxHS9Z9LEYjMDOxwHivKFw=="
    };

    //console.log("vdgfhhg", decryptData(response.CheckAgentCodeJWTResult,key,salt));

    axios.post(url, encParams, {
      "headers": {

        "content-type": "application/json",

      },
    })
      .then(function (response) {
        console.log("vdgf42253465656hhg", response);
        //let decResponse = decryptData("rT/lgzM78o/24AyqFmdOF3/PeVhs6Exj0gXuU6LbWEPyWbe7cbfqZj3YbrmbqV+OQz5deQp4CLj2efcjM/jLyHe2wBSLaS3HVJYT8fj7us/2xOqjJWsDwRwZObUofyUJriGmFXwTtrNolsTW4h4VOWffql3OecJsdELEaSF/I1POKXi2MmEtZKA63glc7MctDg5ApcmpZuKLKKVqxB0YdZ9D6/7/wYDUZJ/MFlLiA23ywwkTdeKnbYeI0kJ0mjFN",'6c0ce6669b01b8e918f786f466be6968e70025c573a42753b7efb13cd89d6e5a','$!rl@$b!')
        //console.log("vdgfhhg",decResponse);

      })
      .catch(function (error) {

        console.log("cvzgvxbhvb", error);

      });


  }

  showAlert = () => {
    alert('Comming Soon')
  }

  rederHeader = () => {

    return (
      <View style={[styles.headerView, { elevation: this.state.showVersionPopup ? 0 : 10 }]}>
        <TouchableOpacity
          style={styles.backTouchable}>
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


  closeVersionPopup = () => {
    this.setState({ showVersionPopup: false });
  }

  renderItem = ({ item }) => {

    return (
      <View style={{
        backgroundColor: 'rgba(30,77,155,0.06)',
        borderColor: 'grey',
        borderRadius: 10,
        elevation: 1,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
      }}>

        <View style={{ flex: 2.5, alignItems: 'center' }}>
          <Image style={[{ height: 40, width: 40, margin: 10 }]}
            resizeMode='contain'
            source={item.icon} />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(30,77,155)' }}>{item.appName}</Text>
        </View>
        <View style={{ width: 1, backgroundColor: 'grey', height: '90%' }} />
        <View style={{ flex: 4, alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
          {!item.isInstalled && <ButtonOutline textColor='rgb(30,77,155)' borderColor='green' title='Install' />}
          {item.isInstalled && !item.isLatest && <ButtonOutline textColor='rgb(30,77,155)' borderColor='yellow' title='Update' />}
          {item.isInstalled && item.isLatest && <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(30,77,155)', textAlign: 'center' }}>{'Installed'}</Text>}
          {item.isInstalled && <Text style={{ fontSize: 12, color: 'rgb(30,77,155)', textAlign: 'center' }}>{'Last Updated on ' + item.lastUpdated}</Text>}
        </View>

      </View>
    )

  }

  renderVersionPopup() {

    return (
      <View style={styles.overlayView}>

        <View style={styles.appStatusContainer}>

          <View flexDirection='row'>

            <Text style={styles.appStatuts}>APPS STATUS</Text>
            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              onPress={() => this.closeVersionPopup()}>
              <Image style={[styles.crossButton, { right: 10 }]}
                source={require('../../../assets/close.png')} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.appList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />

        </View>
        {/* 
        <TouchableOpacity
          style={styles.crossContainer}
          onPress={() => this.closePopUp()}>
          <Image resizeMode="contain" style={styles.crossButton}
            source={require('../../../assets/close.png')} />
        </TouchableOpacity>
        <View style={styles.appStatuscontainer}>

          <View style={{ width: '100%', height: '10%', backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.appName, { marginLeft: 10 }]}> M-Sell </Text>
            <TouchableOpacity
              style={styles.btnInstall}
              onPress={() => this.installApp()}>
              <Text style={[styles.installText, { textAlign: 'center' }]}> Install </Text>

            </TouchableOpacity>
          </View>
        </View>
       */}
      </View>
    )

  }

  renderPopup() {
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
                  style={styles.appBackground}
                  onPress={() => this.showAlert()}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/vymo.png')} />
                  <Text style={styles.appName}> VYMO </Text>
                </TouchableOpacity>
                <Text style={styles.appdppescription}> Manage Leads </Text>
              </View>
              <View style={styles.appcontainer1}>
                <TouchableOpacity
                  style={styles.appBackground}
                  onPress={() => this.gotoMSell()}>
                  <Image resizeMode="contain" style={styles.appIcon}
                    source={require('../../../assets/m_shell.png')} />
                  <Text style={styles.appName}> M-Sell </Text>
                </TouchableOpacity>
                <Text style={styles.appdppescription}> Engage with Customers </Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }

  renderComingSoonPopup() {
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

  render() {
    return (

      <SafeAreaView style={styles.background}>
        {this.rederHeader()}

        <View style={styles.imgcontainer}>
          <Image resizeMode="contain" style={styles.imgprofile}
            source={require('../../../assets/arw.png')} />
          <View style={styles.prfltitleContainer}>
            <Text style={styles.headerTitle1}>Hi Sumit Stephen</Text>
            <Text style={styles.headerTitle}>What would you like to do now ?</Text>
          </View>


        </View>

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
  },
  headerTitle1: {
    width: 'auto',
    color: 'rgb(30,77,155)',
    fontSize: 15,
    fontWeight: 'bold'
  },
  appStatuts: {
    flex: 1,
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
    backgroundColor: 'white',
    opacity: 0.95,
    padding: 25
  },

  appStatusContainer: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 15,
    borderColor: 'grey',
    padding: 10
  },

  overlayView1: {
    //flex: 0.8,
    top: wp('56%'),
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgb(234,240,248)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9


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
    backgroundColor: '#ffffff',
    height: wp('10.66%'),
    width: '100%',
    marginTop: '5%',
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  crossButton: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
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
    fontSize: 15,
  },
  appName: {
    color: 'rgb(30,77,155)',
    fontWeight: 'bold',
    fontSize: 15,
    top: 5
  },
  installText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,

  },
  appdppescription: {
    color: 'rgb(30,77,155)',
    fontSize: 16,
    textAlign: 'center',
    top: 5,

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
      height: 0.5,
      width: 0,

    },

    elevation: 5
  },

  btnInstall: {
    width: wp('25%'),
    height: wp('8%'),
    top: 0,
    backgroundColor: 'rgb(30,77,155)',
    justifyContent: 'center',
    alignItems: 'center',
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
  cmgsooncontainer: {
    backgroundColor: 'transparent',
    width: wp('90%'),
    flex: 0.4,
    // borderRadius:10
    justifyContent: 'center',
    alignItems: 'center'

  },
  appStatuscontainer: {
    backgroundColor: 'white',
    width: wp('90%'),
    flex: 0.8,
    // borderRadius:10
    //justifyContent:'center',
    //alignItems:'center'

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
  welcome: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },

});
