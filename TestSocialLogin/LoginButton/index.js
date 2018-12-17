import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
  AsyncStorage
} from 'react-native';

import LoginGoogle from './LoginGoogle'
import LoginFacebook from './LoginFacebook'

import styles from './styles'

class LoginButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginFacebook/>
        <LoginGoogle/>
      </View>
    );
  }
}

export default LoginButton
