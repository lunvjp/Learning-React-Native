import { createStackNavigator } from 'react-navigation';

import ChatUI from '../components/chat';
import QuestionScreen from '../screens/QuestionScreen';
import AnswerQuestionScreen from '../screens/AnswerQuestionScreen';

const ListAndUserStack = createStackNavigator({
  QuestionScreen : {
    screen : QuestionScreen,
  },
  AnswerQuestionScreen : {
    screen : AnswerQuestionScreen
  }
});

const Root = createStackNavigator({
  QuestionScreen : {
    screen : QuestionScreen,
  },
  AnswerQuestionScreen : {
    screen : AnswerQuestionScreen
  }
});

// const Root = createStackNavigator({
//   Unauthorized : {
//     screen : ListAndUserStack
//   },
//   Authorized : {
//     screen : ChatUI
//   }
// });

export default Root;