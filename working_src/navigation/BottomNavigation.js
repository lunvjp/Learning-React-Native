import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons, MaterialIcons, AntDesign, Entypo, Feather } from '@expo/vector-icons';

import ChatScreen from '../screens/ChatScreen';
import ListTopicScreen from "../screens/ListTopicScreen";
import QuestionScreen from "../screens/QuestionScreen";
import AnswerQuestionScreen from "../screens/AnswerQuestionScreen";
import EditSpeechForTopicScreen from "../screens/EditSpeechForTopicScreen";

const ListTopicNavigator = createStackNavigator({
  ListTopicScreen : {
    screen : ListTopicScreen
  },
  QuestionScreen : {
    screen : QuestionScreen,
  },
  AnswerQuestionScreen : {
    screen : AnswerQuestionScreen
  },
  EditSpeechForTopicScreen : {
    screen : EditSpeechForTopicScreen
  }
});

const BottomNavigation = createBottomTabNavigator({
  ListTopic : {
    screen : ListTopicNavigator
  },
  Chat : {
    screen : ChatScreen
  }
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      // console.log(navigation);
      const { routeName } = navigation.state;
      let iconName;
      /* Check active click Tabs */
      if (routeName === 'ListTopic') {
        iconName = `people${focused ? '' : '-outline'}`;
        return <MaterialIcons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      }
      else if (routeName === 'Chat') {
        iconName = 'message';
        // iconName = `ios-options${focused ? '' : '-outline'}`;
        return <Entypo name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

export default BottomNavigation;
