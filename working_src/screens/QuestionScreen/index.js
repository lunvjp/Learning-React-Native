import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import uuid from 'uuidv4';

import {getQuestionByTopic, getQuestionByTopicAsync} from '../../helper/functions';
import styles from './styles';

const TopTitle = () => {
  return (
    <View style={styles.row}>
      <View style={styles.starNote}>
        <FontAwesome name="star" size={20} color="white"/>
      </View>
      <Text style={styles.title}>QUESTIONS FOR YOU</Text>
    </View>
  );
}

// const QuestionItem = ({item}) => {
//   return(
//     <View>
//       <Text>{item.name}</Text>
//       <Text>{item.totalAnswer} Answers</Text>
//     </View>
//   );
// }

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

  state = {
    data : []
  }

  async fetchQuestions () {
    const questionsData = await getQuestionByTopicAsync();
    this.setState({
      data : questionsData
    });
  }

  componentWillMount() {
    this.fetchQuestions();
  }

  // static getDerivedStateFromProps (props, state) {
  //   if (!state.data)
  //     return {
  //       data : getQuestionByTopic('friends')
  //     }
  // }

  renderItem = ({item}) => { 
    return (
      <View style={styles.questionItem}>
        <Text style={styles.questionItemTitle}>{item.title}</Text>
        <Text style={styles.questionItemAnswerTitle}>{item.totalAnswer} Answers</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TopTitle/>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => uuid()}
        />
      </View>
    );
  }
}

export default QuestionScreen;