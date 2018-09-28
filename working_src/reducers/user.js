import { USER_START_AUTHORIZING, USER_AUTHORIZED } from '../actions/actionNames';
const initializeState = {
  name : '',
  avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
  authorizing : false,
  authorized : false
}; // initialize User.
const user = (state = initializeState, action) => {
  switch(action.type) {
    case USER_START_AUTHORIZING:
      return Object.assign({}, state, {
        authorizing : true
      });
    case USER_AUTHORIZED:
      return Object.assign({}, state, {
        authorizing : false,
        authorized : true
      });
    default:
      return state;
  }
};
export default user;