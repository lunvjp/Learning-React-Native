import React from 'react'
// import LinearGradient from 'react-native-linear-gradient'
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../Themes/Colors';
import * as AppStyles from '../../config';

export default (props) => {
  // TODO:
  // - Update config file
  // const gradient = [Colors.purple, Colors.darkPurple]
  const gradient = ['#f69aa4', AppStyles.styles.colors.accentColor];
  return (
    <LinearGradient
      colors={gradient}
      style={props.style}>
      {props.children}
    </LinearGradient>
  )
}

// <LinearGradient colors={gradient} style={props.style}>
//   {props.children}
// </LinearGradient>
