/**
 * 1. Thêm MapView vào cái Component này.
 * 2. Cần có những props sau:
 * - Hiển thị những nơi Recommendations: recommendations.
 * - Tìm kiếm cái gì (Đồ ăn, đồ uống): LookingFor
 *
 * 3. Dùng MapView.Animated để làm cái này. Mỗi điểm sẽ là 1 MapView.Marker
 *
 * */
import {
  TouchableOpacity, View, Text
} from 'react-native';
import MapView, {AnimatedRegion} from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';

const RecommendataionMaps = (initializeRegion, recommendations, lookingFor) => (
  <MapView
    style={{
      flex:1
    }}
    initialRegion={this.initializeRegion}
    showsUserLocation={true}
  >
    {recommendations.map(
      (marker) => (
        <Marker.Animated coordinate={new AnimatedRegion({
          latitude: 16.0312514,
          longitude: 108.21990})}/>
      )
    )}
  </MapView>
);
export default RecommendataionMaps;
// class GPlacesDemo extends Component {
//   openSearchModal() {
//     RNGooglePlaces.openPlacePickerModal()
//       .then((place) => {
//         console.log(place);
//         // place represents user's selection from the
//         // suggestions and it is a simplified Google Place object.
//       })
//       .catch(error => console.log(error.message));  // error is a Javascript Error object
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => this.openSearchModal()}
//         >
//           <Text>Open Place Picker</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
// export default GPlacesDemo;