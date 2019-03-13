import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, InputToolbar, Composer} from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';
import Spinner from 'react-native-spinkit'
import {withNavigation} from 'react-navigation';

import SlackMessage from './SlackMessage';

import {connect} from 'react-redux'
import {getQuestion, getQuestions, sendMessage, updateMessage} from '../../actions/questions'
import {getAnswerFromQuestion} from "../../actions/questions";
import question from "../../reducers/question";
import {prepareMessages, editMessages} from "../../utils";
import NewWordsList from "../../containers/NewWordsList";

class ListAnswers extends Component {
  state = {
    isReady : false,
    messages: [],
    question_id : this.props.navigation.getParam('id'),
    userAnswer : this.props.navigation.getParam('answer', ''), // default : null
    textInput :  this.props.navigation.getParam('answer', '') ? this.props.navigation.getParam('answer', '').answer_text : '',
    // textInput :  '',
    textInputFromProps : this.props.navigation.getParam('answer', '') ? this.props.navigation.getParam('answer', '').answer_text : '',
    checkUpdate : !!this.props.navigation.getParam('answer', ''),
    onFocusTextMessageInput : false
  }
  componentWillMount() {
    // this.setAnswer();
  }
  setAnswer = () => {
    // console.log(this.props.navigation.getParam('answer'));
    // const { answer_text } = this.props.navigation.getParam('answer')
    if (this.props.navigation.getParam('answer')) {
      this.setState({
        textInput : this.props.navigation.getParam('answer')
      }, () => {
        this.setState({
          isReady : true
        })
      });
    }
  }

  _getAnswerFromQuestion = () => {
    const { dispatch } = this.props;
    dispatch(getAnswerFromQuestion(this.state.question_id)).then((messages) => {
      console.log(messages)
      // return;
      this.setState({
        messages : messages.map((message) => {
          return {
            // ...message,
            _id : message.id.toString(),
            text : message.answer_text,
            createdAt: new Date(message.created_at),
            user : {
              ...message.user,
              _id : message.user.id,
              // avatar :
            }
          }
        })
      });
    });
  }

  componentDidMount () {
    // Not sure about What this function is really used for.
    // this.setAnswer();

    // TODO:
    // - Have a bug when Current user have an Answer with the Topic and move to this Screen.
    this._getAnswerFromQuestion();

  }

  onSend(messages = []) {
    const { navigation, dispatch } = this.props;

    // const user_id = user.id;
    const question_id = navigation.getParam('id',0);
    const answer_text = messages[0].text;
    // messages[0].id = 10;

    // TODO: check textInput exist or not.
    if (this.state.checkUpdate) {
      // update
      const userAnswerID = this.state.userAnswer.id;
      // console.log( userAnswerID )
      dispatch(updateMessage(userAnswerID, answer_text))
        .then((result) => {
          // update text Input
          this.setState({
            textInput : result.answer_text, // Because React gifted chat will remove this each time we hit Send button.
            previousMessage : result.answer_text
          });
          // update state messages.
          this.setState({
            messages : this.state.messages.map((message) => {
              if (message.id === userAnswerID) { // message_id = question_id now.
                message.text = result.answer_text;
              }
              return message;
            })
          });
          // TODO: Call update state.
          this.updateParentState();
        })
    } else {
      // add new
      dispatch(sendMessage(question_id, answer_text))
        .then((result) => {
          // TODO: Append to front-end after it's called successfully.
          messages = messages.map((message) => {
            return {
              ...message,
              id : result.id
            }
          })
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
          }))
          /* Update check variable */
          this.setState({
            checkUpdate : true,
            userAnswer : result,
            textInput : result.answer_text,
            previousMessage : result.answer_text
          })
          // TODO: call update state
          this.updateParentState();
        });
    }
  }

  updateParentState = async () => {
    // TODO: Update Answers Count for just 1 Question.
    // - call action get -> DONE
    // - set params via call back.
    const { navigation, dispatch} = this.props;
    const question_id = navigation.getParam('id');

    // const { topic_id, page } = this.state;
    const questionData = await dispatch(getQuestion(question_id));
    this.props.navigation.state.params.onNavigateBack(questionData)
  }

  renderMessage(props) {
    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
        backgroundColor : 'red'
      };
    }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }


  renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputProps={{
          onFocus : () => {
            this.setState({
              onFocusTextMessageInput : true
            })
          },
          onBlur : () => {
            this.setState({
              onFocusTextMessageInput : false
            })
          }
        }}
        ref={ref => this.textMessageInput = ref}
      />
    );
  }

  renderInputToolbar = (props) => {
    // return (
    //   <View>
    //     {/*<NewWordsList/>*/}
    //     <InputToolbar/>
    //   </View>
    // );

    return (
      <InputToolbar
        {...props}
      />
    );
  }

  render() {
    // const answer = this.props.navigation.getParam('answer', '');
    // const textInput = (answer && answer.answer_text) ? answer.answer_text : '';

    // TODO: return <Spinner type={'ThreeBounce'}/>;
    // if (!this.state.isReady) return <Spinner type={'ThreeBounce'}/>;

    // TODO: Should check these things.
    // renderAccessory - Custom second line of actions below the message composer
    // renderComposer - TextInput

    return (
      <GiftedChat
        // ref={GiftedChatRef => {
        //   console.log('GiftedChatRef REFERENCE');
        //   console.log(GiftedChatRef)
        // }}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.auth.user.id,
          // name: 'React Native',
          // avatar: 'https://placeimg.com/140/ 140/any',
        }}
        renderMessage={this.renderMessage}
        // renderSystemMessage={this.renderSystemMessage}
        showUserAvatar={true}
        text={this.state.textInput}
        onInputTextChanged={(textInput) => {
          if (textInput && this.textMessageInput && this.state.onFocusTextMessageInput) {
            this.setState({textInput})
          }
        }}
        renderComposer={this.renderComposer}
        // TODO:
        // Fix an Bug with Big space between Accessory and Text Input.
        // renderAccessory={() => {
        //   return (
        //     <View style={{
        //       backgroundColor : 'red',
        //       padding : 0
        //     }}>
        //       <Text>Jack</Text>
        //     </View>
        //   )
        // }}
        // accessoryStyle={{
        //   padding : 0,
        //   backgroundColor : 'red',
        // }}
        renderInputToolbar={this.renderInputToolbar}
        placeholder="Let's answer..."
      />
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withNavigation(ListAnswers));
