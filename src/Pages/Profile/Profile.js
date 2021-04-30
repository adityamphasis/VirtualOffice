import React, { PropTypes } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity,
  ScrollView, ImageBackground, Image, StatusBar, Keyboard, Platform, SafeAreaView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { DrawerActions } from 'react-navigation-drawer';
import axios from 'react-native-axios';
import crashlytics from "@react-native-firebase/crashlytics";

import { apiConfig } from '../../utils/apiConfig';
import { getConfiguration, setConfiguration } from '../../utils/configuration';
import { encryptData, decryptData } from '../../utils/AES';

import { Loader } from '../../../components';


export default class ProfileScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      clickOnApp: false,
      Channel: '--',
      bcode: '',
      Employee: '',
      supervisor: '',
      branch: '',
      region: '',
      zone: '',
      mobile: '',
      email: '',
      name: '',
      designation: ''
    };

  }


  componentDidMount() {
    if (getConfiguration('salesflag'))
      this.getAgentProfile();
    else
      this.getEmployeeProfile();
  }

  componentWillUnmount(){
    crashlytics().log("Profile view unmounted.");
  }

  goBack() {
    this.props.navigation.goBack();
  }

  openDrawerClick() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
    //this.props.navigation.navigate('SideMenu');
  }

  clickApp = () => {
    this.setState({
      clickOnApp: true
    })
  }

  closePopUp = () => {
    this.setState({
      clickOnApp: false
    })
  }

  getEmployeeProfile = async () => {

    this.setState({ isLoading: true });

    const params = {
      'Agent_Code': getConfiguration('Employee'),
      'PartnerKey': 'POIN06EM11'
    }
    
    const URL = apiConfig.EMPLOYEE;
    console.log('URL:' + URL);

    const encryptedParams = await encryptData(JSON.stringify(params));

    console.log('encryptedParams', encryptedParams);

    let encParams = {
      "request": encryptedParams//"wZ41JrpUFxYN657xEboMROidcqi+SuudbDsP9Co2zeTjD6u1YHmdD5IYFReAL4vHAmty0BZVSxyiprqQbcNjZhS0ybG6D1HCTz7tU1CpN/ownifuNlThzFDgG9EHnXcUt5V4F76t4qcoBI6jkyKb37zgt5zRMWg51nECtBXVoYgYV35mYYCPNz8UK+JIjQRdB5trVjZblvfCj1ru4++DxGzr7KF3BY6KVnTAhuObg45O4fjdDQFsAtnG86IG9fMC9MEc+v8bNy1M3al+QmBfmRvYaavleXjbzJNpAS+bVLF0wZgD8SnaqfUFXwJxlgvoy7D7DpscCWonWZMQdKvZO66I/XQXt1fa5rHhfKy38qzki/g8o/GraaRRKjnq6xXxth5KKhG3ZM32PbMEvbYGvhPCSK0ZUb16Y60pdA98eK8qmpSlgm93XvisN/TDojkWRBq9MJKlczwOGocsWY8ih5VPKirjXGUaEEje8GmLKRmQ49OJtQYJUHuujDlblxSMHhHylyaiYUaI4wuhVQPGrqTrbw/2w9wRH/w3SQlcErsXNUOvcMWgPYiQwoQBl7kuhbTdhoEfFY95FNh1n7QQOtViCUIzhorCHKdNLTzbjuNYeiPWFtWl4G17tBz6EwxA"
    };

    axios.post(URL, encParams, {
      "headers": {
        "content-type": "application/json",
      },
    }).then(response => {

      console.log("profile response => ", JSON.stringify(response.data));
      this.parseEmployeeApiData(response.data);

    }).catch(error => {
      console.log("Employee eror", JSON.stringify(error));
      this.setState({ isLoading: false });
      alert('Something went wrong. Please try again after some time.');
    });


  }


  getAgentProfile = async () => {

    this.setState({ isLoading: true });

    const params = {
      'Agent_Code': getConfiguration('Agent'),
      'PartnerKey': 'POIN06EM11'
    }
    
    const URL = apiConfig.AGENT;
    console.log('URL:' + URL);

    const encryptedParams = await encryptData(JSON.stringify(params));

    console.log('encryptedParams', encryptedParams);

    let encParams = {
      "request": encryptedParams//"wZ41JrpUFxYN657xEboMROidcqi+SuudbDsP9Co2zeTjD6u1YHmdD5IYFReAL4vHAmty0BZVSxyiprqQbcNjZhS0ybG6D1HCTz7tU1CpN/ownifuNlThzFDgG9EHnXcUt5V4F76t4qcoBI6jkyKb37zgt5zRMWg51nECtBXVoYgYV35mYYCPNz8UK+JIjQRdB5trVjZblvfCj1ru4++DxGzr7KF3BY6KVnTAhuObg45O4fjdDQFsAtnG86IG9fMC9MEc+v8bNy1M3al+QmBfmRvYaavleXjbzJNpAS+bVLF0wZgD8SnaqfUFXwJxlgvoy7D7DpscCWonWZMQdKvZO66I/XQXt1fa5rHhfKy38qzki/g8o/GraaRRKjnq6xXxth5KKhG3ZM32PbMEvbYGvhPCSK0ZUb16Y60pdA98eK8qmpSlgm93XvisN/TDojkWRBq9MJKlczwOGocsWY8ih5VPKirjXGUaEEje8GmLKRmQ49OJtQYJUHuujDlblxSMHhHylyaiYUaI4wuhVQPGrqTrbw/2w9wRH/w3SQlcErsXNUOvcMWgPYiQwoQBl7kuhbTdhoEfFY95FNh1n7QQOtViCUIzhorCHKdNLTzbjuNYeiPWFtWl4G17tBz6EwxA"
    };

    axios.post(URL, encParams, {
      "headers": {
        "content-type": "application/json",
      }
    }).then(response => {

      console.log("profile response => ", JSON.stringify(response.data));
      this.parseAgentApiData(response.data);

    }).catch(error => {
      console.log("Agent profile error", error);
      this.setState({ isLoading: false });
      alert('Something went wrong. Please try again after some time.');
    });

  }

  parseAgentApiData = async (data) => {

    const result = await decryptData(data.response);

    this.setState({ isLoading: false });

    console.log('agent profile result => ', result);


    this.setState({
      bcode: result.Agent_Code ? result.Agent_Code : 'NA',
      Channel: result.Channel ? result.Channel : 'NA',
      Employee: result.Emp_Code ? result.Emp_Code : 'NA',
      supervisor: result.Supervisor_Name ? result.Supervisor_Name : 'NA',
      branch: result.BranchName ? result.BranchName : 'NA',
      region: result.BranchName ? result.BranchName : 'NA',
      zone: result.BranchName ? result.BranchName : 'NA',
      mobile: result.Tel3 ? result.Tel3 : 'NA',
      email: result.EmailId ? result.EmailId : 'NA',
      name: result.Agent_Name ? result.Agent_Name : 'NA',
      designation: result.Designation ? result.Designation : 'NA'
    })

  }

  parseEmployeeApiData = async (data) => {

    const result = await decryptData(data.response);

    this.setState({ isLoading: false });

    console.log('employee profile result => ', result);

    this.setState({
      bcode: result.Emp_Code ? result.Emp_Code : 'NA',
      Channel: result.Channel ? result.Channel : 'NA',
      Employee: result.Agent_Code ? result.Agent_Code : 'NA',
      supervisor: result.Supervisor_Name ? result.Supervisor_Name : 'NA',
      branch: result.BranchName ? result.BranchName : 'NA',
      region: result.BranchName ? result.BranchName : 'NA',
      zone: result.BranchName ? result.BranchName : 'NA',
      mobile: result.Tel3 ? result.Tel3 : 'NA',
      email: result.EmailId ? result.EmailId : 'NA',
      name: result.Agent_Name ? result.Agent_Name : 'NA',
      designation: result.Designation ? result.Designation : 'NA'
    })

  }

  render() {

    return (
      <View style={styles.background}>
        <SafeAreaView />
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.goBack()}>
            <Image resizeMode="contain" style={styles.leftLogo}
              source={require('../../../assets/logo_rht.png')} />
          </TouchableOpacity>
          <View style={styles.welcomContainer}>
            {/* <Text style={styles.headerTitle}> Welcome to</Text> */}
            {/* <Text style={styles.headerTitle1}> i-service</Text> */}
          </View>
          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.openDrawerClick()}>
            <Image resizeMode="contain" style={styles.rghtLogo}
              source={require('../../../assets/menu.jpeg')} />
          </TouchableOpacity>
        </View>

        <Loader visible={this.state.isLoading} />

        <ScrollView style={{ backgroundColor: 'transparent' }}>

          <View style={styles.imgcontainer}>

            <Image resizeMode="contain" style={styles.imgprofile}
              source={require('../../../assets/prfl_img.jpg')} />
            <View style={styles.prfltitleContainer}>
              <Text style={styles.headerTitle}>{this.state.name}</Text>
              <Text style={styles.headerTitle1}>{this.state.designation} </Text>
            </View>


          </View>

          <View style={styles.cmgcontainer}>
            <View style={styles.rupeeContainer}  >

              <View style={{ width: wp('40%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode="contain" style={styles.stngLogo}
                  source={require('../../../assets/Channel.png')} />

                <Text style={styles.dataText}> Channel </Text>

              </View>
              <View style={{ width: wp('50%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>


                <Text style={[styles.quickLinksText]}>{this.state.Channel} </Text>

              </View>



            </View>
          </View>

          <View style={styles.cmgcontainer}>
            <View style={styles.rupeeContainer}  >

              <View style={{ width: wp('40%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode="contain" style={styles.stngLogo}
                  source={require('../../../assets/Business_Code.png')} />

                <Text style={styles.dataText}> Business Code </Text>

              </View>
              <View style={{ width: wp('50%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>


                <Text style={[styles.quickLinksText]}>{getConfiguration('Agent') == '0' ? 'NA' : getConfiguration('Agent')} </Text>

              </View>



            </View>
          </View>
          <View style={styles.cmgcontainer}>
            <View style={styles.rupeeContainer}  >

              <View style={{ width: wp('40%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode="contain" style={styles.stngLogo}
                  source={require('../../../assets/Employee.png')} />

                <Text style={styles.dataText}>Employee</Text>

              </View>
              <View style={{ width: wp('50%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>


                <Text style={[styles.quickLinksText]}>{getConfiguration('Employee') == '' ? 'NA' : getConfiguration('Employee')}</Text>

              </View>



            </View>
          </View>
          <View style={styles.cmgcontainer}>
            <View style={styles.rupeeContainer}  >

              <View style={{ width: wp('40%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode="contain" style={styles.stngLogo}
                  source={require('../../../assets/Supervisor.png')} />

                <Text style={styles.dataText}> Supervisor </Text>

              </View>
              <View style={{ width: wp('50%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>


                <Text style={[styles.quickLinksText]}>{this.state.supervisor} </Text>

              </View>



            </View>
          </View>
          <View style={styles.cmgcontainer}>
            <View style={styles.rupeeContainer}  >

              <View style={{ width: wp('40%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode="contain" style={styles.stngLogo}
                  source={require('../../../assets/Branch.png')} />

                <Text style={styles.dataText}> Branch </Text>

              </View>
              <View style={{ width: wp('50%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>


                <Text style={[styles.quickLinksText]}>{this.state.branch} </Text>

              </View>



            </View>
          </View>
          <View style={styles.cmgcontainer}>
            <View style={styles.rupeeContainer}  >

              <View style={{ width: wp('40%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode="contain" style={styles.stngLogo}
                  source={require('../../../assets/Region.png')} />

                <Text style={styles.dataText}> Region </Text>

              </View>
              <View style={{ width: wp('50%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>


                <Text style={[styles.quickLinksText]}>{this.state.region} </Text>

              </View>



            </View>
          </View>
          <View style={styles.cmgcontainer}>
            <View style={styles.rupeeContainer}  >

              <View style={{ width: wp('40%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode="contain" style={styles.stngLogo}
                  source={require('../../../assets/Zone.png')} />

                <Text style={styles.dataText}> Zone </Text>

              </View>
              <View style={{ width: wp('50%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>


                <Text style={[styles.quickLinksText]}>{this.state.zone} </Text>

              </View>



            </View>
          </View>
          <View style={styles.cmgcontainer}>
            <View style={styles.rupeeContainer}  >

              <View style={{ width: wp('40%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode="contain" style={styles.stngLogo}
                  source={require('../../../assets/Mobile.png')} />

                <Text style={styles.dataText}> Mobile </Text>

              </View>
              <View style={{ width: wp('50%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>


                <Text style={[styles.quickLinksText]}>{this.state.mobile} </Text>

              </View>



            </View>
          </View>
          <View style={styles.cmgcontainer}>
            <View style={styles.rupeeContainer}  >

              <View style={{ width: wp('40%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode="contain" style={styles.stngLogo}
                  source={require('../../../assets/Email_ID.png')} />

                <Text style={styles.dataText}> Email </Text>

              </View>
              <View style={{ width: wp('50%'), backgroundColor: 'transparent', height: '100%', flexDirection: 'row', alignItems: 'center' }}>


                <Text style={[styles.quickLinksText]}>{this.state.email} </Text>

              </View>



            </View>
          </View>

          <View style={{
            backgroundColor: 'transparent',
            width: wp('95%'),
            height: hp('6%'),
            marginTop: 20,
            flexDirection: 'column',
            marginStart: 10,
            marginEnd: 10,
          }}>

          </View>




        </ScrollView>

      </View>

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
    height: '100%',
    width: '100%',
    // alignItems:'center',
    // justifyContent:'space-between'

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
    marginStart: 20,
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
  prfltitleContainer:
  {
    width: '80%',
    height: 60,
    top: 5,
    marginLeft: '2%',

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
    fontFamily: 'WorkSans-SemiBold'

  },
  headerTitle1: {
    width: 'auto',
    color: 'rgb(30,77,155)',
    fontSize: 15,
    fontFamily: 'WorkSans-Bold'

  },
  quickLinksText: {
    color: 'rgb(30,77,155)',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: '13%',
    //textAlign:'center'
    fontFamily: 'WorkSans-SemiBold'


  },
  dataText: {
    width: 'auto',
    color: 'rgb(30,77,155)',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: '10%',
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
    fontSize: 16,
    alignSelf: 'center',
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
    width: wp('100%'),
    flex: 0.2,
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  cmgcontainer: {
    backgroundColor: 'white',
    width: wp('95%'),
    height: hp('6%'),
    marginTop: 20,
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
    elevation: 5
  },
  popupcontainer: {
    backgroundColor: 'white',
    width: wp('90%'),
    flex: 0.4,
    borderRadius: 10
  },
  imgcontainer: {
    backgroundColor: 'transparent',
    width: wp('100%'),
    flex: 0.2,
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row'
  },
  imgprofile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10

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
