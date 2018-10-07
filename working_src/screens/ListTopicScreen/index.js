import React, { Component } from 'react'
import { AppState, View, Image, FlatList } from 'react-native'
import PurpleGradient from '../../components/PurpleGradient'
import uuid from 'uuidv4';
// import DayToggle from '../../components/DayToggle'
import Talk from '../../components/Talk'

import styles from './styles';

// =================================================
// const addSpecials = (specialTalksList, talks) =>
//   map((talk) => assoc('special', contains(talk.title, specialTalksList), talk), talks)
// =================================================

const data = [
  {
    title : 'Travelling' 
  },
  {
    title : 'Friends'
  },
  {
    title : 'Hometown'
  },
  {
    title : 'Shopping'
  },
  {
    title : 'Future'
  }
];

// ScheduleScreen
class ListTopicScreen extends Component {

  constructor(props) {
    super(props);

    // const data = addSpecials(specialTalks, eventsByDay[activeDay])
  }

  componentDidMount() {
    console.log(uuid());
    console.log(typeof uuid());
  }

  onEventPress = (item) => {
    console.log('Jack onEventPress');
    return;

    // const { navigation } = this.props;
    // navigation.navigate(''); // Import some screens right here.
    // console.log();
  }
  
  renderItem({item}) {
    return (
      <Talk
        name={item.name}
        title={item.title}
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
          data={data}
          // extraData={this.props}
          renderItem={this.renderItem}
          // keyExtractor={(item, idx) => item.eventStart}
          // keyExtractor={uuid()}
          // contentContainerStyle={styles.listContent}
          // getItemLayout={this.getItemLayout}
          // showsVerticalScrollIndicator={false}
        />
      </PurpleGradient>
    )
  }
}

export default ListTopicScreen;