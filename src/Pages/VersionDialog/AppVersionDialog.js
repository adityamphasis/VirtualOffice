import {
  StyleSheet, Text, View, TouchableOpacity,
  ImageBackground, Image, StatusBar, Keyboard, AppState,
  Platform, SafeAreaView, Linking, NativeModules, FlatList, BackHandler, Alert
} from 'react-native';
import React, { PropTypes } from 'react';

import axios from 'react-native-axios';
import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import moment from "moment";
// import networkSpeed from 'react-native-network-speed';
import RNBackgroundDownloader from 'react-native-background-downloader';
import { measureConnectionSpeed } from 'react-native-network-bandwith-speed';

import RNFetchBlob from 'rn-fetch-blob';
const android = RNFetchBlob.android;

import { getConfiguration, setConfiguration, unsetConfiguration } from '../../utils/configuration';
import { encryptData, decryptData } from '../../utils/AES';
import { setStorage, getStorage } from '../../utils/authentication';
import { getAvailableFreeSpace, isSuficientSpace } from '../../utils/calculation';
import { requestStoragePermission } from '../../utils/permissionsUtil';

import { Loader, ButtonOutline, InstallItem } from '../../../components';
import appArray from './appArray';

export default class AppVersionDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      appList: [],
      availableSpace: 'checking',
      isSuficient: false,
      networkSpeed: 'checking',
      networkState: '',
      started: false,
      appName: '',
      dProgress: '',
      isDownloaded: false
    };

    this.verUpdated = false;
    this.downloadIndex = -1;
  }

  componentDidMount = async () => {

    console.log('-----------------------App version componentDidMount------------------')

    setConfiguration('appVersion', 'yes');

    AppState.addEventListener("change", this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    const isDownloaded = await getStorage('isDownloaded');
    if (isDownloaded) {
      this.setState({ isDownloaded: true });
    }

    this.setSize();
    this.setNetworkSpeed();

    if (Platform.OS === 'android')
      this.requestAccessPermission();
    else
      this.getData();

  }

  componentWillUnmount() {
    unsetConfiguration('appVersion');
    AppState.removeEventListener("change", this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  _handleAppStateChange = nextAppState => {
    console.log("App has come to the foreground!" + nextAppState);
    if (nextAppState === 'active')
      this.versionControlPopupLogic();
  };

  handleBackPress = () => {
    console.log('handleBackPress');
    this.closeVersionPopup();
  }

  setSize = async () => {

    const sizeIn = await getAvailableFreeSpace();
    const isSuficient = await isSuficientSpace();

    this.setState({ availableSpace: sizeIn, isSuficient: isSuficient });

  }

  setNetworkSpeed = async () => {

    try {
      const networkResult = await measureConnectionSpeed();
      console.log(networkResult); // Network bandwidth speed 

      let netQuality = '';

      if (networkResult.speed < 1.75)
        netQuality = 'poor.';
      else if (networkResult.speed < 3)
        netQuality = 'average.';
      else
        netQuality = 'good.';

      this.setState({ networkSpeed: (networkResult.speed).toFixed(2) + networkResult.metric, networkState: netQuality });

    } catch (err) {
      console.log(err);
    }

  }

  checkForAlreadyDownloadingTask = async () => {

    console.log('checkForAlreadyDownloadingTask');

    let lostTasks = await RNBackgroundDownloader.checkForExistingDownloads();
    for (let task of lostTasks) {
      console.log(`Task ${task.id} was found!`);

      const foundIndex = this.state.appList.findIndex(x => x.packageName === task.id);
      if (foundIndex == -1) {
        return;
      }

      this.downloadIndex = foundIndex;
      const tempList = this.state.appList;
      tempList[this.downloadIndex].isFetching = true;
      this.setState({ appList: tempList, started: true, appName: tempList[this.downloadIndex].appName + ' Processing.. ' });

      this.task = task;
      this.task.progress((percent) => {
        console.log(`Downloaded: ${percent * 100}%`);
        this.setState({ dProgress: (percent.toFixed(2) * 100).toFixed(2) + '%' });
      }).done(() => {
        console.log('Downlaod is done!' + task.id);

        tempList[this.downloadIndex].isFetching = false;
        tempList[this.downloadIndex].isExists = true;
        this.setState({ appList: tempList, appName: 'Checking..', dProgress: '' });
        this.downloadIndex = this.downloadIndex + 1;
        this.onSyncAll();

      }).error((error) => {
        console.log('Download canceled due to error: ', error);
        tempList[this.downloadIndex].isFetching = false;
        this.setState({ appList: tempList, appName: 'Checking..', dProgress: '' });
        this.downloadIndex = this.downloadIndex + 1;
        this.onSyncAll();
      });

      return;
    }

  }

  getData = async () => {

    this.setState({ isLoading: true });

    let url = "https://online.bharti-axalife.com/MiscServices/VersionControlRestServiceUAT/Service1.svc/GetVersionControlDetails"

    // let url = "https://online.bharti-axalife.com/MiscServices/VersionControlRestService/Service1.svc/GetVersionControlDetails"

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
      this.setState({ isLoading: false });
      alert('Something went wrong. Please try again after some time.');
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

  requestAccessPermission = async () => {

    let canInstall = await requestStoragePermission();
    if (canInstall) {
      this.getData();
      return;
    }

    this.requestAccessPermission();
  }

  versionControlPopupLogic = async () => {

    console.log('versionControlPopupLogic');

    if (this.state.isLoading)
      return;

    // this.setState({ isLoading: true });

    try {

      const versionApiData = getConfiguration('appsData');

      const installedApps = await RNAndroidInstalledApps.getNonSystemApps();

      let tempList = [];

      this.verUpdated = false;

      versionApiData.map(async (item, index) => {

        console.log('item=>', JSON.stringify(item));

        const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/' + item.AppName + '_' + item.MandatoryVersion + '.apk';

        const isExists = await RNFetchBlob.fs.exists(filePath);
        console.log(filePath, isExists);

        let foundIndex = installedApps.findIndex(x => x.packageName === item.PackageName);
        let iconIndex = appArray.findIndex(x => x.packageName === item.PackageName);

        const isFetching = index === this.downloadIndex ? true : false;

        console.log('isFetching', item.AppName + ' ' + isFetching);

        const iObj = {
          icon: iconIndex != -1 ? appArray[iconIndex].icon : '',// require('../../../assets/m_shell.png'),
          appName: item.AppName,
          version: foundIndex != -1 ? installedApps[foundIndex].versionName : 0,
          mVersion: item.MandatoryVersion,
          packageName: item.PackageName,
          iosId: item.iosId ? item.iosId : '',
          lastUpdated: foundIndex != -1 ? moment(installedApps[foundIndex].lastUpdateTime).format("DD/MM/YYYY") : '',
          isInstalled: foundIndex != -1 ? true : false,
          isFetching: isFetching,
          isExists: isExists,
          isLatest: (foundIndex != -1 && item.MandatoryVersion == installedApps[foundIndex].versionName + '') ? true : false,
          updateRequired: foundIndex == -1 ? false : this.checkUpdateRequired(installedApps[foundIndex].versionName, item.MandatoryVersion), //: false,
          AppDownloadLink: item.AppDownloadLink ? item.AppDownloadLink : ''
        }

        tempList.push(iObj);

        if (iObj.updateRequired)
          this.verUpdated = iObj.updateRequired;

      });

      this.setSize();

      if (this.state.appList.length === 0) {
        this.setState({ appList: tempList }, this.checkForAlreadyDownloadingTask);
        return;
      }

      this.setState({ appList: tempList });

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

    if (this.verUpdated || this.state.started || !this.state.isDownloaded) {
      alert('You need to install/update listed apps to madantory version.');
      return;
    }

    this.props.navigation.goBack();
  }

  onSyncAll = async () => {

    if (this.downloadIndex >= this.state.appList.length) {
      this.onStop();
      return;
    }

    const item = this.state.appList[this.downloadIndex];

    console.log('item:', JSON.stringify(item));

    if (item.isInstalled) {
      this.downloadIndex = this.downloadIndex + 1;
      this.onSyncAll();
      return;
    }

    if (item.isExists || item.AppDownloadLink === '' || item.AppDownloadLink.includes('https://play.google.com')) {
      this.downloadIndex = this.downloadIndex + 1;
      this.onSyncAll();
      return;
    }


    if (!this.state.started)
      this.setState({ started: true, appName: item.appName });

    const apkURL = item.AppDownloadLink;
    // const filePath = `${RNBackgroundDownloader.directories.documents}/${item.appName}.apk`;
    const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/' + item.appName + '_' + item.mVersion + '.apk';

    const config = {
      id: item.packageName,
      url: apkURL,
      destination: filePath
    }

    this.task = RNBackgroundDownloader
      .download(config)
      .begin((expectedBytes) => {
        console.log(`Going to download ${expectedBytes} bytes!`);

        const tempList = this.state.appList;
        tempList[this.downloadIndex].isFetching = true;
        this.setState({ appList: tempList, appName: item.appName + ' Processing.. ' });

      }).progress((percent) => {
        console.log(`Downloaded: ${item.appName}${percent * 100}%`);
        this.setState({ dProgress: (percent.toFixed(2) * 100).toFixed(2) + '%' });
      }).done(() => {
        console.log('Download is done!', item.appName);

        const tempList = this.state.appList;
        tempList[this.downloadIndex].isFetching = false;
        tempList[this.downloadIndex].isExists = true;
        this.setState({ appList: tempList, appName: 'Checking...', dProgress: '' });

        this.downloadIndex = this.downloadIndex + 1;
        this.onSyncAll();

      }).error((error) => {
        console.log('Download canceled due to error: ', error);

        const tempList = this.state.appList;
        tempList[this.downloadIndex].isFetching = false;
        this.setState({ appList: tempList });

        this.downloadIndex = this.downloadIndex + 1;
        this.onSyncAll();

      });

  }

  onStop = async () => {

    const tempList = [];
    this.state.appList.map(item => {
      item.isFetching = false;
      tempList.push(item);
    });

    if (this.task)
      this.task.stop();

    await setStorage('isDownloaded', 'yes');

    this.setState({ started: false, appList: tempList, appName: 'Completed', dProgress: '' });

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

          {this.state.isSuficient && !this.state.isDownloaded && <View alignItems={'center'}>
            <ButtonOutline
              style={{ alignSelf: 'center' }}
              width={250}
              onPress={() => {
                if (this.state.started || this.state.downloadIndex >= this.state.appList.length) {
                  console.log('Already in progress');
                  return;
                }
                if (this.downloadIndex === -1)
                  this.downloadIndex = this.downloadIndex + 1;
                this.onSyncAll();
              }}
              textColor='rgb(30,77,155)'
              borderColor='rgb(30,77,155)'
              title={(!this.state.started && this.downloadIndex === -1) ?
                'Download All' : this.state.started ?
                  this.state.appName + ' ' + this.state.dProgress : 'Completed'} />
          </View>
          }

          <View style={{ padding: 5, backgroundColor: 'rgba(0,0,0,0.03)' }}>
            {this.state.isSuficient ? <Text style={styles.infoText}>
              * Recommended space 200 MB, you have sufficient space available {'(' + this.state.availableSpace + ').'}</Text> :
              <Text style={styles.infoText}>
                * Available space is less than the recommended 200 MB, please continue with manual sync option.</Text>}
            <Text style={styles.infoText}> * Your current network speed ({this.state.networkSpeed}) is {this.state.networkState}</Text>
          </View>

          <View style={{ padding: 5 }}>
            <Text style={styles.errorText}> # Download all applications will take time.</Text>
            <Text style={styles.errorText}> # Recommended to have a good internet speed.</Text>
            <Text style={styles.errorText}> # Please do not terminate the process in between.</Text>
          </View>

          {/* <Text style={{ fontSize: 12, margin: 10, textAlign: 'center' }}>{'Note: Highlighted app`s needs to be update'}</Text> */}

          <FlatList
            data={this.state.appList}
            renderItem={({ item }) => <InstallItem item={item} />}
            keyExtractor={(item, index) => index.toString()} />

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
    fontSize: 12,
    fontFamily: 'WorkSans-Medium',
    padding: 2
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    fontFamily: 'WorkSans-Regular',
    padding: 1,
  }

});
