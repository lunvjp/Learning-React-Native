/**
 ** Message Actions
 * 1. Add message
 * 2. Send message
 * 3. Start fetch messages
 * 4.
 *
 ** Message Reducers
 * 1. Fetch Messages.
 * - Start display Loading Image
 * - Get data from Firebase function.
 * + In the function return value from Firebase, we again start call other function to handle something with that data. So basically we will make a loop to add each items to ListView (types of List)
 * + After we push all data from Firebase database,
 * 2. Dispatch
 * 3.
 *
 ** User Actions
 * 1. Set User Name
 * 2. Set USer Avatar
 * 3. User Start Authorizing
 * 4. User Authorized
 *
 *
 * User reducers:
 * 1. Login: Use (User start Authorizing) and (Login Method from Firebase)
 * - Start displaying a Loading Image
 * - Use Firebase function to help users sign in.
 * + if it will be successful, we will hide Loading Image
 * + And show Messages List for users.
 * 2.
 *
 * Chat Room Reducers:
 * 1.
 */
import { USER_START_AUTHORIZING, USER_AUTHORIZED, SEND_MESSAGE, ADD_MESSAGE, START_FETCHING_MESSAGES } from './actionNames';
import firebase from '../firebase';
// import DeviceInfo from 'react-native-device-info';

export const userStartAuthorizing = () => {
  return {
    type : USER_START_AUTHORIZING
  };
};

export const userAuthorized = () => {
  return {
    type : USER_AUTHORIZED
  };
};


/** USERS ======================================= **/
export const startFetchMessages = () => {
  return {
    type : START_FETCHING_MESSAGES
  }
};

export const login = () => {
  return (dispatch, getState) => {
    dispatch(userStartAuthorizing());
    firebase.auth().signInAnonymously().then((userCurrent) => {
      let user = userCurrent.user;
      console.log('LOGIN SUCCESSFULLY!');
      console.log(user);
      let userStatusDatabaseRef = firebase.database().ref('/status/' + user.uid);
      console.log(userStatusDatabaseRef);
      const isOfflineForDatabase = {
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };
      const isOnlineForDatabase = {
        state: 'online',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };

      firebase.database().ref('.info/connected').on('value', function(snapshot) {

        console.log('CHECKED BEFORE RUNNING SOMETHING FOR THESE THING!');
        console.log(snapshot.val());
        // If we're not currently connected, don't do anything.
        if (!snapshot.val()) {
          return;
        }

        console.log('CHECK CONNECTED OR NOT');
        console.log(snapshot.val());
        // If we are currently connected, then use the 'onDisconnect()'
        // method to add a set which will only trigger once this
        // client has disconnected by closing the app,
        // losing internet, or any other means.
        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
          // The promise returned from .onDisconnect().set() will
          // resolve as soon as the server acknowledges the onDisconnect()
          // request, NOT once we've actually disconnected:
          // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

          // We can now safely set ourselves as 'online' knowing that the
          // server will mark us as offline once we lose connection.

          userStatusDatabaseRef.set(isOnlineForDatabase);
        });
      });

      const { name, avatar } = getState().user;
      firebase.database().ref(`users/${user.uid}`).set({
        name,
        avatar
      });
      // Start Chatting by move users to the next screen with A List of Messages.

      // Hide the loading screen.
      dispatch(userAuthorized());

      /** GET MESSAGES FROM FIREBASE ==================================== **/
      dispatch(startFetchMessages());
      // Start fetch Messages while we're displaying Loading Image.
      // TODO: Testing get Messages from Firebase database.
      firebase.database()
        .ref('messages')
        .on('value', function (snapshot) {
          // Each values will add to Messages of receiveMEssages.
          const messages = snapshot.val() || [];
          Object.values(messages).forEach((msg) => {
            dispatch(addMessage(msg));
          });
      });

      // Hide that one
      // TODO: get messages from Firebase database.
      /** ==================================== **/
    });
  }
};

export const loginFacebook = () => {
    return (dispatch, getState) => {
        dispatch(userStartAuthorizing());

        // Login Facebook Function
        var provider = new firebase.auth.FacebookAuthProvider();
//        firebase.auth().signInWithPopup(provider).then(function(result) {
//          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//          var token = result.credential.accessToken;
//          // The signed-in user info.
//          var user = result.user;
//          console.log(user);
//          dispatch(userAuthorized());
//
//          // ...
//        }).catch(function(error) {
//          // Handle Errors here.
//          var errorCode = error.code;
//          var errorMessage = error.message;
//          // The email of the user's account used.
//          var email = error.email;
//          // The firebase.auth.AuthCredential type that was used.
//          var credential = error.credential;
//          // ...
//        });

        firebase.auth().signInWithRedirect(provider);

        firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // ...
          }
          // The signed-in user info.
          var user = result.user;

            console.log(user);
            dispatch(userAuthorized());
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }
}

export const addMessage = (msg) => ({
  type : ADD_MESSAGE,
  ...msg
});

export const sendMessage = (newMessage) => {
  // Send Message to Firebase Database.
  // Return a function from redux-thunk.
  return (dispatch) => {
    let msg = {
      text : newMessage,
      time : Date.now(),
      author : {
        name : '',
        avatar : ''
      }
    };
    const newRef = firebase.database().ref('messages').push();
    msg.id = newRef.key;
    firebase.database().ref(`messages/${newRef.key}`).set(msg);
    dispatch(addMessage(msg));
  }
};