import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native';
import { login, loginFacebook } from '../actions';
// import * as DeviceInfo from 'react-native-device-info';

class LoginUI extends Component {
  // TODO:
  // 1. Create Set Name actions.
  // 2. Create set User Avatar.
  // 3. Create Login Method (It's a reducer to help user Login  )
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      avatar : ''
    };
  }

  render() {
    return (
      // {this.props.authorizing ? <ActivityIndicator size="large" color="#80DEEA" /> :
      <View style={styles.LoginContainer}>
        <Text style={styles.title}>Who are you?</Text>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          autoCorrect={false}
          placeholder="Your name here"
          placeholderTextColor="#BDBDBD"
          style={styles.LoginField}
          onChangeText={(text) => {
            this.setState({
              name : text
            })
          }}
          onSubmitEditing={() => {
            console.log('onSubmitEditing');
          }}
        />
        <TextInput
          underlineColorAndroid='transparent'
          autoCorrect={false}
          placeholder="Your avatar URL here"
          placeholderTextColor="#BDBDBD"
          style={styles.LoginField}
          onChangeText={(text) => {
          this.setState({
              avatar : text
            })
          }}
         onSubmitEditing={() => {
           console.log('onSubmitEditing');
         }}
        />
        <View>
          {/*<Button*/}
            {/*style={styles.loginFacebook}*/}
            {/*onPress={() => {*/}
              {/*this.props.dispatch(loginFacebook());*/}
            {/*}}*/}
            {/*title="Login Facebook"*/}
            {/*color="#1976D2"/>*/}
          <Button
              style={styles.loginButton}
              onPress={() => {
                this.props.dispatch(login());
              }}
              title="Start Chatting"
              color="#1976D2"
              accessibilityLabel="Learn more about this purple button"/>

          {this.props.authorizing ? <ActivityIndicator size="large" color="#80DEEA" /> : <Text>DONE</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  LoginContainer : {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'center',
    backgroundColor: '#E0E0E0',
    padding : 10
  },
  title : {
    fontSize: 20,
    fontWeight : '500',
    textAlign : 'center',
    marginBottom: 20,
  },
  LoginField : {
    backgroundColor : 'white',
    marginBottom : 20,
    paddingTop : 15,
    paddingBottom : 15,
    paddingLeft : 10,
    paddingRight : 10
  },
  loginButton : {
    backgroundColor : 'red',
    // padding: 20,
  },
  loginFacebook : {

  }
});

export default LoginUI;
