import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import LoginButton from '../../containers/LoginButton';

class LoginScreen extends Component {
  state = {
    email : 'LoginScreen.state.email',
    password : 'LoginScreen.state.password'
  }
  onChangeEmail = (text) => {
    this.setState({
      email : text
    });
  }
  onChangePassword = (text) => {
    this.setState({
      password : text
    });
  }
  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form
          onChangeEmail={this.onChangeEmail}
          onChangePassword={this.onChangePassword}/>
        <SignupSection />
        <LoginButton
          {...this.props}
          email={this.state.email}
          password={this.state.password} />
        {/*<ButtonSubmit />*/}
      </Wallpaper>
    );
  }
}

export default LoginScreen;
// export default connect()(LoginScreen);