import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
