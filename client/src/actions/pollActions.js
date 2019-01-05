import {createAction} from 'redux-actions';
import {fetchSportEvents, voteForEvent} from '../api/sportEventsApi';
import {setErrorAction} from './errorActions';

export const setSportEventsAction = createAction('SET_SPORT_EVENTS');
export const setSportEventAction = createAction('SET_SPORT_EVENT');

export const fetchSportEventsAction = () => async (dispatch) => {
  const events = await fetchSportEvents();

  if (events) {
    dispatch(setSportEventsAction(events));
  }
};

export const voteForSportEventAction = (eventId, option) => async (dispatch) => {
  const event = await voteForEvent(eventId, option);

  if (event.type === 'Error') {
    dispatch(setErrorAction(event));
    return false;
  }

  dispatch(setSportEventAction(event));
  return true;
};