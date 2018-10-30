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

import ListAnswers from './ListAnswers';
import styles from './styles';

class AnswerQuestionScreen extends Component {

  static navigationOptions = {
    title: 'Answer',
    // headerRight : (
    //   <Button transparent
    //     // hasText bordered info
    //     style={{
    //       marginRight : 5
    //     }}
    //     onPress={() => this._onPressButton}
    //     >
    //     <Feather name='edit' size={30}/>
    //   </Button>
    // ),
    headerRight : (
      <TouchableHighlight
        // hasText bordered info
        style={{
          marginRight : 5
        }}
        onPress={() => this._onPressButton}
        >
        <Feather name='edit' size={30}/>
      </TouchableHighlight>
    )
    // headerTitle:
    //   <Body>
    //     <TopTitle/>
    //   </Body>,
  };

  _onPressButton = () => {
    /* TODO: Make a request to Firebase */
    console.log(this.props);
    this.props.navigation.navigate('EditSpeechForTopicScreen');
  }
  
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'Question Title');

    return (
      <View style={{
        flex : 1
      }}>
        <Text style={[styles.questionItemTitle, {
          // flex : 1,
          padding : 10,
          backgroundColor : '#fff'
        }]}>{title}</Text>
        <ListAnswers/>
      </View>
    );

    
  }

  // render() {
  //   return (
  //     <ListAnswers/>
  //   );
  // }
}

export default AnswerQuestionScreen;

/**
 * - Old text Input is not really working now
 * <TextInput
          style={{
            // height: 200, 
            flex : 1,
            borderColor: 'gray',
            borderWidth: 1,
            // backgroundColor : 'red',
            marginTop : 10
          }}
          onChangeText={(text) => {
            console.log(text);
          }}
          placeholder='Write your answer'
          multiline={true}
          // maxLength = {40}
          // value={this.state.text}
        />

// Button on the Right side of Header
        <Button hasText transparent
        onPress={this._onPressButton}
      >
        <Text>Submit</Text>
      </Button>
 */