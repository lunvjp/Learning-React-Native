/** TODO:
 * 1. save global endpoint
 */
import {AsyncStorage} from 'react-native';
import {
  USER_START_AUTHORIZING, USER_AUTHORIZED,
  // SEND_MESSAGE, ADD_MESSAGE, START_FETCHING_MESSAGES
  LOGIN,
  GET_AUTH_USER,
  LOGOUT
} from './actionNames';
import {LOGIN_URL, USER_URL} from '../config/urls';
import messages from '../config/messages'

export const loginDefault = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN.PENDING,
    });
    return new Promise((resolve, reject) => {
      fetchAccessToken(email, password)
        .then(async (result) => {
          // Check error with Login Fail
          if (result.message) {
            dispatch({
              type: LOGIN.ERROR,
              payload: result.message
            });
            // resolve(false);
          } else {
            dispatch({
              type: LOGIN.SUCCESS,
              payload: result.access_token
            });
            await AsyncStorage.setItem('accessToken', result.access_token);
            // resolve(true);
          }
          resolve(result)
        })
        .catch((error) => {
          let errorMessage = error.message;
          if (error.message === 'Network request failed') {
            errorMessage = messages.LOGIN.NETWORK_FAIL.text
          }
          dispatch({
            type: LOGIN.ERROR,
            payload: errorMessage
          });
          reject(errorMessage);
        });
    });
  }
};

export const getUser = () => {
  return (dispatch, getState) => {
    // console.log('getState inside getUser');
    dispatch({
      type: GET_AUTH_USER.PENDING
    });
    return fetchAuthUser(getState().auth.accessToken)
      .then((result) => {
        if (result.message) {
          dispatch({
            type: GET_AUTH_USER.ERROR,
            payload: result.message
          });
        } else {
          dispatch({
            type: GET_AUTH_USER.SUCCESS,
            payload: result
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_AUTH_USER.ERROR,
          payload: error
        });
      });
  }
}


export const fetchAuthUser = async accessToken => {
  const response = await fetch(USER_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  });
  return response.json();
}


// fetch access token
export const fetchAccessToken = async (email, password) => {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })

  return response.json();
}

export const signOut = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT.PENDING
    });
    return AsyncStorage.clear()
      .then((() => {
        dispatch({
          type: LOGOUT.SUCCESS
        });
      }))
      .catch((error) => {
        dispatch({
          type: LOGOUT.ERROR,
          payload: error
        });
      });
  }
}
