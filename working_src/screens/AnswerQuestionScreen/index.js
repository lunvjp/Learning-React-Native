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
import { Feather, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux'

import ListAnswers from './ListAnswers';
import styles from './styles';
import NewWordsList from "../../containers/NewWordsList";

class AnswerQuestionScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Answer',
    headerRight : (
      <View style={{
        flexDirection : 'row'
      }}>
        <Button
          transparent
          style={{
            marginRight : 5
          }}
          onPress={navigation.state.params._onPressOpenEditScreenButton}
        >
          <Feather name='edit' size={30}/>
        </Button>
        <Button
          transparent
          style={{
            marginRight : 7
          }}
          onPress={navigation.state.params._onPressOpenNewWordScreenButton}
        >
          <FontAwesome name='file-word-o' size={30}/>
        </Button>
      </View>
      // <Button transparent
      //   // hasText bordered info
      //         style={{
      //           marginRight : 5
      //         }}
      //         onPress={navigation.state.params._onPressButton}
      // >
      //   <Feather name='edit' size={30}/>
      // </Button>
    ),
    // header : ({state}) => ({
    //   right : (
    //     <TouchableHighlight
    //       // hasText bordered info
    //       style={{
    //         marginRight : 5
    //       }}
    //       onPress={() => {state.params._onPressButton()}}>
    //       <Feather name='edit' size={30}/>
    //     </TouchableHighlight>
    //   )
    // }),
  });

  state = {
    topic_id : this.props.navigation.getParam('topic_id')
  }

  _onPressOpenEditScreenButton = () => {
    this.props.navigation.navigate('EditSpeechForTopicScreen', {
      topic_id : this.state.topic_id
    });
  }

  _onPressOpenNewWordScreenButton = () => {
    this.props.navigation.navigate('NewWordScreen', {
      topic_id : this.state.topic_id
    });
  }

  componentDidMount () {
    this.props.navigation.setParams({
      _onPressOpenEditScreenButton : this._onPressOpenEditScreenButton,
      _onPressOpenNewWordScreenButton : this._onPressOpenNewWordScreenButton
    });
  }

  _onPressButton = () => {
    /* TODO: Make a request to Firebase */
    // import user_id
    // topic_id
    this.props.navigation.navigate('EditSpeechForTopicScreen', {
      topic_id: this.props.navigation.getParam('id')
    });
  }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'Question Title');
    const contentText = navigation.getParam('answer', '');

    return (
      <View style={{
        flex : 1
      }}>
        <Text style={[styles.questionItemTitle, {
          // flex : 1,
          padding : 10,
          backgroundColor : '#fff'
        }]}>{title}</Text>
        {/*<NewWordsList/>*/}
        <ListAnswers {...this.props} />
      </View>
    );
  }
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
