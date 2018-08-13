import React, { Component } from 'react';
import {
  TextInput, View
} from 'react-native';
import { Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReactNative from 'react-native';
import Input from '../containers/Input';
import Messages from '../containers/Messages';
import firebase from '../firebase';

class ChatUI extends Component {
  constructor(props) {
    super(props);
  }
  _scrollToInput(reactRef) {
    // Add a 'scroll' ref to your ScrollView
    this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
  }
  // onSubmitEditing() {
  //   // TODO: Make an Action SEND MESSAGE
  //
  //   // TODO: Create submitActions.
  //
  //   //
  //
  // }
  // sendMessage = (text) => {
  //   // TODO: Return an Action with Name and Props Users.
  //
  //
  //   // Send Message to Firebase Database. It's an action.
  // };
  // submitAction to sendMessage to something.
  render() {
    // const ; // onlineUserList
    // const onlineUserList =
    // var uid = firebase.auth().currentUser.uid;

    return (
      <View>
        <Screen>
          <Title styleName="h-center" style={{paddingTop: 20}}>
            Chatroom
          </Title>
          <KeyboardAwareScrollView>
            <Messages />
            <Input />
          </KeyboardAwareScrollView>
        </Screen>
      </View>
    );
  }
}

export default ChatUI;