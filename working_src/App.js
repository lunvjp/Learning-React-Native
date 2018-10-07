import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Font } from 'expo';

// ====================================================
// import LoginUI from './components/LoginUI';
import Main from './components/login/components/Main';

import ChatUI from './components/chat';
import NavigationApp from './navigation';
// ====================================================
// import LoginUIContainer from './containers/LoginUIContainer';



import { applyMiddleware,  createStore } from 'redux';
import rootReducer from './reducers';
import {Provider, connect} from 'react-redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// import MessageList from './components/MessageList';
import QuestionScreen from './screens/QuestionScreen';
import LazyloadScrollExample from '../testComponents/LazyLoad';


const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <LoginUIContainer />
//       </Provider>
//     );
//   }
// }
// TODO: ISSUES
const LoginOrChat = connect(
  (state) => ({
    authorized : state.user.authorized
  })
)(({authorized}) => {
  if (authorized) {
    return <ChatUI />;
  } else {
    // return <NavigationApp />;
    // return <QuestionScreen />;
    return <LazyloadScrollExample/>;
  }
});

class App extends Component {
  componentDidMount() {
    Font.loadAsync({
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    });
  }

  render() {
    return (
      <Provider store={store}>
        <LoginOrChat />
      </Provider>
    );
  }
}

export default App;