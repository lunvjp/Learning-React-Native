import React , {
  Component
} from 'react';
import {
  View, StyleSheet, Image, Text, Alert
} from 'react-native';
import MapViewNavigation, { NavigationModes, TravelModeBox, TravelIcons, Geocoder, TravelModes, DirectionsListView, ManeuverView, DurationDistanceView } from 'react-native-maps-navigation';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import DropdownAlert from 'react-native-dropdownalert';

import images from '../../config/images';
import { distanceBetweenPoints } from '../../config/helpers';
import { messagesReportItems } from '../../config/constants';
import { GOOGLE_MAPS_APIKEY } from '../../config/settings';


import mapDarkStyle from '../../config/mapDarkStyle.json';
// import { setMapView } from "../../actions";
import * as Animatable from 'react-native-animatable';
/**
 * 1. Khi bật App lên thì nó sẽ tự động zoom về vị trí hiện tại.
 */
import {
  Dimensions
} from 'react-native';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA_CURRENT_POSITION = 0.0922;
const LONGITUDE_DELTA_CURRENT_POSITION = LATITUDE_DELTA_CURRENT_POSITION * ASPECT_RATIO;

const getRotationAngle = (previousPosition, currentPosition) => {
  const x1 = previousPosition.latitude;
  const y1 = previousPosition.longitude;
  const x2 = currentPosition.latitude;
  const y2 = currentPosition.longitude;

  const xDiff = x2 - x1;
  const yDiff = y2 - y1;

  return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
};

const USE_METHODS = true;

class Map extends Component {
  mapView = null;
  dropDown = null;
  // refNavigation = null;
  constructor() {
    super();

    this.state = {
      // origin: {latitude: 37.78825, longitude: -122.4324},
      // destination: '132 Wilmot St, San Francisco, CA 94115',
      // navigationMode: NavigationModes.IDLE,
      // travelMode: TravelModes.DRIVING,
      // isFlipped: false,
      // isNavigation: false,
      // route: false,
      // step: false,
      rotation : 0
    }

    // this.state = {
    //   rotation : 0
    // };
  }

  componentWillMount() {
    this.props.fetchNotePlaces();
  }

