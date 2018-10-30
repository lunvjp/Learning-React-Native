import { NavigationActions } from 'react-navigation';

import Root from '../navigation/Root';

// const initialState = Root.router.getStateForAction(Root.router.getActionForPathAndParams('Unauthorized'));

// const initialNavState = {
//   index: 1,
//   routes: [
//     { key: 'InitA', routeName: 'Unauthorized' },
//     { key: 'InitB', routeName: 'Authorized' },
//   ],
// };

const initialState = Root.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  // let nextState;
  // console.log(action);
  // switch(action.type) {
  //   case 'LoginScreen':
  //     nextState = Root.router.getStateForAction(
  //       NavigationActions.navigate({ routeName: 'LoginScreen' }),
  //       state
  //     );
  //     break;
  //   case 'ListTopic':
  //     nextState = Root.router.getStateForAction(
  //       NavigationActions.navigate({ routeName: 'ListTopic' }),
  //       state
  //     );
  //     break;
  //   case 'Chat':
  //     nextState = Root.router.getStateForAction(
  //       NavigationActions.navigate({ routeName: 'Chat' }),
  //       state
  //     );
  //     break;
  //   default : break
  // }
  
  // return Navigator.router.getStateForAction(action, state)
  let newState = Root.router.getStateForAction(action, state);
  return newState || state;
};
// ======================================
// const AppNavigator = createStackNavigator(AppRouteConfigs);

// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Unauthorized'));

// const navReducer = (state = initialState, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);

//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };
