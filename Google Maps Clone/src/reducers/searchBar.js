import {
  SET_SEARCH_INPUT, SET_RESULT_ITEMS, SET_DISPLAY_TOP_SEARCH_BAR
} from "../actions/actionTypes";

const initialState = {
  searchInput : '',
  resultItems : [],
  displayTopSearchBar : false
};
/**
 * 1. Action Set searchInput: SET_SEARCH_INPUT
 * 2. Action thay đổi resultItems: SET_RESULT_ITEMS
 * 3. Action thay đổi displayTopSearchBar: SET_DISPLAY_TOP_SEARCH_BAR
 */
const searchBar = (state = initialState, action) => {
  switch(action.type) {
    case SET_SEARCH_INPUT:
      return Object.assign({}, state, {
        searchInput : action.searchInput
      });
    case SET_RESULT_ITEMS:
      return Object.assign({}, state, {
        resultItems : action.resultItems
      });
    case SET_DISPLAY_TOP_SEARCH_BAR:
      return Object.assign({}, state, {
        displayTopSearchBar : !state.displayTopSearchBar
      });
    default: return state;
  }
};
export default searchBar;