
import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';

import QuestionScreen from '../screens/QuestionScreen';
import AnswerQuestionScreen from '../screens/AnswerQuestionScreen';

import HomeScreen from '../screens/Home';
import config from '../config/nav';

const NavigationApp = createStackNavigator({
  MainScreen: {
    screen: HomeScreen,
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  },
  ...config.ExampleRoutes,
  // ListAndUserStack
});

export default NavigationApp;

