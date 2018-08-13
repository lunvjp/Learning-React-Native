import React, {
  Component
} from 'react';
import {
  View
} from 'react-native';

/**
 * 1. slider hình ảnh,
 * 2. Tên
 * 3. Khoảng cách
 * 4. Tên đường.
 * 5. Nút: "Come there" button, Call
 */


class PlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images : null,
      name : null,
      distance : null,
      address : null
    };
  }
  render() {
    return (
      <View style={{
        flex : 1
      }}>

      </View>
    );
  };
}

export default PlaceScreen;