/** TODO:
 * 1. save global endpoint
 */
import { USER_START_AUTHORIZING, USER_AUTHORIZED,
    // SEND_MESSAGE, ADD_MESSAGE, START_FETCHING_MESSAGES
    LOGIN,
    GET_AUTH_USER
} from './actionNames';
import {LOGIN_URL, USER_URL} from '../config/urls'; 

// export const userStartAuthorizing = () => {
//     return {
//         type : USER_START_AUTHORIZING
//     };
// };

// export const userAuthorized = () => {
//     return {
//         type : USER_AUTHORIZED
//     };
// };

export const loginDefault = (email, password) => {
    return (dispatch) => {
        dispatch({
            type : LOGIN.PENDING,
        });
        return fetchAccessToken(email, password)
        .then((result) => {
            // Check error with Login Fail
            if (result.message) {
                dispatch({
                    type : LOGIN.ERROR,
                    payload : result.message
                });
            } else {
                dispatch({
                    type : LOGIN.SUCCESS,
                    payload : result.access_token
                });
            }
        })
        .catch((error) => {
            dispatch({
                type : LOGIN.ERROR,
                payload : error
            });
        });
    }
};

export const getUser = () => {
    return (dispatch, getState) => {
        // console.log('getState inside getUser');
        dispatch({
            type : GET_AUTH_USER.PENDING
        });
        return fetchAuthUser(getState().user.accessToken)
        .then((result) => {
            // GET_AUTH_USER
            if (result.message) {
                dispatch({
                    type : GET_AUTH_USER.ERROR,
                    payload : result.message
                });
            } else {
                dispatch({
                    type : GET_AUTH_USER.SUCCESS,
                    payload : result
                });
            }
        })
        .catch((error) => {
            dispatch({
                type : GET_AUTH_USER.ERROR,
                payload : error
            });
        });
    }
}


export const fetchAuthUser = async accessToken => {
    const response = await fetch(USER_URL, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + accessToken 
        }
    });
    return response.json();
}





// fetch access token
export const fetchAccessToken = async (email, password) => {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            email : email,
            password : password
        }),
    })
    
    return response.json();
}