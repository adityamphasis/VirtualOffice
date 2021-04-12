import React, { PropTypes } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  ImageBackground, Image, StatusBar, Keyboard, AppState,
  Platform, SafeAreaView, Linking, NativeModules, FlatList, BackHandler, Alert
} from 'react-native';

import axios from 'react-native-axios';
import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import moment from "moment";
import networkSpeed from 'react-native-network-speed';

import { getConfiguration, setConfiguration } from '../../utils/configuration';
import { encryptData, decryptData } from '../../utils/AES';
import { setStorage } from '../../utils/authentication';
import { getAvailableFreeSpace } from '../../utils/calculation';

import { Loader, ButtonOutline } from '../../../components';

const appArray = [
  {
    icon: require('../../../assets/vymo.png'),
    appName: 'VYMO',
    version: 0,
    mVersion: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    packageName: 'com.getvymo.android',
    iosId: ''
  }, {
    icon: require('../../../assets/m_shell.png'),
    appName: 'MSell',
    isInstalled: false,
    isLatest: false,
    version: 0,
    mVersion: 0,
    lastUpdated: 1,
    packageName: 'com.enparadigm.bharthiaxa',
    iosId: 'm-sell/id1518565564'
  }, {
    icon: require('../../../assets/i-WIN.png'),
    appName: 'i-Win',
    version: 0,
    mVersion: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    packageName: 'com.xoxoday.compass',
    iosId: 'compass-xoxo/id1504258298'
  }, {
    icon: require('../../../assets/i-WIN.png'),
    appName: 'i-Win',
    version: 0,
    mVersion: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    packageName: 'com.xoxoday.compassuat',
    iosId: 'compass-xoxo/id1504258298'
  }, {
    icon: require('../../../assets/i-LEARN.png'),
    appName: 'i-Learn',
    isInstalled: false,
    isLatest: false,
    version: 0,
    mVersion: 0,
    lastUpdated: 1,
    packageName: 'com.chaptervitamins.bharatiaxa',
    iosId: ''
  }, {
    icon: require('../../../assets/i-LEARN.png'),
    appName: 'i-Learn',
    isInstalled: false,
    isLatest: false,
    version: 0,
    mVersion: 0,
    lastUpdated: 1,
    packageName: 'com.chaptervitamins.bhartiaxa',
    iosId: ''
  }, {
    icon: require('../../../assets/i-EARN.png'),
    appName: 'i-Earn',
    isInstalled: false,
    isLatest: false,
    version: 0,
    mVersion: 0,
    lastUpdated: 1,
    packageName: 'com.bhartiaxa.mlife',
    iosId: 'm-life/id1550263609'
  }, {
    icon: require('../../../assets/i-RECRUIT.png'),
    appName: 'i-Recruit',
    version: 0,
    mVersion: 0,
    isInstalled: false,
    isLatest: false,
    lastUpdated: 1,
    packageName: 'com.bhartiaxa.recruit',
    iosId: ''
  }
]


