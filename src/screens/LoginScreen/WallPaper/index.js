import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, Image, ImageBackground} from 'react-native';

// import bgSrc from '../../assets/images/wallpaper.png';
import bgSrc from '../../../assets/images/LoginScreen/BG-login-screen.png';
import {images} from "../../../config";

export default class WallPaper extends Component {
  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    // resizeMode: 'cover',
  },
});