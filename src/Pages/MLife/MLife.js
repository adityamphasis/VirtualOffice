import {StyleSheet, Text,View, TouchableOpacity,ImageBackground, Image,StatusBar,Keyboard,Platform, SafeAreaView} from 'react-native';
import React, { PropTypes } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { DrawerActions } from 'react-navigation-drawer';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
 
 import { Page, Button, ButtonContainer, Form, FormLabel, FormValue, Heading } from '../../../components';
import { ScrollView } from 'react-native-gesture-handler';




  


export default class MLife extends React.Component  {
       constructor(props) {
      super(props);
      this.state = {
        clickOnApp:false,
      
      };

      const { navigation } = props;


}


  componentDidMount() {
   

 }

  componentWillUnmount() {

    
   
}

//  componentWillMount(){
 
//   }

  openDrawerClick() {
    this.props.navigation.navigate('SideMenu');
  }

  clickiLearn = () =>
  {
    IntentLauncher.startAppByPackageName('com.chaptervitamins.bharatiaxa')
  .then((result) => {
    console.log('startAppByPackageName started');
  })
  .catch((error) => console.warn('startAppByPackageName: could not open', error));
  }

  clickiearn = () =>
  {

    IntentLauncher.startAppByPackageName('com.bhartiaxa.mlife')
    .then((result) => {
      console.log('startAppByPackageName started');
    })
    .catch((error) => console.warn('startAppByPackageName: could not open', error));

  }

  gotoRecruit()
  {
    IntentLauncher.startAppByPackageName('com.bhartiaxa.mlife')
    .then((result) => {
      console.log('startAppByPackageName started');
    })
    .catch((error) => console.warn('startAppByPackageName: could not open', error));
  }



  clickApp = () => 
  {
    this.setState({
      clickOnApp:true
    })
  }
 
  closePopUp = () =>
{
  this.setState({
    clickOnApp:false
  })
}
 
showAlert = () =>
{
  alert('Comming Soon')
}

gotoService = () =>
  {
   
      this.props.navigation.navigate('MCustomer',{screen:'service'})
    


  }
 
