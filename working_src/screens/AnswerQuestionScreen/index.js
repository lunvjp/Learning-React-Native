import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StatusBar } from 'react-native';
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

import styles from './styles';

class AnswerQuestionScreen extends Component {

  static navigationOptions = {
    title: 'Answer',
    headerRight : (
      <Button hasText transparent
        onPress={this._onPressButton}
      >
        <Text>Submit</Text>
      </Button>
    )
    // headerTitle:
    //   <Body>
    //     <TopTitle/>
    //   </Body>,
  };

  _onPressButton = () => {
    /* TODO: Make a request to Firebase */
    this.props.navigation.goBack();
  }
  
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'Question Title');

    return (
      <Container>

        <Content padder
          style={{
            // backgroundColor : 'green',
          }}
        >
          <Text style={styles.questionItemTitle}>{title}</Text>
          <TextInput
              style={{
                height: 200, 
                // flex : 1,
                borderColor: 'gray',
                borderWidth: 1,
                backgroundColor : 'red',
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

            <Button hasText transparent
              onPress={this._onPressButton}
            >
              <Text>Submit</Text>
            </Button>
        </Content>

     
      </Container>
    );
  }
}

export default AnswerQuestionScreen;