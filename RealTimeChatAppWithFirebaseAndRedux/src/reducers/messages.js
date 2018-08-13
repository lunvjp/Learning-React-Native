import { ADD_MESSAGE, SEND_MESSAGE } from "../actions/actionNames";

const message = (state = [], action) => {
  switch(action.type) {
    case ADD_MESSAGE :
      return {
        id : action.id,
        text : action.text,
        time : action.time,
        author : action.author
      };
    // Because in ADD_MESSAGE, it's already return with New Message. So we just need to
    default :
      return state;
  }
};

/** MESSAGES ============================ **/
const messages = (state = [], action) => {
  switch(action.type) {
    case ADD_MESSAGE :
      // Check if action.ID exist or not.
      if (state.map(item => item.id).includes(action.id)) {
        return state;
      } else {
        return [
          ...state,
          message(undefined,action)
        ];
      }
    case SEND_MESSAGE: {
      return [
        ...state,
        message(undefined,action)
      ];
    }
    default:
      return state;
  }
};
export default messages;
/** ============================ **/