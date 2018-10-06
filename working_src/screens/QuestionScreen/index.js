import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import uuid from 'uuidv4';

const TopTitle = () => {
  return (
    <View style={styles.row}>
      <View style={styles.starNote}>
        <FontAwesome name="star" size={32} color="white"/>
      </View>
      <Text style={styles.title}>QUESTIONS FOR YOU</Text>
    </View>
  );
}

const questionList = [
  {
    name : 'Have you ever been abroad?',
    totalAnswer : 5
  },
  {
    name : 'Where have you been?',
    totalAnswer : 5
  },
  {
    name : 'Are you planning on going anywhere for your next vacation? If so, where? Who with? How long will you stay?',
    totalAnswer : 5
  },
  {
    name : 'Are you afraid of going abroad alone?',
    totalAnswer : 5
  },
  {
    name : 'Could you live in another country for the rest of your life?',
    totalAnswer : 5
  },
  {
    name : 'Describe the most interesting person you met on one of your travels.',
    totalAnswer : 5
  }
];

class QuestionScreen extends Component {

  renderItem = (item) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.totalAnswer} Answers</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TopTitle/>
        <FlatList
          data={questionList}
          renderItem={this.renderItem(item)}
          keyExtractor={item => uuid()}
        />
      
      </View>
    );
  }
}

export default QuestionScreen;

const styles = StyleSheet.create({
  container : {

  },
  row : {
    padding : 10,
    // flex : 1,
    // backgroundColor : 'green',
    flexDirection : 'row',
    alignItems: 'center'
  },
  starNote : {
    // flex : 1,
    // width : 100,
    alignSelf : 'center',
    padding : 8,
    backgroundColor : 'red',
    // borderWidth : 5,
    // borderColor : 'green',
    borderRadius : 5,
    marginRight : 10
  },
  title : {
    // flex : 1
    backgroundColor : 'green',
  }
});