import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
const mapStateToProps = (state) => {
  return {
    isFetching : state.meta.isFetching,
    messages : state.messages
  }
};
export default connect(mapStateToProps)(MessageList);
// TODO: Check isFetching is true or not.
// If it's true.