import ButtonScreen from '../../components/HomePage/ButtonScreen';
import {
  sendMarkers
} from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.ButtonScreen,
  // dropDown : state.m
});

const mapDispatchToProps = (dispatch) => {
  return {
    sendPoliceReport : () => {
      dispatch(sendMarkers('police'));
    },
    sendTrafficCarReport : () => {
      dispatch(sendMarkers('traffic'));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ButtonScreen);