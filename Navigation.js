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

const SplashStack = createStackNavigator({
  Splash
}, {
  headerMode: 'none'
});

const MainStack = createStackNavigator({
  DashboardScreen: { screen: Dashboard },
  ProfileScreen: { screen: Profile },
  MLife: { screen: MLife },
  MCustomer: { screen: MCustomer },
  LogoutScreen: { screen: Logout }
}, {
  headerMode: 'none'
});


const DrawerNav = createDrawerNavigator({
  Main: MainStack
}, {
  contentComponent: DrawerContent,
  overlayColor: 'rgba(0, 0, 0, 0.7)',
  drawerPosition: "right",
  drawerWidth: "60%",
  contentOptions: {
    tintColor: '#a6a5ab'
  }
});


// const MainStack = createStackNavigator({
//   Splash,
//   SideMenu: {
//     screen: DrawerNav,
//   },
//   MLife,
//   MCustomer,
// }, {
//   headerMode: 'none'
// })


export default createAppContainer(
  createSwitchNavigator({
    SplashScreen: Splash,
    MainScreen: DrawerNav
  }, {
    initialRouteName: 'SplashScreen'
  })
);
