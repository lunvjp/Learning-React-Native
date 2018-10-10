import { createNavigationReducer } from 'react-navigation-redux-helpers';
// import Root from '../navigation/Root';

import user from './user';
// import meta from './meta';
// import messages from './messages';
import navigation from './navigation';

import { combineReducers } from 'redux';

// const navReducer = createNavigationReducer(Root);

const rootReducer = combineReducers({
//   messages,
//   meta,
  nav : navigation,
  user,
  
});
export default rootReducer;