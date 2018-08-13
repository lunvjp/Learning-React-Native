import {
  SET_RECOMMENDATIONS, GET_CURRENT_LOCATION, CHANGE_REGION,
  CHANGE_NOTE_PLACES, SET_MAP_VIEW, SET_COORDINATES,
  SET_DROP_DOWN,
  SET_REF_NAVIGATION,
  SET_STEPS,

  SET_SEARCH_INPUT,
  SET_RESULT_ITEMS,
  SET_DISPLAY_TOP_SEARCH_BAR,
  SET_NOTE_PLACES,

  ADD_MARKER
} from "./actionTypes";
import React from 'react';
import {
  Alert,
  Dimensions, Image
} from 'react-native';
import RNGooglePlaces from "react-native-google-places";
import firebase from 'react-native-firebase';
import queryString from 'query-string';

import {
  messagesReportItems
} from '../config/constants';
import images from '../config/images';
import { GOOGLE_MAPS_APIKEY, HERE_MAPS_APP_ID, HERE_MAPS_APP_CODE } from '../config/settings';

import {NavigationModes} from "react-native-maps-navigation";

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/** MapView Screen */
export const setRecommendations = (recommendations) => {
  return {
    type : SET_RECOMMENDATIONS,
    recommendations : recommendations
  }
};

export const setSteps = (steps) => {
  return {
    type : SET_DROP_DOWN,
    steps : steps
  }
};

export const setDropDown = (dropDown) => {
  return {
    type : SET_DROP_DOWN,
    dropDown : dropDown
  }
};

export const setRefNavigation = (refNavigation) => {
  return {
    type : SET_REF_NAVIGATION,
    refNavigation : refNavigation
  }
};

export const goDisplayRoute = () => {
  return (dispatch, getState) => {
    const {
      origin, destination, travelMode, refNavigation
    } = getState().mapReducers;

    refNavigation.displayRoute(
      origin,
      destination,
      {
        mode: travelMode
      }
    ).then(route => {
      console.log(route);
    });

  }
};

export const goNavigateRoute = () => {
  return (dispatch, getState) => {

    const {
      origin, destination, travelMode, refNavigation
    } = getState().mapReducers;

    refNavigation.navigateRoute(
      origin,
      destination,
      {
        mode: travelMode
      }
    ).then(route => {
      console.log(route);
    });

  }
};

// const DEFAULT_PADDING = { top: 0, right: 40, bottom: 40, left: 40 };
export const animateToCoordinate = () => {
  return (dispatch, getState) => {
    const state = getState().mapReducers;
    // const { mapView, latitude, longitude } = getState();

    if (state.initialRegion) {
      state.mapView.animateToCoordinate({
        latitude: state.initialRegion.latitude,
        longitude: state.initialRegion.longitude
      });
    }

    // state.mapView.fitToCoordinates([{
    //   latitude: state.initialRegion.latitude,
    //   longitude: state.initialRegion.longitude
    // }], {
    //   edgePadding: DEFAULT_PADDING,
    //   animated: true,
    // })
  }
};

export const getCurrentLocation = () => {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition((position => {
      dispatch(changeRegion({
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      }));
      // Animate the Map to current Location
      // dispatch(animateToCoordinate()); // DOING
    })
    , (error) => {
      console.log(error.message);
    },{
      enableHighAccuracy : true, timeout : 20000, maximumAge : 1000
    });
  }
};

export const changeRegion = (region) => {
  return {
    type : CHANGE_REGION,
    region : region
  };
};

export const setMapView = (mapView) => {
  return {
    type : SET_MAP_VIEW,
    mapView : mapView
  };
};

export const setCoordinates = (coordinate) => {
  return {
    type : SET_COORDINATES,
    coordinate : coordinate
  }
};

/** Search Bar */
// export const changeInputSearch = (text) => {
//   return {
//     type : CHANGE_INPUT_SEARCH,
//     text : text
//   };
// };