  render() {
      return (

        <SafeAreaView style={styles.background}>
          <View style={styles.headerView}>
        <TouchableOpacity
           style={styles.backTouchable}
           onPress={() => this.clickApp()}>
        <Image resizeMode="contain" style={styles.leftLogo}
            source = {require('../../../assets/logo_rht.png')}/>
             <Text style={[styles.headerTitle1,{marginLeft:5,color:'black'}]}>M-Life</Text>
        </TouchableOpacity>
       
        <View style={styles.welcomContainer}>
        {/* <Text style={styles.headerTitle}> Welcome to</Text> */}
        {/* <Text style={styles.headerTitle1}>M-Life</Text> */}
        </View>
        <TouchableOpacity
           style={styles.backTouchable}
           onPress={() => this.openDrawerClick()}>
              
        <Image resizeMode="contain" style={styles.rghtLogo}
             source = {require('../../../assets/menu.jpeg')}/>
        </TouchableOpacity>
        
   </View>

   <ScrollView style={styles.mainContainer}>
    
  
    <View style={styles.imgcontainer}>
   
      
        {/* <Image resizeMode="contain" style={styles.imgprofile}
            source = {require('../../../assets/prfl_img.jpg')}/> */}
             {/* <Text style={styles.appName}> Welcome Test </Text> */}
             {/* <Text style={styles.appName}> Designation, Team </Text> */}
        
        
      </View>
     
      <View style={styles.container}>
    <TouchableOpacity
           style={styles.appBackground}
           onPress={() => this.gotoRecruit()}>
             <View style={styles.appiconView}>
               <Image resizeMode="contain" style={styles.appIcon}
            source = {require('../../../assets/i-RECRUIT.png')}/>
       </View>
            <Text style={styles.quickLinksText}> i-RECRUIT </Text>
            <Text style={styles.appdppescription}>For advisor prospecting and onboarding</Text>
        </TouchableOpacity>
        <TouchableOpacity
           style={styles.appBackground}
           onPress={() => this.clickiLearn()}>
             <View style={styles.appiconView}>
               <Image resizeMode="contain" style={styles.appIcon}
            source = {require('../../../assets/i-LEARN.png')}/>
       </View>
            <Text style={styles.quickLinksText}> i-LEARN </Text>
            <Text style={styles.appdppescription}> For learning and Development </Text>
        </TouchableOpacity>
       
        
      </View>

      <View style={styles.container}>
    <TouchableOpacity
           style={styles.appBackground}
           onPress={() => this.clickiearn()}>
             <View style={styles.appiconView}>
               <Image resizeMode="contain" style={styles.appIcon}
            source = {require('../../../assets/i-EARN.png')}/>
       </View>
            <Text style={styles.quickLinksText}> i-EARN </Text>
            <Text style={styles.appdppescription}> For income and career planning</Text>
        </TouchableOpacity>
        <TouchableOpacity
           style={styles.appBackground}
           onPress={() => this.showAlert()}>
             <View style={styles.appiconView}>
               <Image resizeMode="contain" style={styles.appIcon}
            source = {require('../../../assets/i-WIN.png')}/>
       </View>
            <Text style={styles.quickLinksText}> i-WIN </Text>
            <Text style={styles.appdppescription}> For reward and recognition </Text>
        </TouchableOpacity>
       
      </View>
      

      <View style={styles.container1}>
    <TouchableOpacity
           style={styles.appBackground}
           onPress={() => this.gotoService()}>
             <View style={styles.appiconView}>
               <Image resizeMode="contain" style={styles.appIcon}
            source = {require('../../../assets/i-SERVICE.png')}/>
       </View>
            <Text style={styles.quickLinksText}> i-SERVICE </Text>
            <Text style={styles.appdppescription}> For self and customer service </Text>
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
  headerView:{
    flexDirection:'row',
    height: '8%',
    width: '100%',
    backgroundColor:'white',
    justifyContent: 'space-between',
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
    height: 0.5,
    width: 0,
    },
    elevation:10,
  },
  mainContainer:{
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom:0,
  //marginBottom:10,
    position:'absolute',
    backgroundColor: '#f5f5f5',
   // content: 'center',
   // alignItems:'center',
    
    
  },
  rupeeContainer:{
    flexDirection:'row',
    backgroundColor: 'transparent',
    height:'50%',
    width: '50%',
   
    alignItems:'center',
    justifyContent:'space-between'

  },
  txttab:{
    fontSize: wp('4.8%'),
    fontWeight:'bold',
    color: 'rgb(30,77,155)'
  },
  tabViewBG:{
    flexDirection: 'row',
    marginHorizontal: 0,
    backgroundColor: '#ffffff',
    height:wp('10.66%'),
    width: '100%'
   },
    tab1BG:{
     backgroundColor: 'transparent',
     height:'100%',
     width: '25%',
     justifyContent: 'center',
     alignItems: 'center'
   },
   tab2BG:{
     flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
     backgroundColor: 'transparent',
     height:'100%',
     width: '25%'
   },
   tab3BG:{
    flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
    backgroundColor: 'transparent',
    height:'100%',
    width: '25%'
  },
  tab4BG:{
    flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
    backgroundColor: 'transparent',
    height:'100%',
    width: '25%'
  },
  stngLogo: {
    width:30,
    height: 30,
    },
  rghtLogo: {
    width:30,
    height: '90%',
   
    marginStart:5,
    backgroundColor: 'transparent',
    },
  leftLogo: {
    width:40,
    height: '90%',
    top: 0,
    marginLeft:'40%',
    backgroundColor: 'transparent',
    },
    imgprofile:{
      width:80,
      height: 80,
      borderRadius:40,
     
    },

    appiconView:
    {
      width:70,
      height: 70,
      borderColor:'lightgray',
      borderWidth:1,
      borderRadius:35,
      backgroundColor: 'white',
      justifyContent:'center',
      alignItems:'center',
      marginTop:-50
    },
   
    appIcon:
    {
    width:30,
    height: 30,
    backgroundColor: 'transparent',
    },
    cmgsoonIcon:
    {
    width:150,
    height: 150,
    backgroundColor: 'transparent',
    },
    backTouchable:{
      width:'20%',
      height: '100%',
      marginEnd:5,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row'
      
     },
     crossContainer:{
      width:'95%',
      height: 50,
      top: 5,
      flexDirection:'row',
      justifyContent:'flex-end',
     },
     crossButton:{
      width:25,
      height: 25,
      top: 10,
      backgroundColor: 'transparent',
     
     },
     welcomContainer:
     {
      width:'30%',
      height: '100%',
      
      marginLeft:'30%',
      justifyContent:'center',
      alignItems:'center'
     },

     headerTitle:{
      color: 'rgb(30,77,155)',
      fontSize:15,

     },
     headerTitle1:{
      color: 'rgb(30,77,155)',
      fontSize:15,
      fontWeight:'bold'

     },
     quickLinksText:{
      color: 'rgb(30,77,155)',
      fontWeight:'bold',
      alignSelf:'center',
      marginTop:10,
      fontSize:15,
      
    
     },
     appName:{
      color: 'rgb(30,77,155)',
      fontWeight:'bold',
      fontSize:15,
      top:5
     },
     appdppescription:{
      color: 'rgb(30,77,155)',
      fontSize:12,
      textAlign:'center',
     
     },
     appBackground:{
      width:wp('45%'),
      height: wp('25%'),
      top: 0,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderColor:'lightgray',
      marginStart:10,
      marginEnd:10,
      borderRadius:10,
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      shadowOffset: {
      height: 0.5,
      width: 0,
     
    },
  elevation:5
     },
     quicklinkcontainer: {
      backgroundColor: 'transparent',
      width:  wp('100%'),
      flex:0.1,
      flexDirection:'row',
      marginStart:10,
      marginEnd:10,
      
},
imgcontainer: {
  backgroundColor: 'transparent',
  width:  wp('100%'),
  flex:0.2,
  marginTop:'25%',
  justifyContent: 'center',
  alignItems:'center',
 // flexDirection:'row'
},
container1: {
  backgroundColor: 'transparent',
  width:  wp('100%'),
  flex:0.2,
  marginTop:'15%',
  justifyContent: 'center',
  alignItems:'center',
  marginBottom:'5%'
 
},
  container: {
         backgroundColor: 'transparent',
         width:  wp('100%'),
         flex:0.2,
         marginTop:'15%',
         justifyContent: 'space-between',
         flexDirection:'row'
  },
  cmgcontainer: {
    backgroundColor: 'white',
    width:  wp('95%'),
    flex:0.5,
    marginTop:10,
    flexDirection:'column',
    marginStart:10,
      marginEnd:10,
      borderRadius:10,
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
         width:  wp('90%'),
         flex:0.4,
         borderRadius:10
  },
  appcontainer: {
         backgroundColor: 'white',
         width:  wp('90%'),
         flex:0.9,
         marginTop:10,
        
         flexDirection:'row'
  },
  appcontainer1: {
    backgroundColor: 'white',
    width:  wp('90%'),
    flex:0.8,
    justifyContent: 'center',
   alignItems:'center',
    flexDirection:'column'
},
  description: {
    color:'black',
    fontSize: 20,
    textAlign: 'center',
  },
  
});