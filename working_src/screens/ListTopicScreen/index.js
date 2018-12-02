import React, { Component } from 'react'
import { AppState, View, Image, FlatList } from 'react-native'
import PurpleGradient from '../../components/PurpleGradient'
import uuid from 'uuidv4';

import { connect } from 'react-redux'
import {getTopics} from "../../actions/topic";
// import DayToggle from '../../components/DayToggle'
import Talk from '../../components/Talk'

import styles from './styles';

// =================================================
// const addSpecials = (specialTalksList, talks) =>
//   map((talk) => assoc('special', contains(talk.title, specialTalksList), talk), talks)
// =================================================

// ScheduleScreen
class ListTopicScreen extends Component {

  // constructor(props) {
  //   super(props);

  //   const data = addSpecials(specialTalks, eventsByDay[activeDay])
  // }

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    dispatch(getTopics()).then();
  }

  onEventPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('QuestionScreen', item);
  }

  renderItem = ({item}) => {
    return (
      <Talk
        // name={item.name}
        title={item.title}
        duration={30}
        onPress={() => this.onEventPress(item)}
      />
    );
  }

  render () {
    // const { isCurrentDay, activeDay, data } = this.state
    return (
      <PurpleGradient style={styles.linearGradient}>
        {/* <DayToggle
          activeDay={activeDay}
          onPressIn={this.setActiveDay}
        /> */}
        {/* {isCurrentDay && <View style={styles.timeline} />} */}
        <FlatList
          ref='scheduleList'
          data={this.props.topics}
          extraData={this.props}
          renderItem={this.renderItem}
          // keyExtractor={(item, idx) => item.eventStart}
          keyExtractor={item => uuid()}
          contentContainerStyle={styles.listContent}
          // getItemLayout={this.getItemLayout}
          showsVerticalScrollIndicator={false}
        />
      </PurpleGradient>
    )
  }
}

const mapStateToProps = state => state.question;

export default connect(mapStateToProps)(ListTopicScreen);