export default class AppVersionDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      appList: [],
      availableSpace: 'NA',
      networkSpeed: 'NA'
    };
    this.isCheckedPopup = false;
    this.verUpdated = false;
  }

  componentDidMount = async () => {

    console.log('-----------------------App version componentDidMount------------------')

    // let freeSpace = await DeviceInfo.getFreeDiskStorage();

    const sizeIn = await getAvailableFreeSpace();
    // const nSpeed = await getNetworkSpeed();

    this.setState({ availableSpace: sizeIn });

    this.getData();
    // this.focusListener = this.props.navigation.addListener('didFocus', () => {
    //   console.log('didFocus');
    //   if (this.isCheckedPopup)
    //     this.versionControlPopupLogic();
    // });

    AppState.addEventListener("change", this._handleAppStateChange);

    networkSpeed.startListenNetworkSpeed(({ downLoadSpeed, downLoadSpeedCurrent, upLoadSpeed, upLoadSpeedCurrent }) => {
      console.log(downLoadSpeed + 'kb/s') // download speed for the entire device 整个设备的下载速度
      // console.log(downLoadSpeedCurrent + 'kb/s') // download speed for the current app 当前app的下载速度(currently can only be used on Android)
      // console.log(upLoadSpeed + 'kb/s') // upload speed for the entire device 整个设备的上传速度
      // console.log(upLoadSpeedCurrent + 'kb/s') // upload speed for the current app 当前app的上传速度(currently can only be used on Android)

      if (!this.state.isLoading) {
        this.setState({ networkSpeed: downLoadSpeed + 'kb/s' });
      }

    });

  }

  _handleAppStateChange = nextAppState => {
    console.log("App has come to the foreground!" + nextAppState);
    if (nextAppState === 'active')
      this.versionControlPopupLogic();
  };

  componentWillUnmount() {
    // this.focusListener.remove();
    networkSpeed.stopListenNetworkSpeed();
    AppState.removeEventListener("change", this._handleAppStateChange);
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

    console.log('versionControlPopupLogic');

    if (this.state.isLoading)
      return;

    try {

      const versionApiData = getConfiguration('appsData');

      const installedApps = await RNAndroidInstalledApps.getNonSystemApps();

      installedApps.map(item => {
        console.log('installedApps item', JSON.stringify(item.packageName));
      });

      let tempList = [];

      this.verUpdated = false;

      versionApiData.map(item => {

        let index = installedApps.findIndex(x => x.packageName === item.PackageName);
        let iconIndex = appArray.findIndex(x => x.packageName === item.PackageName);

        const iObj = {
          icon: iconIndex != -1 ? appArray[iconIndex].icon : '',// require('../../../assets/m_shell.png'),
          appName: item.AppName,
          version: index != -1 ? installedApps[index].versionName : 0,
          mVersion: item.MandatoryVersion,
          packageName: item.PackageName,
          iosId: item.iosId ? item.iosId : '',
          lastUpdated: index != -1 ? moment(installedApps[index].lastUpdateTime).format("DD/MM/YYYY") : '',
          isInstalled: index != -1 ? true : false,
          isLatest: (index != -1 && item.MandatoryVersion == installedApps[index].versionName + '') ? true : false,
          updateRequired: index == -1 ? false : this.checkUpdateRequired(installedApps[index].versionName, item.MandatoryVersion), //: false,
          AppDownloadLink: item.AppDownloadLink ? item.AppDownloadLink : ''
        }

        tempList.push(iObj);

        if (iObj.updateRequired)
          this.verUpdated = iObj.updateRequired;


      });

      const sizeIn = await getAvailableFreeSpace();

      this.setState({ appList: tempList, availableSpace: sizeIn });

      this.isCheckedPopup = false;

      await setStorage('isDialogShown', 'yes');


    } catch (error) {
      console.log('error', JSON.stringify(error));
    }

  }

  checkUpdateRequired = (currentVerion, mandatoryVersion) => {

    currentVerion = currentVerion.split(".").join('');
    mandatoryVersion = mandatoryVersion.split(".").join('');

    return parseInt(currentVerion) < parseInt(mandatoryVersion);

  }

  closeVersionPopup = async () => {

    if (this.verUpdated) {
      alert('You need to install/update listed app`s to madantory version');
      return;
    }

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
        borderColor: item.updateRequired ? 'red' : '#a4a4a4',
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
          {item.updateRequired && <Text style={{ fontSize: 10, color: 'red', textAlign: 'center' }}>{'Update Required'}</Text>}
          {!item.isInstalled && <ButtonOutline onPress={() => this.onInstallUpdatePress(item)} textColor='rgb(30,77,155)' borderColor='green' title='Install' />}
          {item.isInstalled && !item.isLatest && <ButtonOutline onPress={() => this.onInstallUpdatePress(item)} textColor='rgb(30,77,155)' borderColor='yellow' title='Update' />}
          {item.isInstalled && item.isLatest && <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(30,77,155)', textAlign: 'center' }}>{'Installed'}</Text>}
          {item.isInstalled && <Text style={{ fontSize: 12, color: 'rgb(30,77,155)', textAlign: 'center' }}>{'Last Updated on ' + item.lastUpdated}</Text>}
        </View>

      </ImageBackground>
    )

  }

  renderDevideDetailsPopup = () => {
    return (
      <View style={styles.background}>
        <View style={[styles.overlayAppView]}>
          <View style={styles.deviceInfoContainer}>
            <Text style={styles.appStatuts}>Details</Text>

            <View>
              <Text style={styles.appStatuts}>Available Space: { }</Text>
              <Text style={styles.appStatuts}>Network Speed: { }</Text>
            </View>

          </View>
        </View>
      </View>
    )
  }

  renderVersionPopup = () => {

    return (
      <View style={[styles.overlayAppView, { alignItems: 'stretch' }]}>

        <View style={styles.appStatusContainer}>

          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', height: '9%', justifyContent: 'space-between' }}>

            <Text style={styles.appStatuts}>APPS STATUS</Text>
            <TouchableOpacity
              style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => this.closeVersionPopup()}>
              <Image style={{ width: 25, height: 25 }}
                source={require('../../../assets/close.png')} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
            <Text style={styles.infoText}>Available Space: {this.state.availableSpace}</Text>
            <Text style={styles.infoText}>Network Speed: {this.state.networkSpeed}</Text>
          </View>

          <Text style={{ fontSize: 12, margin: 10, textAlign: 'center' }}>{'Note: Highlighted app`s needs to be update'}</Text>

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
        {/* {this.renderDevideDetailsPopup()} */}

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
  deviceInfoContainer: {
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 15,
    width: '80%',
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
    alignSelf: 'center',
    fontFamily: 'WorkSans-Medium'
  },
  infoText: {
    color: 'rgb(30,77,155)',
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  }

});
