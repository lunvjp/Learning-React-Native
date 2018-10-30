import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { Button } from 'native-base';
import { Feather } from '@expo/vector-icons';

class EditSpeechForTopicScreen extends Component {

  static navigationOptions = {
    title : 'Create Writing',
    // headerTitle:
    //   <Body>
    //     <TopTitle/>
    //   </Body>,
    headerRight : (
      <TouchableHighlight
        // hasText bordered info
        style={{
          marginRight : 15
        }}
        onPress={this._onPressButton}
        >
        <Text style={{
          fontSize : 15
        }}>Submit</Text>
      </TouchableHighlight>
    )
  };

  state = {
    text : 'Two methods exposed via the native element are .focus() and .blur() that will focus or blur the TextInput programmatically.'
  }

  _onPressButton = () => {
    /* Submit */
    // const { navigation } = this.props;
    // this.props.navigation.goBack();
    // Come back
    // console.log();
  }

  render() {
    return (
      <View style={{
        // flex : 1,
        borderWidth : 1
      }}>
        <TextInput
          style={{
            padding : 20,
            paddingTop : 20,
            fontSize : 20
          }}
          multiline={true}
          numberOfLines={5}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Write your writing'
        />
      </View>
    );
  }
}

export default EditSpeechForTopicScreen;