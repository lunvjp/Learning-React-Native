import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { 
  // Text,
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

import uuid from 'uuidv4';

import {getQuestionByTopic, getQuestionByTopicAsync} from '../../helper/functions';
import styles from './styles';

const TopTitle = () => {
  return (
    <View 
    // style={styles.row}
    >
      {/* <View style={styles.starNote}>
        <FontAwesome name="star" size={20} color="white"/>
      </View> */}
      <Text style={styles.title}>QUESTIONS FOR YOU</Text>
    </View>
  );
}

// const api_endpoint = 'https://connectenglishlearner.000webhostapp.com/wp-json/wp/v2/question?filter[topic]=travelling&page=2';
// api_endpoint = 'https://randomuser.me/api/?page=3&results=20';

class QuestionScreen extends Component {

  static navigationOptions = {
    headerTitle:
      <Body>
        <TopTitle/>
      </Body>,
  };

  state = {
    data : [],
    page : 1,
    loading : true,
    error : null,
    stickyHeaderIndices: []
  }

  // TODO:
  // 1. check loading: success and Failing 
  // - (with renderFooter): NOT DONE
  // 2. get data from API in page 1: DONE
  // 3. add Load more feature from FlatList

  fetchQuestions = async () => {
    // console.log('fetchQuestions');
    const { page } = this.state;
    this.setState({ loading : true });
    try {
      const questionsData = await getQuestionByTopicAsync('travelling', page);
      this.setState({
        data : this.state.data.concat(questionsData),
        loading : false
      });
    } catch(error) {
      this.setState({ error, loading : false });
    }
  }

  componentDidMount() {
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
      <TouchableHighlight onPress={() => {
        this.props.navigation.navigate('AnswerQuestionScreen', item);
      }}>
        <View style={styles.questionItem}>
          <Text style={styles.questionItemTitle}>{item.title}</Text>
          <Text style={styles.questionItemAnswerTitle}>{item.totalAnswer} Answers</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderHeader = () => {
    return (
      <TopTitle/>
    );
  }

  renderFooter = () => {
    return (this.state.loading && 
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  /* TODO: Custom question item like this  */
  // _renderRowView(rowData) {
  //   return (
  //     <TouchableHighlight
  //       style={styles.row}
  //       underlayColor='#c8c7cc'
  //       onPress={() => this._onPress(rowData)}
  //     >
  //       <Text>{rowData}</Text>
  //     </TouchableHighlight>
  //   );
  // }

  /**
   * - set new page of this.state
   * - call func get data after set.
   */
  handleLoadMore = () => {
    this.setState({ loading : true, page : this.state.page + 1 }, () => {
      this.fetchQuestions();
    });
  }

  render() {
    return (
      <Container>
        
        <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => uuid()}
            onEndReachedThreshold={0.7}
            onEndReached={this.handleLoadMore}
            ListFooterComponent={this.renderFooter}
          />
      </Container>
    );
  }
}

export default QuestionScreen;