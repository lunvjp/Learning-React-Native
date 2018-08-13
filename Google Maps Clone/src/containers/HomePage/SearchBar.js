import SearchBar from '../../components/HomePage/SearchBar';
import {
  setSearchInput,
  setResultItems,
  setDisplayTopSearchBar,
  getDataFromAPI,

  goDisplayRoute
} from '../../actions';

import {
  connect
} from 'react-redux';
import searchBar from "../../reducers/searchBar";

const mapStateToProps = state => ({
  searchInput : state.searchBar.searchInput,
  resultItems : state.searchBar.resultItems,
  displayTopSearchBar : state.searchBar.displayTopSearchBar,
  refNavigation : state.mapReducers.refNavigation
});
// return state.searchBar;

const mapDispatchTopProps = (dispatch) => {
  return {
    setSearchInput : (searchInput) => {
      dispatch(setSearchInput(searchInput));
    },
    setResultItems : () => {
      dispatch(setResultItems())
    },
    setDisplayTopSearchBar : () => {
      dispatch(setDisplayTopSearchBar())
    },
    getDataFromAPI : (searchInput) => {
      dispatch(getDataFromAPI(searchInput));
    },
    onPlaceItem : () => {
      console.log('Click something for your life!');
    },
    goDisplayRoute : () => {
      dispatch(goDisplayRoute());
    },
    onSelectTopic : () => {
      console.log('Click Something to Top Search Bar');
      // This props properties know how to create something for other people.

      /**
       this.setState({
      coordinates : []
    });
       // TODO: Sau khi hiển thị OK thì ở trên khung Search nó sẽ có 1 nút X để tắt những địa điểm đã tìm
       this.fetchPlacesFromAPI(lookingFor); // lookingFor : Object

       // DOING
       console.log(this.state.recommendations);
       // this.mapView.fitToCoordinates(this.state.recommendations);
       // // Search Query and Set State of lookingFor
       // // lookingFor Image
       this.setState({
      lookingFor : lookingFor
    });]

       * */



      /**
       * this.props.onSelectTopic(topic);

       this.setState({
          searchInput : topic.queryString
        });

       this.setDisplayTopSearchBar();

       * */
    }
  }
};

export default connect(mapStateToProps,mapDispatchTopProps)(SearchBar);