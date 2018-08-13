import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text, Image
} from 'react-native';

class ReportScreen extends Component {
  render() {
    return(
      <View style={{
        flex : 1,
        backgroundColor : 'grey'
      }}>
        <View style={{
          flex : 1,
          justifyContent : 'center',
          alignItems : 'center'
        }}>
          <Image source={require('./police.png')} />
          <Text>Police</Text>
        </View>
        {/* View 3 buttons */}
        <View>
          <View></View>
        </View>


        <View>

        </View>


        <View>

        </View>
      </View>
    );
  };
}
export default ReportScreen;

const ReportType = () => {
  con
};

const styles = StyleSheet.create({

});