import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StatusBar, ScrollView } from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Icon,
  Right,
  Title,
  Button,
  Picker
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux'

import ListView from './ListView'
// import ListView from './NewListView'
// import AddWords from './temp'

class NewWordScreen extends Component {

  state = {
    topic_id : this.props.navigation.getParam('topic_id')
  }

  componentWillMount() {
    // How to speak English like a native.
    // const current_topic_id = this.props.navigation.getParam('id')
    console.log('NewWordScreen: componentWillMount')
    console.log( this.props )
  }
  // Update New Word Screen
  render() {
    return (
      <View style={{
        flex : 1,
        backgroundColor : 'green'
      }}>
        <ListView topic_id={this.state.topic_id} />
        {/*<AddWords/>*/}
      </View>
    );
  }
}
//

export default NewWordScreen;

/**
 1. Text input to add new words with Auto complete search.
 2. Checkbox to add all the Topics or not.
 2.1. Uncheck => open List Topic screen to check What topics they want to save.
 3.

 */
