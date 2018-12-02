import { GET_WORDS, ADD_NEW_WORD, REMOVE_WORD_FROM_LIST} from './type';
import {urls} from "../../config";

export const submitNote = async (name, user_id, topic_id, current_topic_id) => {
  const response = await fetch(urls.NOTE.POST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name : name,
      user_id: user_id,
      topic_id: topic_id,
      current_topic_id : current_topic_id
    })
  });
  // console.log(urls.NOTE.POST)
  // console.log( {
  //   name : name,
  //   user_id: user_id,
  //   topic_id: topic_id,
  //   current_topic_id : current_topic_id
  // } )
  // console.log(response)
  // console.log(response.json())
  return response.json();
}

export const addNewWord = (name, topic_id, current_topic_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_WORD.PENDING
    });
    const { id } = getState().auth.user;
    // name, user_id, topic_id
    return new Promise((resolve, reject) => {
      submitNote(name, id, topic_id, current_topic_id)
        .then((response) => {
          dispatch({
            type: ADD_NEW_WORD.SUCCESS,
            payload : response
          });
          console.log(response)
          resolve(response)
        })
        .catch((error) => {
          dispatch({
            type: ADD_NEW_WORD.ERROR,
            payload : error
          });
          console.log(error)
          reject(error)
        });
    });
  }
}

// COME BACK LATER.
export const fetchWords = async (topic_id, user_id) => {
  const response = await fetch(urls.NOTE.GET(topic_id, user_id));
  // console.log( urls.NOTE.GET(topic_id, user_id) )
  return response.json();
}
// GET_WORDS

export const getWords = (topic_id) => {
  return (dispatch, getState) => {
    dispatch({
      type : GET_WORDS.PENDING
    });
    const { id } = getState().auth.user;
    return new Promise((resolve, reject) => {
      fetchWords(topic_id, id)
        .then((response) => {
          dispatch({
            type : GET_WORDS.SUCCESS,
            payload : response
          });
          resolve(response);
        })
        .catch((error) => {
          dispatch({
            type : GET_WORDS.ERROR,
            payload : error
          });
          reject(error);
        })
    })
  }
}

/** Remove word from Note */
  // word_id, user_id, topic_id
export const deleteWord = async (word_id, user_id, topic_id) => {
  // http://localhost/englishchatapp/api/note
  // urls.NOTE.DELETE
  const response = await fetch('http://localhost/englishchatapp/api/note', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      word_id: word_id,
      user_id: user_id,
      topic_id: topic_id
    })
  });
  return response.json();
}

export const removeWordFromNote = (word_id, topic_id) => {
  return (dispatch, getState) => {
    const {id} = getState().auth.user;
    return new Promise((resolve, reject) => {
      deleteWord(word_id, id, topic_id)
        .then((result) => {
          // console.log(result)
          resolve(result);
        })
        .catch(error => {
          console.log(error)
          reject(error);
        });
    });
  }
}
