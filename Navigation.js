import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";


import { createStackNavigator } from "react-navigation-stack";

import { createDrawerNavigator } from "react-navigation-drawer";

import Splash from './src/Pages/Splash'

import DrawerContent from './DrawerContent'
import Dashboard from './src/Pages/Dashboard'
import Profile from './src/Pages/Profile'
import MLife from './src/Pages/MLife'
import MCustomer from './src/Pages/MCustomer'

import Logout from './src/Pages/Logout';


const DrawerNav = createDrawerNavigator({

  DashboardScreen: {
    screen: Dashboard
  },
  ProfileScreen: {
    screen: Profile
  },
  LogoutScreen: {
    screen: Logout
  },

}, {
  contentComponent: DrawerContent,
  overlayColor: 'rgba(0, 0, 0, 0.7)',
  drawerPosition: "right",
  drawerWidth: "60%",

  contentOptions: {
    tintColor: '#a6a5ab'
  }
},

);


// createSwitchNavigator({
//   AuthLoading:AuthLoading,
//   App:AppStack,
//   Auth:AuthStack
//   },{
//   initialRouteName:'AuthLoading'
//   }))

// const SplashStack = createStackNavigator({
//   Splash
// }, {
//   headerMode: 'none'
// })

const MainStack = createStackNavigator({
  Splash,
  SideMenu: {
    screen: DrawerNav,
  },
  MLife,
  MCustomer,
}, {
  headerMode: 'none'
})


export default createAppContainer(MainStack);
