import {handleActions} from 'redux-actions';
import {setSportEventAction, setSportEventsAction} from '../actions/pollActions';

const defaultState = {
  events: [],
};

export const pollReducer = handleActions({
  [setSportEventsAction]: (state, action) => ({
    events: action.payload,
  }),
  [setSportEventAction]: (state, action) => ({
    events: state.events.map((event) => event.id === action.payload.id ? action.payload : event),
  }),
}, defaultState);