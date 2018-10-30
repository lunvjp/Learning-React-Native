import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Expo, { Font } from 'expo';

// ====================================================
// import LoginUI from './components/LoginUI';
import Main from './components/login/components/Main';

import ChatUI from './components/chat';
// import NavigationApp from './navigation';
// ====================================================

import { applyMiddleware,  createStore } from 'redux';
import rootReducer from './reducers';
import {Provider, connect} from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Root from './navigation/Root';

/* Import Component */
// import QuestionScreen from './screens/QuestionScreen';
// import AnswerQuestionScreen from './screens/AnswerQuestionScreen';
// import {createStackNavigator} from 'react-navigation';
// const ListAndUserStack = createStackNavigator({
//   QuestionScreen : {
//     screen : QuestionScreen,
//     // navigationOptions: {
//     //   title: 'Details',
//     //   // gesturesEnabled: false,
//     //   header: null
//     // }
//   },
//   AnswerQuestionScreen : {
//     screen : AnswerQuestionScreen
//   }
// });
// ====================================================
import { AppNavigator,
  middleware
} from './containers/AppNavigator';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    middleware,
    thunkMiddleware,
    loggerMiddleware
  )
);

class App extends Component {

  state = {
    isReady : false
  }

  componentDidMount() {
    Font.loadAsync({
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf')
    });
    this.loadFonts();
  }

  async loadFonts () {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      'EvilIcons': require('@expo/vector-icons/fonts/EvilIcons.ttf'),
    });
    this.setState({isReady : true});
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Provider store={store}>
        <AppNavigator />
        {/*<Root />*/}
      </Provider>
    );
  }
}

export default App;
