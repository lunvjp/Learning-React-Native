import LoginUI from '../components/LoginUI';
import { connect } from 'react-redux';
import firebase from "../firebase";
import { userStartAuthorizing, userAuthorized } from '../actions';
const mapStateToProps = state => {
  return {
    authorizing: state.user.authorizing,
    user : state.user
  }
};
export default connect(mapStateToProps)(LoginUI);