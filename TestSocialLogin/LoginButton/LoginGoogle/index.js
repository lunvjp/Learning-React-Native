import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
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
import styles from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// import {loginDefault, getUser, loginFacebook, loginGoogle} from '../../../actions/user';
GoogleSignin.configure();

class LoginGoogle extends Component {
  onLoginGoogle = async () => {

    // try {
    //   const result = await Expo.Google.logInAsync({
    //     androidClientId: keys.GOOGLE_ANDROID_CLIENT_ID,
    //     iosClientId: keys.GOOGLE_IOS_CLIENT_ID,
    //     scopes: ['profile', 'email'],
    //   });
    //
    //   if (result.type === 'success') {
    //     // return result.accessToken;
    //     // TODO: loginGoogle action.
    //     // use result.user to Dispatch
    //     const { dispatch } = this.props;
    //     console.log( result.user )
    //     dispatch(loginGoogle(result.user))
    //       .then((res) => {
    //         console.log(res)
    //         this.props.navigation.navigate('MainScreen');
    //       })
    //       .catch(e => console.log(e));
    //     console.log(result)
    //   } else {
    //     // return {cancelled: true};
    //     console.log(result)
    //   }
    // } catch(e) {
    //   // return {error: true};
    // }

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({ userInfo });
      console.log(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log(error)
    }
  }
  render () {
    return (
      <TouchableOpacity
        style={[styles.socialButton, {
          fontSize : 20,
          height : 50
        }]}
        onPress={this.onLoginGoogle}
      >
        <FontAwesome
          name="google"
          style={{ color: "white", fontSize: 18 }}
        />
        <Text>{" "}Sign-In with Google</Text>
      </TouchableOpacity>
    )
  }
}

export default LoginGoogle
