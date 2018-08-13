import React from 'react';
import {
  View, Text
} from 'react-native';
import CardView from 'react-native-cardview'

class TestShadow2 extends React.Component {
  render() {
    return (
      <View style={{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        // elevation: 3
      }}>
        {/*<View style={{*/}
          {/*width : 100,*/}
          {/*height : 200,*/}
          {/*backgroundColor : 'red',*/}
          {/*shadowOpacity : 1,*/}
          {/*shadowColor : '#000000',*/}
          {/*shadowRadius : 10,*/}
          {/*elevation: 5,*/}
          {/*position: 'relative',*/}
          {/*shadowOffset: { width: 0, height: 2 },*/}
          {/*// How to speak English like a Native Speaker as well, you can be a native as well.*/}
          {/*// Set ShadowBox right here!*/}
        {/*}}>*/}
        {/*</View>*/}

      </View>
    );
  };
}

class TestShadow extends React.Component {
  render() {
    return (
      <View style={{
        flex : 1,
        // backgroundColor: 'red'
      }}>
        <CardView
          style={{
            height: 50,
            backgroundColor : 'red'
          }}
          cardElevation={7}
          cardMaxElevation={2}
          cornerRadius={10}>
          <Text style={{
            lineHeight : 50,
            height : 50,
            fontSize : 50
            // backgroundColor : 'green'
          }}>
            Elevation 0
          </Text>
        </CardView>
      </View>
    );
  };
}

export default TestShadow;