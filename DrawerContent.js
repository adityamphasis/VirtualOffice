import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'react-native-axios';
import { getConfiguration , setConfiguration} from './src/utils/configuration';
import { DrawerActions } from 'react-navigation';


//https://accounts.bharti-axalife.com/oidc/logout

// const mapStateToProps = state => ({
//    isBusyGetProfile: state.GetProfileReducer.isBusy,
//    responseGetProfile: state.GetProfileReducer


// });


  class DrawerContent extends Component {




   navigateToScreen = (route) => (
     () => {
       this.props.navigation.closeDrawer()
       this.props.navigation.navigate(route);

     })


 navigateToScreen = ( route ) =>(
     () => {
       if(route == 'Splash'){
         console.log('reset here');
          //setConfiguration('user_id', '');

 try {
    // AsyncStorage.setItem('user_id', '')
  } catch (e) {
    // saving error
  }



       }
     const navigateAction = NavigationActions.navigate({
         routeName: route
     });
     this.props.navigation.dispatch(navigateAction);
 })

  constructor(props) {
  super(props)
}





  render(){
    return(
       <View style={styles.container}>
            <View style= {{height: 180, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>

              <View  style={{height: 'auto', overflow: "hidden", width: '100%', marginTop: '20%', backgroundColor: 'transparent', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>

                    <View  style={{height: 70, overflow: "hidden", width: 70,borderWidth: 2, borderColor: 'white', borderRadius: 35,  backgroundColor: 'transparent'}}>


                  <Image  resizeMode="cover"  style= {{ position:'absolute', width: '100%', height: '100%'}}
                 source = {require('./assets/profile_img2.jpg')}
                  />

                     </View>


                     <View  style={{height: 'auto', alignItems:'center',justifyContent: 'center', marginHorizontal: 10, overflow: "hidden",  backgroundColor: 'transparent',marginTop:'5%'}}>
                    <Text style={{ color: 'rgb(30,77,155)' ,textAlign:'center', fontSize:16,height: 20,
                     }}>Roshan-Kewlani</Text>
                     <Text style={{ color: 'rgb(30,77,155)', textAlign:'center',  fontSize:16,height: 20,
                      }}>BAN-DAB-202334</Text>
                      </View>

              </View>




           </View>
           <View style={{width:'100%',height:1,backgroundColor:'gray',marginTop:'10%'}}>
             </View>

      
         <View style= {{width: '100%', height: '100%',backgroundColor:'white'}}>



 <TouchableOpacity style= {styles.tile} onPress={this.navigateToScreen('HomeScreen')} >
 <Image resizeMode="contain" style={styles.tileIcon}
   source = {require('./assets/home.png')}
    />
 <Text style={styles.tileTitle}> Home </Text>
</TouchableOpacity>

 <View  style={styles.divider}>
             </View>

 <TouchableOpacity style= {styles.tile} onPress={this.navigateToScreen('ProfileScreen')} >
 <Image resizeMode="contain" style={styles.tileIcon}
    source = {require('./assets/profile.png')}
    />
 <Text style={styles.tileTitle}> Profile </Text>
</TouchableOpacity>

 <View  style={styles.divider}>
             </View>

 <TouchableOpacity style= {styles.tile} onPress={this.navigateToScreen('PaymentMethodScreen')}>
<Image resizeMode="contain" style={styles.tileIcon}
    source = {require('./assets/support.png')}
   />
<Text style={styles.tileTitle}> Support </Text>
</TouchableOpacity>
 <View  style={styles.divider}>
             </View>



<TouchableOpacity style= {styles.tile} onPress={this.navigateToScreen('LogoutScreen')} >
 <Image resizeMode="contain" style={styles.tileIcon}
   source = {require('./assets/logout.png')}
    />
<Text style={styles.tileTitle}> Logout </Text>


</TouchableOpacity>

<View style={styles.divider}>
             </View>


 <View  style={styles.bottomView}>


                  <Image  resizeMode="cover"  style= {styles.bottomImage}
                 source = {require('./assets/mnubgnw.jpg')}
                  />

                     </View>

</View>




          </View>
    )
  }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
     height:'50%',
        paddingTop: 0,
        backgroundColor:'green'
      //  marginBottom: 180

    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20
    },
    divider:
    {
      width:'100%',
      height:1,
      backgroundColor:'gray',
      //marginTop:'5%'
    },
    bottomView:
    {
      height: '100%',
      overflow: "hidden",
      width: '100%',
      backgroundColor: 'white'
    },
    bottomImage:
    { 
      position:'absolute',
       width: '100%', 
       height: '30%'
      },
  tile:{
   height: '10%',
   width: '100%',
   backgroundColor: 'transparent',
   flexDirection: 'row',
   alignItems:'center',
   

   },
   tileIcon:{
     width: 22,
     height: 22,
    // marginTop: 10,
     marginLeft: 20
   },
   tileTitle:{
     // marginTop: 9,
      fontSize: 17,

      color: 'rgb(30,77,155)',
       marginLeft: 20
    },
    tileArrow:{
       position: 'absolute',
       width: 15,
       height: 15,
       top: 15,
       right: 18
    }

});

export default DrawerContent;
