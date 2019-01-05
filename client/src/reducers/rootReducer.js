import {combineReducers} from 'redux';
import {pollReducer} from './pollReducer';
import {errorReducer} from './errorReducer';

const rootReducer = combineReducers({
  poll: pollReducer,
  error: errorReducer,
});

export default rootReducer;