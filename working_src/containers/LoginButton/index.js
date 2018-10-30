/** TODO:
 * - import action to this Container
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';

import styles from './styles';
import spinner from '../../assets/images/loading.gif';

import { loginDefault, getUser } from '../../actions/user';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const mapStateToProps = state => state;

class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress.bind(this);
  }

  _onPress = () => {
    const {
      dispatch, email, password } = this.props;

    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    // TODO: Send request to Server.
    // http://english-chat-app.herokuapp.com/home
    // Call other function
    // TODO: get Email and Password
    dispatch(loginDefault(email, password)).then((data) => {
      console.log(data);
      dispatch(getUser()).then((result) => {
        // Work with entire screens

        // Open pink screen.
        setTimeout(() => {
          this._onGrow();
        }, 2000);

        // Change Pink screen to Home Screen
        setTimeout(() => {
          // Actions.secondScreen();
          // Navigate to Main Screen right here.
          this.props.navigation.navigate('ListTopic');

          this.setState({isLoading: false});
          this.buttonAnimated.setValue(0);
          this.growAnimated.setValue(0);
        }, 2300);

        // 
      });
    });
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
    );
  }
}

export default connect()(LoginButton);
