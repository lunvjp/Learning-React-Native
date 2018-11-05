import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux'

import { LOGIN } from '../../actions/actionNames'
import { getUser } from '../../actions/user'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // console.log('Check inside bootstrap async')
    // console.log(this.props)
    // return;
    const userToken = await AsyncStorage.getItem('accessToken');
    // get user Infor right here
    // get actions like user log in successfully.

    if (userToken) {
      const { dispatch } = this.props
      // set access Token to Redux State
      dispatch({
        type : LOGIN.SUCCESS,
        payload : userToken
      })
      // Dont need to set accessToken in AsyncStorage.
      dispatch(getUser()).then(async (result) => {
        this.props.navigation.navigate('MainScreen');
      });
    }
    else this.props.navigation.navigate('LoginScreen');
    
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

// export default AuthLoadingScreen;
export default connect()(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});