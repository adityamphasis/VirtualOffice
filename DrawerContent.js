import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Text, View, StyleSheet, Image, TouchableOpacity,
  ScrollView, Linking, NativeModules, Platform, Alert
} from 'react-native';
import axios from 'react-native-axios';
import { getConfiguration, setConfiguration, unsetConfiguration } from './src/utils/configuration';
import { clearStorage } from './src/utils/authentication';

import { encryptData, decryptData } from './src/utils/AES';

class DrawerContent extends Component {

  constructor(props) {
    super(props)
  }

  navigateToScreen = (route) => (
    () => {
      this.props.navigation.closeDrawer();
      this.props.navigation.navigate(route);
    })

  askForPopup = () => {

    this.props.navigation.closeDrawer();

    Alert.alert(
      'Logout!',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.logout() },
      ]
    );


  }

  navigateToSupport = () =>
  {
    setConfiguration('isSupport',true)
    this.navigateToScreen('DashboardScreen')
  }

  logout = async () => {

    this.LogoutApi();
   
    unsetConfiguration('token');
    unsetConfiguration('salesflag');
    unsetConfiguration('encryptedToken');
    unsetConfiguration('Agent');
    unsetConfiguration('Employee');
    unsetConfiguration('AgentName');
    unsetConfiguration('MobileNumber');

    await clearStorage();

    if (Platform.OS == 'android')
      NativeModules.HelloWorldModule.ShowMessage('', 'false', 5000);
    else if (Platform.OS == 'ios')
      NativeModules.HelloWorld.ShowMessage('Awesome!its working!', 0.5);

    this.props.navigation.navigate('SplashScreen');

    return;

  }

  LogoutApi = async () => {

    console.log('ApiWin');

    let url = "https://online.bharti-axalife.com/MiscServices/iwin-uat-web/api/compass-sso-wrapper/logout"

    //let url = "https://online.bharti-axalife.com/MiscServices/iwin-uat-web/api/compass-sso-wrapper/logout"

    let params = {
      'jwtToken': getConfiguration('encryptedToken'),
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

      console.log("logout encrypted response => ", JSON.stringify(response.data));
      // this.parseLogoutApiData(response.data);

    }).catch(error => {
      console.log("cvzgvxbhvb", error);
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#d3d3d3', alignItems: 'center', justifyContent: 'center' }}>

          <View style={{
            height: 'auto', overflow: "hidden",
            width: '100%', marginTop: '12%', backgroundColor: 'transparent',
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
          }}>

            <View style={{
              height: 70, overflow: "hidden",
              width: 70, borderWidth: 2, borderColor: 'transparent',
              borderRadius: 35, backgroundColor: 'transparent'
            }}>

              <Image resizeMode="cover" style={{ position: 'absolute', width: '100%', height: '100%' }}
                source={require('./assets/profile_img2.jpg')} />

            </View>

            <View style={{
              height: 'auto', alignItems: 'center',
              justifyContent: 'center', marginHorizontal: 10, overflow: "hidden",
              backgroundColor: 'transparent',
              marginTop: '5%'
            }}>
              <Text style={{
                color: 'rgb(30,77,155)', textAlign: 'center', fontSize: 16, height: 20,
              }}>{getConfiguration('AgentName', '')}</Text>
              <Text style={{
                color: 'rgb(30,77,155)', textAlign: 'center', fontSize: 16, height: 20,
              }}>{getConfiguration('salesflag') ? getConfiguration('Agent') : getConfiguration('Employee')}</Text>
            </View>

          </View>

        </View>
        <View style={{ width: '100%', height: 1, backgroundColor: 'gray', marginTop: '10%' }} />

        <View style={{ width: '100%', height: '100%', backgroundColor: '#d3d3d3' }}>

          <TouchableOpacity style={styles.tile} onPress={this.navigateToScreen('DashboardScreen')} >
            <Image resizeMode="contain" style={styles.tileIcon}
              source={require('./assets/home.png')} />
            <Text style={styles.tileTitle}> Home </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.tile} onPress={this.navigateToScreen('ProfileScreen')} >
            <Image resizeMode="contain" style={styles.tileIcon}
              source={require('./assets/profile.png')} />
            <Text style={styles.tileTitle}> Profile </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.tile} onPress={this.navigateToScreen('AppVersionDialog')} >
            <Image resizeMode="contain" style={styles.tileIcon}
              source={require('./assets/Zone.png')} />
            <Text style={styles.tileTitle}> Version Status </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.tile} onPress={this.navigateToScreen('Support')}>
            <Image resizeMode="contain" style={styles.tileIcon}
              source={require('./assets/support.png')} />
            <Text style={styles.tileTitle}> Support </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

<TouchableOpacity style={styles.tile} onPress={this.navigateToScreen('Help')}>
  <Image resizeMode="contain" style={styles.tileIcon}
    source={require('./assets/support.png')} />
  <Text style={styles.tileTitle}> Support </Text>
</TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.tile} onPress={() => this.askForPopup()} >
            <Image resizeMode="contain" style={styles.tileIcon}
              source={require('./assets/logout.png')} />
            <Text style={styles.tileTitle}> Logout </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.bottomView}>
            <Image resizeMode="cover" style={styles.bottomImage}
              source={require('./assets/mnubgnw.jpg')} />
          </View>

        </View>

      </View>
    )
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3'
  },
  headerContainer: {
    height: 150,
  },
  headerText: {
    color: '#fff8f8',
  },
  screenContainer: {
    height: '50%',
    paddingTop: 0,
    backgroundColor: 'green'
    //  marginBottom: 180

  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20
  },
  divider:
  {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    //marginTop:'5%'
  },
  bottomView:
  {
    height: '100%',
    overflow: "hidden",
    width: '100%',
    backgroundColor: 'transparent',
    bottom: 0,
  },
  bottomImage:
  {
    position: 'absolute',
    width: '100%',
    height: '30%',
  },
  tile: {
    height: '9%',
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tileIcon: {
    width: 22,
    height: 22,
    // marginTop: 10,
    marginLeft: 20
  },
  tileTitle: {
    // marginTop: 9,
    fontSize: 17,

    color: 'rgb(30,77,155)',
    marginLeft: 20
  },
  tileArrow: {
    position: 'absolute',
    width: 15,
    height: 15,
    top: 15,
    right: 18
  }

});

export default DrawerContent;
