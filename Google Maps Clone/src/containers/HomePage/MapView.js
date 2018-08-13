import React from 'react';
import Map from '../../components/HomePage/MapView';
import {
  changeRegion,
  getCurrentLocation, setMapView,
  setSteps,

  fetchNotePlaces,
  setNotePlaces, animateToNavigate, setDropDown, sendMarkers,

  setRefNavigation
} from '../../actions';

import { connect } from 'react-redux';

const mapStateToProps = state => state.mapReducers;

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCurrentLocation : () => {
      dispatch(getCurrentLocation());
      // dispatch(animateToCoordinate());
    },
    setMapView : (mapView) => {
      dispatch(setMapView(mapView))
    },
    fetchNotePlaces : () => {
      dispatch(fetchNotePlaces());
    },
    setNotePlaces : (notePlaces) => {
      dispatch(setNotePlaces(notePlaces));
    },
    setRegion : (region) => {
      dispatch(changeRegion(region));
    },
    animateToNavigate : (newRegion,rotationAngle) => {
      dispatch(animateToNavigate(newRegion,rotationAngle));
    },
    setDropDown : (dropDown) => {
      dispatch(setDropDown(dropDown));
    },
    sendTrafficCarReport : () => {
      dispatch(sendMarkers('traffic'));
    },
    setRefNavigation : (refNavigation) => {
      dispatch(setRefNavigation(refNavigation));
    },
    setSteps : (steps) => {
      dispatch(setSteps(steps));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Map);