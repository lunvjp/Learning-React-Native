import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Expo, { Font } from 'expo';
import DropdownAlert from "react-native-dropdownalert";

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
import {DropDownHolder} from './config'
import { AppNavigator,
  middleware
} from './containers/AppNavigator';


const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    middleware,
    thunkMiddleware,
    // loggerMiddleware
  )
);

const RootApp = () => (
  <View style={{
    flex : 1
  }}>
    <AppNavigator />
    <DropdownAlert ref={ref => {
      DropDownHolder.setDropDown(ref)
    }}
                   closeInterval={1000}

    />
  </View>
);

class App extends Component {

  state = {
    isReady : false
  }

  componentDidMount() {
    // Font.loadAsync({
    //   'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    //   'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    //   'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf')
    // });
    this.loadFonts();
  }

  async loadFonts () {
    await Expo.Font.loadAsync({
      /* Custom fonts */
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),

      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),

      'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
      'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
    });
    this.setState({isReady : true});
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Provider store={store}>
        <RootApp />
      </Provider>
    );
  }
}

export default App;
