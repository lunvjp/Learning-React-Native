import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import { Ionicons, MaterialIcons, AntDesign, Entypo, Feather } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import BottomNavigation from './BottomNavigation';

const Root = createSwitchNavigator({
  AuthLoadingScreen : {
    screen : AuthLoadingScreen
  },
  LoginScreen : {
    screen : LoginScreen
  },
  MainScreen : {
    screen : BottomNavigation
  }
}, {
  initialRouteName: 'AuthLoadingScreen',
});

// const Root = (signedIn = false) => {
//   return createSwitchNavigator({
//     LoginScreen : {
//       screen : LoginScreen
//     },
//     MainScreen : {
//       screen : BottomNavigation
//     }
//   }, {
//     initialRouteName: signedIn ? 'MainScreen' : 'LoginScreen',
//   })
// };

export default Root;
