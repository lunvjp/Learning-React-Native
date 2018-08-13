import CurrentLocationButton from '../../components/HomePage/CurrentLocationButton';
import {
  getCurrentLocation, animateToCoordinate,
  setCoordinates,
  animateToNavigate, goDisplayRoute,

  goNavigateRoute
} from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  // console.log('mapStateToProps of CurrentLocationButton');
  return {
    mapView : state.mapReducers.mapView,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPress : () => {
      dispatch(getCurrentLocation());
      dispatch(animateToCoordinate());
      // TEST
      dispatch(setCoordinates({
        latitude : 16.0362752,
        longitude : 108.216101
      }));
    },
    onPressTest : () => {
      dispatch(animateToNavigate({
        latitude : 16.0362752,
        longitude : 108.216101
      }));
    },
    goDisplayRoute : () => {
      dispatch(goDisplayRoute());
    },
    goNavigateRoute : () => {
      dispatch(goNavigateRoute());
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CurrentLocationButton);