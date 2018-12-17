import {Component} from "react";
// import GradientButton from "react-native-gradient-buttons";
import styles from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import {View, Text, TouchableOpacity, Platform} from "react-native";
// import {FBLoginManager, FBLogin} from 'react-native-facebook-login';
import { LoginManager, AccessToken} from "react-native-fbsdk";

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
    // WEB_VIEW
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function(result) {
        // console.log(result)
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log(data)
              // console.log(data.accessToken.toString())

              // --------------------------------
              fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${data.accessToken.toString()}`)
                .then(res => res.json())
                .then(res => {
                  console.log(res)

                  let user = res.hasOwnProperty('user') ? res.user : res;
                  console.log(user)
                })
                .catch(e => {console.log(e)})
              // --------------------------------
            }
          )
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );

    // FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
    //   if (!error) {
    //     console.log("Login data: ", data);
    //   } else {
    //     console.log("Error: ", error);
    //   }
    // })

    // try {
    //   const {
    //     type,
    //     token,
    //     expires,
    //     permissions,
    //     declinedPermissions,
    //   } = await Expo.Facebook.logInWithReadPermissionsAsync(keys.FACEBOOK_APP_ID, {
    //     permissions: ['public_profile', 'email'],
    //   });
    //
    //   if (type === 'success') {
    //     const { dispatch } = this.props;
    //     // Get the user's name using Facebook's Graph API
    //
    //     // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    //     // const result = response.json();
    //
    //     fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`)
    //       .then(res => res.json())
    //       .then(res => {
    //         console.log(res)
    //         let user = res.hasOwnProperty('user') ? res.user : res;
    //         console.log(user)
    //         // return;
    //         dispatch(loginFacebook(user) )
    //           .then((res) => {
    //             console.log(res)
    //             this.props.navigation.navigate('MainScreen');
    //           })
    //           .catch((error) => {
    //             console.log(error)
    //           });
    //       })
    //       .catch(e => {console.log(e)})
    //     // TODO: loginFacebook action
    //     // console.log();
    //
    //     // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    //   } else {
    //     // type === 'cancel'
    //     console.log(type)
    //   }
    // } catch ({ message }) {
    //   alert(`Facebook Login Error: ${message}`);
    // }


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