export const getDataFromAPI = (searchInput) => {
  return (dispatch, getState) => {
    if (!searchInput) {
      // searchInput = this.state.searchInput;

      // TODO
      return;
    }

    // Set empty for Recommendations.
    dispatch(setRecommendations([]));

    const {
      initialRegion, recommendations
    } = getState().mapReducers;
    console.log('JACK CHECK API');
    console.log(initialRegion);
    if (!initialRegion) return;

    console.log(initialRegion);

    /** =================================================================== */
    /** HERE MAPS **/
    let queryHereMaps = queryString.stringify({
      q : searchInput,
      at : initialRegion.latitude + ',' + initialRegion.longitude,
      app_id : HERE_MAPS_APP_ID,
      app_code : HERE_MAPS_APP_CODE
    });
    fetch(`https://places.api.here.com/places/v1/discover/search?${queryHereMaps}`)
      .then(response => response.json())
      .then((results) => {
        // console.log(results);

        // It worked, just commented for testing.
        dispatch(setRecommendations(
          recommendations.concat(results.results.items.map((item) => {
            return {
              latitude : item.position[0],
              longitude : item.position[1],
              title : item.title,
              description : item.vicinity,
              key : item.id
            }})
          )
        ))
      })
      .catch(error => console.log(error.message));
    /** =================================================================== */

    RNGooglePlaces.getAutocompletePredictions(searchInput, {
      type: 'establishments',
      latitude: initialRegion.latitude,
      longitude: initialRegion.longitude,
      radius: 100 // 100KM
    })
      .then((places) => {

        let listPlaces = [];
        places.map(async (place) => {
          console.log(place);

          // Lấy thông tin chi tiết của 1 nơi.
          let placeDetails = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.placeID}&key=${GOOGLE_MAPS_APIKEY}`
          );
          let json = JSON.parse(placeDetails._bodyText);
          let item = json.result;
          // TODO: Cố gắng lấy được URL của hình ảnh.
          console.log(item);


          listPlaces.push({
            latitude : item.geometry.location.lat,
            longitude : item.geometry.location.lng,
            name : item.name,
            address : item.formatted_address,
            phone : item.international_phone_number ? item.international_phone_number : '',
            key : item.place_id,

            // title : item.title,
            // description : item.vicinity,
          });

          console.log(listPlaces);

        });

        console.log('JACK CHECK LIST PLACES');
        console.log(listPlaces);
        return;

        /** **/
        let placeIDs = places.map((place) => {
          return place.placeID;
        });
        RNGooglePlaces.lookUpPlacesByIDs(placeIDs)
          .then((results) => {
            // console.log(results);
            this.setState({
              recommendations : this.state.recommendations.concat(
                results.map(item => {
                  return {
                    latitude : item.latitude,
                    longitude : item.longitude,
                    title : item.name,
                    description : item.address,
                    key : item.placeID
                  };
                })
              )
            });
          })
          .catch((error) => console.log(error.message));

        /******************************** */
      })
      .catch(error => console.log(error.message));
  }
};

/**
 * 1. Action Set searchInput: SET_SEARCH_INPUT
 * 2. Action thay đổi resultItems: SET_RESULT_ITEMS
 * 3. Action thay đổi displayTopSearchBar: SET_DISPLAY_TOP_SEARCH_BAR
 *
 *
case SET_SEARCH_INPUT:
 return Object.assign(state, {
        searchInput : action.searchInput
      });

 case SET_RESULT_ITEMS:
 return Object.assign(state, {
        resultItems : action.resultItems
      });

 case SET_DISPLAY_TOP_SEARCH_BAR:
 return Object.assign(state, {
        displayTopSearchBar : !state.displayTopSearchBar
      });

 */
// export const onFocusI = () => {
//   return (getState) => {
//     if (getState().searchBar.displayTopSearchBar) {
//       Keyboard.dismiss();
//     }
//   }
// };

export const setSearchInput = (searchInput) => {
  // if (this.props.displayTopSearchBar) {
  //   Keyboard.dismiss();
  // }
  return {
    type : SET_SEARCH_INPUT,
    searchInput : searchInput
  }
};

export const setResultItems = (resultItems) => {
  return {
    type : SET_RESULT_ITEMS,
    resultItems : resultItems
  }
};

export const setDisplayTopSearchBar = () => {
  return {
    type : SET_DISPLAY_TOP_SEARCH_BAR
  }
};

export const getItemFromList = (item) => {
  // Doing something for you guys and you want to be in the future.
  // console.log(item);


  // TODO: Cái này là lấy toạ độ của item mà mình click vào.
  let coordinate = {
    latitude: item.latitude,
    longitude: item.longitude,
  };

  // TODO: Dùng những action để mà thay đổi State của nó đi.
  this.setState({
    lookingFor : {
      slug : null
    },
    recommendations : [],
    coordinates : [
      coordinate
    ]
  });



  // this.mapView.fitToCoordinates([coordinate],{
  //   edgePadding: {
  //     right: (screen.width),
  //     bottom: (screen.height),
  //     left: (screen.width),
  //     top: (screen.height),
  //   }
  // });

  // TODO: Di chuyển cái Map đến vị trí đó khi mà mình click vào rồi.
  // this.mapView.animateToCoordinate(coordinate);
};

/** Button and Speed Actions */
export const setCurrentSpeed = (speed) => {
  return {
    type : SET_CURRENT_SPEED,
    speed : speed
  }
};

export const setMaxLimitSpeed = (speed) => {
  return {
    type : SET_MAX_LIMIT_SPEED,
    speed : speed
  }
};

/** Police Report **/
export const addMarker = (marker) => {
  return {
    type : ADD_MARKER,
    ...marker
  }
};

export const alertSuccess = (type) => {
  return (dispatch, getState) => {

    let item = messagesReportItems.filter(item => {
      return item.type === type
    })[0];

    const { dropDown } = getState().mapReducers;
    dropDown.alertWithType('success', '', item.message.success);
  }
};

// 1. type.
export const sendMarkers = (type) => {
  return (dispatch, getState) => {

    // TODO: Kiểm tra vị trí hiện tại trước khi mà bật APP

    // get Current User in our App
    const {
      initialRegion
    } = getState().mapReducers;
    if (!initialRegion) return;

    let newMarker = {
      coordinate : {
        latitude : initialRegion.latitude + ((Math.random() - 0.5) * (LATITUDE_DELTA )),
        longitude : initialRegion.longitude + ((Math.random() - 0.5) * (LATITUDE_DELTA ))
      },
      time : Date.now(),
      author : {
        name : 'WeDriver',
        avatar : 'https://lh3.ggpht.com/7JPOKRuanUwnX42dJ9H-PscC-sRkK43GQGRoklxusB4FKBPJEOJY3c7ZhQbcsXol-v8'
      },
      typeReport : type,
      like : 0,
      dislike : 0
    };

    let markerRef = firebase.database().ref('notePlaces').push();
    newMarker.id = markerRef.key;
    //
    markerRef.set(newMarker);
    //
    dispatch(addMarker(newMarker));
    //
    // // type
    dispatch(alertSuccess(type));
  }
};

export const setNotePlaces = (notePlaces) => {
  return {
    type : SET_NOTE_PLACES,
    notePlaces : notePlaces
  }
};

export const fetchNotePlaces = () => {
  return (dispatch) => {
    firebase.database().ref('/notePlaces').orderByKey().on('value',(snapshot => {
      const notes = snapshot.val() || [];
      console.log('Jack check fetch notes place');
      console.log(notes);

      dispatch(setNotePlaces(
        Object.values(notes).map((item) => ({...item}))
      ));
    }));
  }
};

/** TEST Actions **/
export const animateToNavigate = (newRegion,rotationAngle) => {
  return (dispatch, getState) => {
    const state = getState().mapReducers;
    if (state.initialRegion && state.mapView) {
      // state.mapView.animateToNavigation({
      //   latitude: state.initialRegion.latitude,
      //   longitude: state.initialRegion.longitude
      // }, -80, 90);
      //
      // state.mapView.animateToViewingAngle(45);

      state.mapView.animateToNavigation({
        latitude: state.initialRegion.latitude,
        longitude: state.initialRegion.longitude
      }, rotationAngle , 45);


      // const EDGE_PADDING = {
      //   top: 10,
      //   right: 10,
      //   bottom: 10,
      //   left: 10
      // };


      // state.mapView.fitToCoordinates([{
      //     latitude: state.initialRegion.latitude,
      //     longitude: state.initialRegion.longitude
      //   }],
      //   {
      //   edgePadding: EDGE_PADDING
      // }
      // );

    }
  }
};