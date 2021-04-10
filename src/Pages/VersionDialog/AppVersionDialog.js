import {
  StyleSheet, Text, View, TouchableOpacity,
  ImageBackground, Image, StatusBar, Keyboard,
  Platform, SafeAreaView, Linking, NativeModules, FlatList, BackHandler, Alert
} from 'react-native';
import React, { PropTypes } from 'react';

import axios from 'react-native-axios';
import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import moment from "moment";

import { getConfiguration, setConfiguration } from '../../utils/configuration';
import { encryptData, decryptData } from '../../utils/AES';
import { setStorage } from '../../utils/authentication';


import { Loader, ButtonOutline } from '../../../components';

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
    icon: require('../../../assets/i-WIN.png'),
    appName: 'i-Win',
    versionCode: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    androidId: 'com.xoxoday.compassuat',
    bundleId: 'com.xoxoday.compassuat',
    iosId: 'compass-xoxo/id1504258298'
  }, {
    icon: require('../../../assets/i-LEARN.png'),
    appName: 'i-Learn',
    isInstalled: false,
    isLatest: false,
    versionCode: 0,
    lastUpdated: 1,
    androidId: 'com.chaptervitamins.bharatiaxa',
    bundleId: 'com.chaptervitamins.bharatiaxa',
    iosId: ''
  }, {
    icon: require('../../../assets/i-LEARN.png'),
    appName: 'i-Learn',
    isInstalled: false,
    isLatest: false,
    versionCode: 0,
    lastUpdated: 1,
    androidId: 'com.chaptervitamins.bhartiaxa',
    bundleId: 'com.chaptervitamins.bhartiaxa',
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


export default class AppVersionDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      appList: []
    };

    this.isCheckedPopup = false;

  }

  componentDidMount() {

    console.log('-----------------------App version componentDidMount------------------')

    this.getData();
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      if (this.isCheckedPopup)
        this.versionControlPopupLogic();
    });


  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  getData = async () => {

    this.setState({ isLoading: true });

    let url = "https://online.bharti-axalife.com/MiscServices/VersionControlRestService/Service1.svc/GetVersionControlDetails"

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

      console.log("version response => ", JSON.stringify(response.data));

      this.parseVersionApiData(response.data);

    }).catch(error => {
      console.log("version error", JSON.stringify(error));
    });


  }

  parseVersionApiData = async (data) => {

    const result = await decryptData(data.response);

    this.setState({ isLoading: false });

    console.log('result => ', result);

    const versionApiData = result.AppDetails ? result.AppDetails : [];

    setConfiguration('appsData', versionApiData);

    this.versionControlPopupLogic();

  }

  versionControlPopupLogic = async () => {

    if (this.state.isLoading)
      return;

    try {

      const versionApiData = getConfiguration('appsData');

      const installedApps = await RNAndroidInstalledApps.getNonSystemApps();

      // installedApps.map(item => {
      //   console.log('installedApps item', item.packageName +" "+item.appName);
      // });

      let tempList = [];

      versionApiData.map(item => {

        let index = installedApps.findIndex(x => x.packageName === item.PackageName);
        let iconIndex = appArray.findIndex(x => x.androidId === item.PackageName);

        // if (index != -1) {
        //   console.log('pack', installedApps[index].packageName);
        // }

        const iObj = {
          icon: iconIndex != -1 ? appArray[iconIndex].icon : '',// require('../../../assets/m_shell.png'),
          appName: item.AppName,
          versionCode: item.MandatoryVersion,
          androidId: item.PackageName,
          bundleId: item.PackageName,
          lastUpdated: index != -1 ? moment(installedApps[index].lastUpdateTime).format("DD/MM/YYYY") : '',
          isInstalled: index != -1 ? true : false,
          isLatest: (index != -1 && item.MandatoryVersion == installedApps[index].versionName + '') ? true : false,
          AppDownloadLink: item.AppDownloadLink ? item.AppDownloadLink : ''
        }

        tempList.push(iObj);

      });

      this.setState({ appList: tempList });

      this.isCheckedPopup = false;

      await setStorage('isDialogShown', 'yes');


    } catch (error) {
      console.log('error', JSON.stringify(error));
    }

  }

  closeVersionPopup = async () => {
    this.props.navigation.goBack();
  }

  onInstallUpdatePress = (item) => {

    console.log('item', JSON.stringify(item));

    if (Platform.OS == 'android') {

      if (item.AppDownloadLink === '') {
        alert('Application details not available.');
        return;
      }

      this.isCheckedPopup = true;
      Linking.openURL(item.AppDownloadLink);

    } else {

      if (item.iosId === '') {
        alert('Application details not available.');
        return;
      }

      this.isCheckedPopup = true;

      Linking.openURL("https://apps.apple.com/us/app/" + item.iosId);
    }

  }

  renderItem = ({ item }) => {

    return (
      <ImageBackground style={{
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

  render = () => {

    return (
      <SafeAreaView style={styles.background}>

        <Loader visible={this.state.isLoading} />

        {this.renderVersionPopup()}

      </SafeAreaView>
    );

  }


}


const styles = StyleSheet.create({

  background: {
    flex: 1,
    // backgroundColor: 'transparent',
    backgroundColor: 'rgba(52, 52, 52, 0.2)'
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
    // backgroundColor: '#f5f5f5',
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
  appStatuts: {
    // flex: 1,
    margin: 10,
    color: 'rgb(30,77,155)',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center'
  }

});
