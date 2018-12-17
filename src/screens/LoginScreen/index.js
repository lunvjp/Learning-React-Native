import React, {Component} from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import WallPaper from './WallPaper'
import LoginButton from './LoginButton'
import styles from './styles'

class LoginScreen extends Component {
  render () {
    return (
      <WallPaper>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={styles.title}>Don’t think, it’s time to speak!</Text>
          <LoginButton/>
        </View>
      </WallPaper>
    );
  }
}

export default LoginScreen






