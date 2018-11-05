import React, { Component } from 'react'
import { View } from 'react-native'
import GradientButton from 'react-native-gradient-buttons'
import { FontAwesome } from '@expo/vector-icons'

import { connect } from 'react-redux'

class LoginFacebookButton extends Component {
  render () {
    return (
      <GradientButton
        onPress={() => {
          console.log('on Press facebook')
        }}
        style={{ marginTop: 8 }}
        textStyle={{ fontSize: 20 }}
        height={50}
        gradientBegin="#3b5998"
        gradientEnd="#1B2946"
        impact
      >
        <FontAwesome
          name="facebook"
          style={{ color: "white", fontSize: 18 }}
        />{" "}
        Sign-In with Facebook
      </GradientButton>
    );
  }
}

export default connect()(LoginFacebookButton)