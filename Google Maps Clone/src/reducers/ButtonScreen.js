const initialState = {
  currentSpeed : null,
  maxLimitSpeed : null
};

/**
 * 1. Action thay đổi tốc độ hiện tại
 * 2. Action thay đổi tốc độ giới hạn khi thay đổi trên mỗi đoạn đường.
 * - Đảm bảo rằng là khi nào mà API nó thay đổi thì dưới APP phải được cập nhật.
 * 1. SET_CURRENT_SPEED
 * 2. SET_MAX_LIMIT_SPEED
 */
export const SET_CURRENT_SPEED = 'SET_CURRENT_SPEED';
export const SET_MAX_LIMIT_SPEED = 'SET_MAX_LIMIT_SPEED';

const ButtonScreen = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_SPEED:
      return Object.assign({}, state, {
        currentSpeed : action.speed
      });
    case SET_MAX_LIMIT_SPEED:
      return Object.assign({}, state, {
        maxLimitSpeed : action.speed
      });
    default: return state;
  }
};
export default ButtonScreen;