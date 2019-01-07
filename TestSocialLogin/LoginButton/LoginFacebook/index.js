import {Component} from "react";
// import GradientButton from "react-native-gradient-buttons";
import styles from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import {View, Text, TouchableOpacity, Platform} from "react-native";
// import {FBLoginManager, FBLogin} from 'react-native-facebook-login';
import { LoginManager, AccessToken} from "react-native-fbsdk";
import {fetchUserFacebook} from "../../../src/actions/user";

// FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native

// import {loginDefault, getUser, loginFacebook, loginGoogle} from '../../../actions/user';
// LoginManager.setLoginBehavior('web');

class LoginFacebook extends Component {
  componentWillMount () {
    if (Platform.OS === 'ios') {
      LoginManager.setLoginBehavior('web');
    } else
      LoginManager.setLoginBehavior('web_only');
  }
  onLoginFacebook = async () => {

    // TODO right here.
    let user = {
      id = ''
    };

    fetchUserFacebook()
      .then((result) => {
        console.log(result)
      })
      .catch(e => console.log(e))



    /*Login facebook*/
    // LoginManager.logInWithReadPermissions(["public_profile"]).then(
    //   function(result) {
    //     // console.log(result)
    //     if (result.isCancelled) {
    //       console.log("Login cancelled");
    //     } else {
    //       console.log(
    //         "Login success with permissions: " +
    //         result.grantedPermissions.toString()
    //       );
    //       AccessToken.getCurrentAccessToken().then(
    //         (data) => {
    //           console.log(data)
    //           // console.log(data.accessToken.toString())
    //
    //           // --------------------------------
    //           fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${data.accessToken.toString()}`)
    //             .then(res => res.json())
    //             .then(res => {
    //               console.log(res)
    //
    //               let user = res.hasOwnProperty('user') ? res.user : res;
    //               console.log(user)
    //             })
    //             .catch(e => {console.log(e)})
    //           // --------------------------------
    //         }
    //       )
    //     }
    //   },
    //   function(error) {
    //     console.log("Login fail with error: " + error);
    //   }
    // );


  }
  render () {
    return (
      <View>
        {/*<FBLogin/>*/}
        <TouchableOpacity
          style={[styles.socialButton, {
            fontSize : 20,
            height : 50
          }]}
          onPress={this.onLoginFacebook}
        >
          <FontAwesome
            name="facebook"
            style={{ color: "white", fontSize: 18 }}
          />
          <Text>{" "}Sign-In with Facebook</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default LoginFacebook

/*
<GradientButton
        onPressAction={this.onLoginFacebook}
        style={styles.socialButton}
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
 */
