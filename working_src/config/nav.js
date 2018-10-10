import {createStackNavigator} from 'react-navigation';

import Main from '../components/login/components/Main';
// import RemindMeButton from '../components/RemindMeButton';
// import SocialMediaButton from '../components/SocialMediaButton';
// import TalkInfo from '../components/TalkInfo';
// import topicList from '../components/topicList';

import ChatScreen from '../screens/ChatScreen';
import MessageScreen from '../screens/MessageScreen';
import ListTopicScreen from '../screens/ListTopicScreen';
import QuestionScreen from '../screens/QuestionScreen';
import AnswerQuestionScreen from '../screens/AnswerQuestionScreen';

// const ExampleRoutes = {
//   Login,
//   Chat,
//   RemindMeButton,
//   SocialMediaButton,
//   TalkInfo,
//   topicList
// };

const ListAndUserStack = createStackNavigator({
  QuestionScreen : {
    screen : QuestionScreen
  },
  AnswerQuestionScreen : {
    screen : AnswerQuestionScreen
  }
});

export default {
  ExampleRoutes : {
    Main,
    // RemindMeButton,
    // SocialMediaButton,
    // TalkInfo,
    ChatScreen,
    MessageScreen,
    ListTopicScreen,
    // topicList
    // QuestionScreen,
    // AnswerQuestionScreen,
    ListAndUserStack
  }
}