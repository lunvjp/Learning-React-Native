import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, View, Text, Image, StyleSheet } from 'react-native';
import {Fonts} from "../../config/Fonts";
import PropTypes from 'prop-types';

export default class ButtonRequest extends Component {

  onPress = () => {
    console.log('onPress');
  };

  // onPress={this.onPress}
  render() {
    return (
      <TouchableOpacity style={[styles.buttonItem]}
                          onPress={this.props.onPress}
                          // underlayColor='#f2f2f2'
      >
        <View style={styles.buttonRowItems}>
          <View style={styles.buttonItemImage}>
            <Image source={this.props.ImageUrl}/>
          </View>
          <View style={styles.buttonItemTextContainer}><Text style={[styles.buttonText,styles.buttonItemText]}>{this.props.label}</Text></View>
        </View>
      </TouchableOpacity>
    );
  }
}

PropTypes.propTypes = {
  // onPress
  ImageUrl : PropTypes.any.isRequired,
  label : PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  buttonItem : {
    // padding : 15,
    paddingTop: 5,
    paddingBottom: 5,
    flex:1,
    borderColor:'#f4f4f4',
    borderWidth:1,
    justifyContent: 'center'
  },
  buttonItemImage : {
    flex:45,
    alignItems:'center'
  },
  buttonItemTextContainer : {
    flex: 55,
    paddingRight: 20
  },
  buttonItemText : {
    fontFamily:Fonts.HelveticaNeue,
    fontSize:14,
    fontWeight:'bold',
    letterSpacing:0.2,
    color:'#353a48',
  },
  buttonRowItems : {
    flexDirection:'row',
    alignItems : 'center',
    justifyContent: 'center'
  }
});