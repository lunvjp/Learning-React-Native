import { USER_START_AUTHORIZING, USER_AUTHORIZED, 
    // SEND_MESSAGE, ADD_MESSAGE, START_FETCHING_MESSAGES 
} from './actionNames';

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