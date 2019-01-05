import {handleActions} from 'redux-actions';
import {clearErrorAction, setErrorAction} from '../actions/errorActions';

const defaultState = {
  description: '',
};

export const errorReducer = handleActions({
  [clearErrorAction]: () => defaultState,
  [setErrorAction]: (state, action) => ({
    description: action.payload.description,
  }),
}, defaultState);