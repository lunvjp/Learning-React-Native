import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons, MaterialIcons, AntDesign, Entypo, Feather } from '@expo/vector-icons';

// import Main from '../components/login/components/Main';

import LoginScreen from '../screens/LoginScreen';
import ChatUI from '../components/chat';
import QuestionScreen from '../screens/QuestionScreen';
import AnswerQuestionScreen from '../screens/AnswerQuestionScreen';

const ListAndUserStack = createStackNavigator({
  QuestionScreen : {
    screen : QuestionScreen,
  },
  AnswerQuestionScreen : {
    screen : AnswerQuestionScreen
  }
});

import BottomNavigation from './BottomNavigation';

const Root = createStackNavigator({
  LoginScreen : {
    screen : LoginScreen
  },
  BottomNavigation : {
    screen : BottomNavigation
  }
});

export default Root;
