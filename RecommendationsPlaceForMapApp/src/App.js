/**
 * State: There are 2 states in APP Component.
 * 1. mapRegion: null,
 * 2. gpsAccuracy: null
 * -
 *
 * 2. Tạo 1 cái Component RecommendationsMap lấy State của App truyền xuống.
 * - Dùng biến mapRegion để check khi mà có thông tin về map hay ko
 * + Nếu có thì cho hiển thị cái Map
 * + Nếu không thì mình cho hiển thị cái Loading xoay tròn (Cái Loading sẽ ở giữa)
 * - Cái Component này sẽ tạo prosp từ State của cái App.
 *
 * 3. Tạm thời mình sẽ dùng API của thằng
 *
 *
 *** Câu hỏi:
 * 1. Hàm WatchPosition dùng để lấy địa chỉ hiện tại và Support cho người dùng những địa điểm xung quanh.
 * 2.
 */
/** * Những cái mà mình sẽ hiển thị ra ngoài người dùng.
        food,
        drinks,
        coffee,
        shops,
        arts,
        outdoors,
        sights,
        trending,
        nextVenues: the venue is the place with lots of people often come there.
        topPicks: Display some good places really good without particular topics.
         */
// Khi mà click vào thì nó sẽ chuyển từ
import {
  CLIENT_ID, API_DEBOUNCE_TIME, CLIENT_SECRET, FOURSQUARE_ENDPOINT
} from './fourSquare';
import queryString from 'query-string';
import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar
} from 'react-native';
import MapView, {
  Marker, AnimatedRegion
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
// import RNGooglePlaces from 'react-native-google-places';
import MapViewDirections from 'react-native-maps-directions';

import RNGooglePlaces from 'react-native-google-places';
// import HEREMap from 'react-here-maps';
import images from './config/images';
import ThemeSearchBarExample from './components/searchScreen';
// import mapDarkStyle from './config/mapDarkStyle.json';

const origin = {latitude: 16.0381806, longitude: 108.1790};
const destination = {latitude: 16.0504306, longitude: 108.2161547};
const GOOGLE_MAPS_APIKEY = 'AIzaSyAmTl7BhoPdiEhgF2kDeCX3TU-EWQQx6J8';
/** ==================================================== (*/

const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// import faker from 'faker';
class App extends Component {
  constructor(props) {
    super(props);
    /** STATE
     * 1. recommendations: Chứa 1 List những Recommendations.
     * 2. gpsAccuracy: Độ chính xác của GPS để mà truyền vào lấy dữ liệu của FourSquare
     * @type {{}}
     */
    this.state = {
      recommendations : [],
      initialRegion : null,
      lookingFor : {
        slug : null
      },
      displayTopSearchBar : false,
      // headerLocation: Dựa vào Google API

      // TEST
      coordinates: [
        // {
        //   latitude: 16.0591576,
        //   longitude: 108.175441,
        // },
        // // {
        // //   latitude: 16.0361193,
        // //   longitude: 108.2116155,
        // // },
        // {
        //   latitude: 16.0325566,
        //   longitude: 108.212484,
        // },
      ],
    };
    this.mapView = null;
  }
  watchId = null;

  onDisplaySearchScreen() {
    this.setState({
      displayTopSearchBar : !this.state.displayTopSearchBar
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  // Rồi vậy thì hàm componentDidMount() đc gọi sau khi hàm render đc gọi
  // Ví dụ như là mình có thể hỏi hàm này dùng để làm gì thì bây giờ mình có thể trả lời đó là.
  // Hàm này thường được dùng khi mà fetch data từ Server (Tức là thường đc dùng trong việc lấy dữ liệu ở phía trên Server. )
  async componentWillMount() {
    await navigator.geolocation.getCurrentPosition((position) => {
      console.log('Kiểm tra Vị trí hiện tại.');
      console.log(position);
      this.setState({
        initialRegion : {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      });
    });
    // console.log(this.initialRegion);
  }
  async getCurrentLocation() {
    await navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      // console.log('Console inside componentWillMount');
      this.setState({
        initialRegion : {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      });
    });
  }
  getQueryFourSquareAPI = (lookingFor) =>  {
    return queryString.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      section : lookingFor || 'food',
      ll: '40.7243,-74.0018',
      // ll: `${this.state.initialRegion.latitude},${this.state.initialRegion.longitude}`,
      // query: 'coffee',
      v: '20180323',
      // limit: 1
    });
  };
  fetchPlacesFromAPI (topicName) {
    // TODO: Do cái slug này vẫn chưa thay đổi thế cho nên là nó đã return đi rồi.
    if (topicName.slug === this.state.lookingFor.slug) return;
    let searchInput = topicName.queryString;

    // Xoá những địa điểm hiện tại đang có trên MAP
    this.setState({
      recommendations : []
    });
    // await this.getCurrentLocation();
    // console.log(this.state.initialRegion);

    /** =================================================================== */
    /** HERE MAPS **/
    let queryHereMaps = queryString.stringify({
      q : searchInput,
      at : this.state.initialRegion.latitude + ',' + this.state.initialRegion.longitude,
      app_id : 'tyOgj0zCb4myh2vTZW97',
      app_code : 'tkAKgbUZbEqP1NXWg54ELA'
    });
    fetch(`https://places.api.here.com/places/v1/discover/search?${queryHereMaps}`)
      .then(response => response.json())
      .then((results) => {
        // console.log(results);
        this.setState({
          recommendations : this.state.recommendations.concat(
            results.results.items.map((item) => {
              return {
                latitude : item.position[0],
                longitude : item.position[1],
                title : item.title,
                description : item.vicinity,
                key : item.id
              }
            })
          )
        });
      })
      .catch(error => console.log(error.message));

    /** =================================================================== */
    /** GOOGLE MAPS **/
    RNGooglePlaces.getAutocompletePredictions(searchInput, {
      type: 'establishments',
      latitude: this.state.initialRegion.latitude,
      longitude: this.state.initialRegion.longitude,
      radius: 100
    })
      .then((places) => {
        // console.log(places);
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
      })
      .catch(error => console.log(error.message));
    /** =================================================================== */
    /** FOURSQUARE **/

    let query = this.getQueryFourSquareAPI();
    // fetch(`https://api.foursquare.com/v2/venues/explore?${query}`)
    fetch('https://api.foursquare.com/v2/venues/explore?near=NYC&oauth_token=4XMPCUHGSDZWTXZK004BYBSFGQSG4MP2ZVEOZ4KZGEAZINID&v=20180713')
      .then(response => response.json())
      .then(data => {
        // console.log(data.response.group);
        if (data.response.group) {
          this.setState({
            recommendations : data.response.group.reduce((all, item) => {
              all.concat(item.items)
            }, [])
          });
        }
      });

    // Lỗi chưa có dữ liệu nên nó bị lỗi
    // TODO: Dùng Async để làm cho nó chờ rồi mới lấy dữ liệu.
    // this.mapView.fitToCoordinates(this.state.recommendations);
  };
  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          initialRegion : {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });

        if (position) {
          //  this.fetchPlacesFromAPI();
        }
        /** ======================================== **/
        /**
         * 1.
         * - Sau khi lấy được vị trí hiện tại thì mình sẽ sử dụng vị trí này để mà dùng khi gọi API lấy thông tin
         * - Vậy thì trong hàm tạo câu Query, mình sẽ truyền cái toạ độ vào.
         * - Khi mà truyền vào được rồi thì bây giờ là lúc dể mà chúng ta có thể kết luận được hay khong là bạn có thưc sự yêu thích cái việc mà bạn làm App hay ko hay là bàn chỉ là thực sự mong muốn có 1 công việc ổn định giống như bạn nói.
         * - Vậy thì mình sẽ truyền vào Toạ Độ
         * - Sau đó mình sẽ truyền luôn vào độ chính xác GPS của Google Maps để mà có thể truyền vào câu Query để lấy data trên API.
         * => Tóm lại bây giờ mình sẽ oạtt
         * 2. Tạo được FourSquare API => DONE => Sử dụng API của thằng này bởi vì fourSquare nó yêu cầu thẻ khi mà đăng kí.
         * 3. Tạo đc câu Query bằng package QueryString
         * 4. Tạo 1 Fetch dữ liệu từ Địa điểm hiện tại và cái mà users muốn tìm kiếm (Đồ ăn, đồ uống hay là cái gì khác)
         * 5. Truyền qua MapView để cho nó hiển thị tất cả những vị trí đó.
         * 6.
         */
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }
  onSelectTopic = (lookingFor) => {
    // console.log(this.state.coordinates);
    // console.log(lookingFor);
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
    });
  };
  onMapPress = (e) => {
    // console.log('onMapPress!');
    // this.setState({
    //   coordinates: [
    //     ...this.state.coordinates,
    //     e.nativeEvent.coordinate,
    //   ],
    // });
  };
  onGetItemFromListPlace(item) {
    // console.log(item);
    let coordinate = {
      latitude: item.latitude,
      longitude: item.longitude,
    };
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
    this.mapView.animateToCoordinate(coordinate);
  }
  render() {
    return (
      <View style={{
        flex:1,
        // position : 'relative'
        // backgroundColor:'red'
      }}>
        <MapView
          provider={"google"}
          initialRegion={this.state.initialRegion}
          showsUserLocation={true}
          style={StyleSheet.absoluteFillObject} // absoluteFillObject

          ref={c => this.mapView = c}
          onPress={this.onMapPress}>
          {/*customMapStyle={mapDarkStyle}*/}

          {this.state.coordinates.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
          )}

          {(this.state.coordinates.length >= 2) && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              // waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
              destination={this.state.coordinates[this.state.coordinates.length-1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={10}
              strokeColor="hotpink"
              onStart={(params) => {
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
          {this.state.recommendations.map(
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
                    source={this.state.lookingFor.imageNameUrl ? this.state.lookingFor.imageNameUrl : images.lookingForLogo.atm}/>
                </View>
              </MapView.Marker>
            )
          )}
          </MapView>
        {/*{this.state.displayTopSearchBar && (*/}
          {/*<ThemeSearchBarExample {...this.state}*/}
                                 {/*onDisplaySearchScreen={this.onDisplaySearchScreen.bind(this)}*/}
                                 {/*onSelectTopic={this.onSelectTopic.bind(this)}*/}
                                 {/*onGetItemFromListPlace={this.onGetItemFromListPlace.bind(this)}/>*/}
        {/*)}*/}
        <ThemeSearchBarExample {...this.state}
                               onDisplaySearchScreen={this.onDisplaySearchScreen.bind(this)}
                               onSelectTopic={this.onSelectTopic.bind(this)}
                               onGetItemFromListPlace={this.onGetItemFromListPlace.bind(this)}/>
      </View>
    );
  }
}
// TODO:
// 1. Tạo những hình ảnh cho các địa điểm này ví dụ như là để làm thế nào để cho hiển thị cái xe ở trong cái hình chứ ko phải là 1 cái chấm hình tròn ở trong cái hình.

/*
<MapView
  region={this.state.region}
  onRegionChange={this.onRegionChange}
>
  {this.state.markers.map(marker => (
    <Marker
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
</MapView>
 */
export default App;
const styles = StyleSheet.create({
  // mapView : {
  //   flex:1
  // }
});