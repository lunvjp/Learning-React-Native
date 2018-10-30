import { USER_START_AUTHORIZING, USER_AUTHORIZED,
  LOGIN,
  GET_AUTH_USER
} from '../actions/actionNames';
const initializeState = {
  isLoggingIn : false,
  isAuthenticated : false, // after get access Token successfully.
  isPendingUser : false,
  accessToken : null,
  hasInitialUser : false, // global variable check current user.
  user : {},
  error : '',
  // ------------------------------
  name : '',
  avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
  // authorizing : false,
  // authorized : false
}; // initialize User.
const user = (state = initializeState, action) => {
  switch(action.type) {
    /* LOGIN */
    case LOGIN.PENDING:
      return Object.assign({}, state, {
        isLoggingIn : true,
        isAuthenticated : false
      });
    case LOGIN.SUCCESS:
      return Object.assign({}, state, {
        isLoggingIn : false,
        isAuthenticated : true,
        accessToken : action.payload
      });
    case LOGIN.ERROR:
      return Object.assign({}, state, {
        isLoggingIn : false,
        isAuthenticated : false,
        error : action.payload
      });
    /* REGISTER */

    /* GET_AUTH_USER */
    case GET_AUTH_USER.PENDING: 
      return Object.assign({}, state, {
        isPendingUser : true
      });
    case GET_AUTH_USER.SUCCESS:
      return Object.assign({}, state, {
        isPendingUser : false,
        user : action.payload,
        hasInitialUser : true
        // TODO: Logout => hasInitialUser : false
      });
    case GET_AUTH_USER.ERROR:
      return Object.assign({}, state, {
        isPendingUser : false,
        error : action.payload
      });
    /* LOGOUT */



    // case USER_START_AUTHORIZING:
    //   return Object.assign({}, state, {
    //     authorizing : true
    //   });
    // case USER_AUTHORIZED:
    //   return Object.assign({}, state, {
    //     authorizing : false,
    //     authorized : true
    //   });
    default:
      return state;
  }
};
export default user;