import mapReducers from './mapReducers';
import searchBar from './searchBar';
import {
  combineReducers
} from 'redux';
import ButtonScreen from "./ButtonScreen";

const allReducers = combineReducers({
  mapReducers,
  searchBar,
  ButtonScreen
});
export default allReducers;