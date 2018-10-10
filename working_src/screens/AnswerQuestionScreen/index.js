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

  _onPressButton = () => {
    console.log('_onPressButton submit');
    console.log(this.props);
  }
  
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='close' type='EvilIcons'/>
            </Button>
          </Left>
          <Body>
            <Title>Answer</Title>
          </Body>
          <Right>
            {/* <TouchableHighlight onPress={this._onPressButton}>
              <Text>Submit</Text>
            </TouchableHighlight> */}
            <Button hasText transparent>
              <Text>Submit</Text>
            </Button>
          </Right>
        </Header>

        <Content padder
          style={{
            // backgroundColor : 'green',
          }}
        >
          <Text style={styles.questionItemTitle}>What are cool things?</Text>
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
        </Content>

     
      </Container>
    );
  }
}

export default AnswerQuestionScreen;