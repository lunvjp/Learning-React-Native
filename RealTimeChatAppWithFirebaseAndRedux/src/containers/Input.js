import React, { Component } from 'react';
import {
  View, Image, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { sendMessage } from "../actions"; // TODO: Custom sendMessage

class Input extends Component {
  constructor (props) {
    super(props);
    this.state = {
      newMessage : ''
    }
  }
  onSubmitEditing = () => {
    if (this.state.newMessage)
    this.props.dispatch(
      // this.props.submitAction(this.state.newMessage)
      sendMessage(this.state.newMessage) // This.props.user.
      // TODO: Try to figure out How to get Props of User.
    );
  };
  render() {
    return (
      <TextInput onChangeText={(text) => {
        this.setState({newMessage : text})
      }}
                 onSubmitEditing={this.onSubmitEditing}
                 placeholder="Nhập tin nhắn"/>
    );
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     submitAction : (newMessage) => {
//       dispatch(sendMessage(newMessage));
//     }
//   }
// };
export default connect()(Input);