  componentDidMount() {
    this.props.setMapView(this.mapView);
    this.props.onGetCurrentLocation();
    // if (this.refNavigation)  {
    //   this.goDisplayRoute();
    //   this.goNavigateRoute();
    // }

    // console.log(this.props.initialRegion);

    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   // const newRegion = {
    //   //   latitude: position.coords.latitude,
    //   //   longitude: position.coords.longitude
    //   // }
    //   // aconsole.log('watch Position!');
    //   // console.log(position);
    //   this.props.setRegion({
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude
    //   });
    //   this.props.animateToNavigate();
    // });

    // Navigation
    // if (this.props.initialRegion) {
      this.watchID = navigator.geolocation.watchPosition((position) => {

          if (this.props.initialRegion) {
            // console.log('watch Position in React Native');
            // console.log(position);

            const latestUpdatePosition = {
              latitude : this.props.initialRegion.latitude,
              longitude : this.props.initialRegion.longitude,
            };

            // const animationPosition = getPositionWithOffset({ latitude: position.coords.latitude, longitude: position.coords.longitude }, { dn: 0, de: 0 });
            console.log('animationPosition');
            const animationPosition = position.coords;
            const newRegion = {
              latitude: animationPosition.latitude,
              longitude: animationPosition.longitude,
              latitudeDelta: LATITUDE_DELTA_CURRENT_POSITION,
              longitudeDelta: LONGITUDE_DELTA_CURRENT_POSITION,
            };

            // const previousCoords = { latitude: this.state.region.latitude, longitude: this.state.region.longitude };
            const distanceMoved = distanceBetweenPoints(latestUpdatePosition, position.coords);
            const rotationAngle = getRotationAngle(latestUpdatePosition, position.coords);
            this.setState({
              rotation : rotationAngle - 180
            });
            console.log('Got new position, distanceMoved, rotationAngle', position, distanceMoved, rotationAngle);

            const userCurrentPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            // Update những notePlaces ở gần đó.
            // if (distanceMoved > MIN_METERS_NEEDED_FOR_UPDATE_MARKERS) {
            //   console.log('Going to call getNewMarkers with userCurrentPosition:', userCurrentPosition);
            //   // If more than MIN_METERS_NEEDED_FOR_UPDATE_MARKERS meters then get new markers
            //   this.props.getNewMarkers(userCurrentPosition.latitude, userCurrentPosition.longitude);
            //
            //
            //   this.setState({
            //     latestUpdatePosition: userCurrentPosition,
            //   });
            // }

            // TODO: Checking
            this.props.setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });

            console.log('Called navigator.geolocation.watchPosition. distanceMoved, rotationAngle, userCurrentPosition:', distanceMoved, rotationAngle, userCurrentPosition);
            // this.setState({
            //   distanceMoved,
            //   rotationAngle,
            //   userCurrentPosition,
            // });

            // this.map.animateToRegion(newRegion);
            // this.map.animateToBearing(rotationAngle);
            // this.map.animateToViewingAngle(45);

            this.props.animateToNavigate({
              latitude: animationPosition.latitude,
              longitude: animationPosition.longitude
            },rotationAngle);


          }

        },
        // (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter : 10}
      );
    // }

  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  // ...
  // onError = error => {
  //   if (error) {
  //     this.dropdown.alertWithType('error', 'Error', error);
  //   }
  // };
  // ...
  getTypeReportBySlug (type) {
    return messagesReportItems.filter((item ) => {
      return item.type === type;
    })[0];
  }

  onMapPress(e) {
    // console.log(e.nativeEvent.coordinate);
    // TESTING
    this.props.sendTrafficCarReport('traffic', e.nativeEvent.coordinate);
    // this.setState({
    //   markers: [
    //     ...this.state.markers,
    //     {
    //       coordinate: e.nativeEvent.coordinate,
    //       key: id++,
    //       color: randomColor(),
    //     },
    //   ],
    // });
  }

  render() {
    return (
        <MapView
          provider={"google"}
          initialRegion={this.props.initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          followsUserLocation={true}
          style={[StyleSheet.absoluteFillObject, {
            flex : 1,
          }]}
          ref={mapView => {
            this.mapView = mapView;
          }}
          customMapStyle={mapDarkStyle}
          minZoomLevel={5}
          loadingEnabled={true}
          onPress={(event) => this.onMapPress(event)}
        >
          <MapViewNavigation
            origin={this.props.origin}
            destination={this.props.destination}
            navigationMode={this.props.navigationMode}
            travelMode={this.props.travelMode}
            language='vi'
            ref={ref => {
              if (ref) {
                this.props.setRefNavigation(ref);
              }
            }}
            map={() => this.mapView}
            apiKey={GOOGLE_MAPS_APIKEY}
            simulate={true}
            // onRouteChange={route => this.setState({route})}
            onStepChange={(step, nextStep) => {
              console.log(step, nextStep);
              // this.setState({step, nextStep})
            }}
            displayDebugMarkers={true}
            onNavigationStarted={route => console.log("Navigation Started")}
            // onNavigationCompleted={route => this.setState({isNavigation: false})}
          />

          {this.props.initialRegion && (
            <MapView.Marker
              coordinate={{
                latitude : this.props.initialRegion.latitude,
                longitude : this.props.initialRegion.longitude
              }}
              anchor={{ x: 0.5, y: 0.5 }}
              image={images.car}
              rotation={this.state.rotation}
              // flat={true}
            />
          )}
          {this.props.coordinates && this.props.coordinates.length > 0 && this.props.coordinates.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
          )}

          {this.props.notePlaces && this.props.notePlaces.length > 0 && this.props.notePlaces.map((place) => {
            const markerItem = this.getTypeReportBySlug(place.typeReport);
            const imageUrl = markerItem.logoImage;
            return (
              <MapView.Marker key={`police${place.id}`}
                              coordinate={place.coordinate}
                              image={imageUrl}
              />);
          })}

          {/*<Animatable.Text animation="bounceIn" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
          {/*</View>*/}

          {/*<MapViewMarker animation="pulse" easing="ease-out" iterationCount="infinite"/>*/}

          {(this.props.coordinates.length >= 2) && (
            <MapViewDirections
              origin={this.props.coordinates[0]}
              // waypoints={ (this.props.coordinates.length > 2) ? this.props.coordinates.slice(1, -1): null}
              destination={this.props.coordinates[this.props.coordinates.length-1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={10}
              strokeColor="hotpink"
              onStart={(params) => {
                console.log('jack');
                console.log(params);
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={(result) => {
                console.log(result);
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    // right: (screen.width / 20),
                    right: (screen.width / 5),
                    // bottom: (screen.height / 20),
                    bottom: (screen.height / 5),
                    left: (screen.width / 5),
                    top: (screen.height / 5),
                  }
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}/>
          )}
          {this.props.recommendations.length > 0 && this.props.recommendations.map(
            (marker) => (
              <MapView.Marker coordinate={{latitude: marker.latitude,longitude: marker.longitude}}
                              title={marker.title}
                              description={marker.description}
                              key={marker.key}
                // image={require('../assets/images/HomePage/gas-station.png')}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 50,
                  }}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      margin : 7
                    }}
                    source={images.lookingForLogo.atm}/>
                </View>
              </MapView.Marker>
            )
          )}
        </MapView>
    );
  };
}
export default Map;