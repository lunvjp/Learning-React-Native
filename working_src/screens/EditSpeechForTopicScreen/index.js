import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';

import _ from 'lodash';

import { connect } from 'react-redux';
import {sendParagraph, getParagraph, updateParagraph} from "../../actions/paragraph";
import { DropDownHolder } from '../../config'
import { Button } from 'native-base';
import { Feather } from '@expo/vector-icons';

class EditSpeechForTopicScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title : 'Create Writing',
    // headerTitle:
    //   <Body>
    //     <TopTitle/>
    //   </Body>,
    headerRight : (
      <TouchableHighlight
        // hasText bordered info
        style={{
          marginRight : 15
        }}
        onPress={navigation.state.params._onPressButton}
      >
        <Text style={{
          fontSize : 15
        }}>Submit</Text>
      </TouchableHighlight>
    )
  });

  state = {
    text : '',
    paragraph : null
  }

  _onPressButton = () => {
    const topic_id = this.props.navigation.getParam('topic_id');
    const { dispatch } = this.props;
    // console.log('topic_id inside EditSpeechForTopicScreen')
    // console.log( topic_id )
    if (this.state.paragraph) {
      dispatch(updateParagraph(this.state.paragraph.id, this.state.text))
        .then(() => {
          DropDownHolder.getDropDown().alertWithType('success', 'Success', 'Update Successfully!');
        });
    } else {
      dispatch(sendParagraph(this.state.text, topic_id)).then(result => {
        DropDownHolder.getDropDown().alertWithType('success', 'Success', 'Create Successfully!');
        this.setState({
          paragraph : result
        });
      });
    }
  }

  componentDidMount () {
    console.log('topic_id inside EditSpeechForTopicScreen')
    console.log( this.props.navigation.getParam('topic_id') )
    // set function for Submit button
    this.props.navigation.setParams({
      _onPressButton : this._onPressButton
    });

    /** fetch Paragraphs */
    const topic_id = this.props.navigation.getParam('topic_id');
    this.props.dispatch(getParagraph(topic_id))
      .then(result => {
        // console.log( topic_id )
        // console.log( result )
        if ( !_.isEmpty(result) ) {
          const text = result.text;
          this.setState({
            text,
            paragraph : result
          });
        }
      })
      .catch((error) => {
        console.log( error )
      });
  }

  render() {
    return (
      <View style={{
        // flex : 1,
        borderWidth : 1
      }}>
        <TextInput
          style={{
            padding : 15,
            paddingTop : 15,
            fontSize : 20
          }}
          multiline={true}
          numberOfLines={5}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Write your writing'
        />

      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(EditSpeechForTopicScreen);
