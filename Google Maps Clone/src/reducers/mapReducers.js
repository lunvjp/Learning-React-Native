import {
  SET_RECOMMENDATIONS,
  GET_CURRENT_LOCATION,
  CHANGE_REGION,
  CHANGE_NOTE_PLACES,
  SET_MAP_VIEW,
  SET_COORDINATES,
  SET_DROP_DOWN,
  SET_REF_NAVIGATION,

  ADD_MARKER,
  SET_NOTE_PLACES
} from "../actions/actionTypes";
import {
  Dimensions
} from 'react-native';
import {NavigationModes, TravelModes} from "react-native-maps-navigation";
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const mapState = {
  origin: {latitude: 16.0907, longitude: 108.228},
  destination: 'Cầu Sông Hàn, Hải Châu, Đà Nẵng',
  navigationMode: NavigationModes.IDLE,
  travelMode: TravelModes.DRIVING,
  isFlipped: false,
  isNavigation: false,
  route: false,
  steps: false,
  refNavigation : null,
  rotation : 0,


  mapView : null,
  recommendations : [],
  initialRegion : null,
  // initialRegion : {
  //   latitude : 16.0323915,
  //   longitude : 108.1887678
  // },
  lookingFor : null,
  notePlaces : [],
  coordinates : [
    // {
    //   latitude : 16.0907225,
    //   longitude : 108.2284238
    // },
    // {
    //   latitude : 15.9467465,
    //   longitude : 108.1228108
    // }
  ],
  dropDown : null
};

const notePlace = (state, action) => {
  switch(action.type) {
    case ADD_MARKER:
      return {
        key : action.id,
        coordinate : action.coordinate,
        time : action.time,
        author : action.author,
        typeReport : action.typeReport,
        like : action.like,
        dislike : action.dislike
      };
    default: return state;
  }
};
/**
 * 1. Action thay đổi những địa điểm đề nghị
 * 2. Action thay đổi location hiện tại
 *
 * 3. Action thay đổi địa điểm kiếm
 * => Có thể gộp action thay đổi Chủ đề + thay đổi những địa điểm.
 * 4. Action thêm những cái Pin users vào. Ví dụ như: Police, Traffic.
 */
const mapReducers = (state = mapState, action) => {
  switch(action.type) {
    case SET_RECOMMENDATIONS:
      return Object.assign({}, state, {
        recommendations : action.recommendations
      });
    case SET_REF_NAVIGATION:
      return action.refNavigation ? Object.assign({}, state, {
        refNavigation : action.refNavigation
      }) : state;
    case SET_DROP_DOWN:
      return Object.assign({}, state, {
        dropDown : action.dropDown
      });
    case CHANGE_REGION:
      return Object.assign({}, state, {
        initialRegion : {
          latitude : action.region.latitude,
          longitude : action.region.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    case SET_MAP_VIEW:
      return Object.assign({}, state, {
        mapView : action.mapView
      });
    case SET_COORDINATES:
      return Object.assign({}, state, {
        coordinates : [
          ...state.coordinates,
          action.coordinate
        ]
      });
    case SET_NOTE_PLACES:
      return Object.assign({}, state, {
        notePlaces : action.notePlaces
      });
    case ADD_MARKER:
      return Object.assign({}, state, {
        notePlaces : [
          ...state.notePlaces,
          notePlace(undefined, action)
        ]
      });
    default:
      return mapState;
  }
};
export default mapReducers;
/**
 * 0. setNotePlaces
 * 1. addNewMarker: Thêm Marker mới setNotePlaces
 * 2. sendMarker: Gửi Marker lên Firebase
 * - Thành công thì add vào state.
 * 3. setNotePlaces
 * 4. Hình như cái đó là
 */