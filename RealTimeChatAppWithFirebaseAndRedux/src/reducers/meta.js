import { START_FETCHING_MESSAGES } from "../actions/actionNames";
const initializeMeta = {
  isFetching : false,
  lastFetched : null
};
const meta = (meta = initializeMeta, action) => {
  switch(action.type) {
    case START_FETCHING_MESSAGES:
      return Object.assign({}, meta, {
        isFetching : true
      });
    default : return meta;
  }
};
export default meta;