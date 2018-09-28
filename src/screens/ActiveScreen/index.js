import React, { Component } from 'react';
import { View } from 'react-native';

import ActiveList from '../../components/ActiveList';
import styles from './styles';

class ActiveScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActiveList/>
      </View>
    );
  }
}

export default ActiveScreen;