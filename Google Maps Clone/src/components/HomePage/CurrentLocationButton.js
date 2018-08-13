import ActionButton from 'react-native-action-button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCurrentLocation, setCoordinates } from '../../actions';

import React, {
  Component
} from 'react';
import {
  View, StyleSheet
} from 'react-native';

class CurrentLocationButton extends Component {
  render() {
    return (
      <View style={[
        StyleSheet.absoluteFill,
        {
          // flex: 1,
          // backgroundColor : 'red',
          // position : 'absolute',
          // top : 0,
          // left : 0,
          // right : 0

        }
      ]}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        {/*<ActionButton buttonColor="#ffffff"*/}
                      {/*bgColor="#ff0000"*/}
                      {/*renderIcon={() => <MaterialIcons name="my-location" size={30} color="#666666" />}*/}
                      {/*onPress={() => {*/}
                        {/*this.props.onPress();*/}
                      {/*}}*/}
                      {/*fixNativeFeedbackRadius={true}*/}
                      {/*offsetX={20}*/}
                      {/*offsetY={20} />*/}
        <ActionButton buttonColor="#ffffff"
                      bgColor="#ff0000"
                      renderIcon={() => <MaterialIcons name="my-location" size={30} color="#666666" />}
                      onPress={() => {
                        this.props.goNavigateRoute();
                        // this.props.onPressTest();
                      }}
                      style={{
                        // flex : 1,
                        // backgroundColor : 'red'
                      }}
                      fixNativeFeedbackRadius={true}
                      offsetX={20}
                      offsetY={290} />
      </View>
    );
  };
}
export default CurrentLocationButton;