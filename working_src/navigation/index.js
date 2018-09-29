
import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';

import HomeScreen from '../screens/Home';
// import { ExampleRoutes } from '../config/nav';

const NavigationApp = createStackNavigator({
  MainScreen: {
    screen: HomeScreen,
    // navigationOptions: {
    //   gesturesEnabled: false,
    //   header: null
    // }
  },
  // ...ExampleRoutes
});

export default NavigationApp;