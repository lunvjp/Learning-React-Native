import React, {Component}  from 'react';
import {View, Image, Text, StyleSheet } from 'react-native';
import {Fonts} from "../../config/Fonts";
import PropTypes from 'prop-types';
// import { string, number, object } from 'prop-types';

export default class ButtonItem extends Component {

  constructor(props) {
    super(props);
    // TODO: Import PropTypes in each components
    // This will be this.props.styles a object of Custom Style like this.
  }

  render() {
    return (
      <View style={[ styles.speedContainerColumn , {flex:1}]}>
        <Image source={this.props.ImageUrl} />
        <Text style={[styles.speedMeter, this.props.CustomStyle]}>
          <Text style={styles.speedCount}>{this.props.speed}</Text>
          <Text>  KM/H</Text>
        </Text>
        <Text style={styles.speedLabel}>{this.props.label}</Text>
      </View>
    );
  };
}

ButtonItem.propTypes = {
  ImageUrl : PropTypes.any.isRequired,
  speed : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  label : PropTypes.string.isRequired,
  CustomStyle : PropTypes.object
};

ButtonItem.defaultProps = {
  speed : 0
};

const styles = StyleSheet.create({
  speedContainerColumn : {
    marginLeft: 30,
    marginTop : 20,
    marginBottom : 20,
    flex : 1
  },
  speedMeter : {
    fontFamily: Fonts.HelveticaNeue,
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    textAlign: 'left',
    color: '#353a48'
  },
  speedCount : {
    fontSize: 40
  },
  speedLabel : {
    fontFamily : Fonts.HelveticaNeue,
    fontSize : 14,
    fontWeight : 'bold',
    letterSpacing : 0.2,
    color : '#9b9b9b'
  }
});
