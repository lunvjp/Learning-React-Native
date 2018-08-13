import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import { ListView, Row,
  Subtitle,
  Caption,
  Image,
   View,
   Text
} from '@shoutem/ui';

class Message extends Component {
  render() {
    return (
      <Row>
        <Image
          styleName="small-avatar top"
          source={{ uri: 'https://st2.depositphotos.com/2777531/6505/v/950/depositphotos_65058673-stock-illustration-hipster-man-avatar-user.jpg' }}
        />
        <View styleName="vertical">
          <View styleName="horizontal space-between">
            <Subtitle>{this.props.author.name}</Subtitle>
            <Caption>20 minutes ago</Caption>
          </View>
          <Text styleName="multiline">{this.props.text}</Text>
        </View>
      </Row>

      // <View style={styles.messageRow}>
      //   <Image style={styles.imageAvatar} source={{uri: 'https://st2.depositphotos.com/2777531/6505/v/950/depositphotos_65058673-stock-illustration-hipster-man-avatar-user.jpg'}}
      //   />
      //   <Text>{this.props.text}</Text>
      // </View>
    );
  }
}

class MessageList extends Component {
  render() {
    return (
      <View>
        {/*e*/}
      </View>
    );
  }
}
export default MessageList;

const styles = StyleSheet.create({
  messageRow : {
    // backgroundColor: 'green'
  },
  imageAvatar : {
    backgroundColor : 'red',
  }
});