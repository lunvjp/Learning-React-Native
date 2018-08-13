import React from 'react';
import MapScreen from '../../components/HomePage/MapScreen';
import {
  setDropDown,

  fetchNotePlaces, getCurrentLocation, setMapView
} from '../../actions';

import { connect } from 'react-redux';

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotePlaces : () => {
      dispatch(fetchNotePlaces());
    },
    setDropDown : (dropDown) => {
      dispatch(setDropDown(dropDown));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(MapScreen);