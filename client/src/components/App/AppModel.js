import {fetchSportEventsAction} from '../../actions/pollActions';

export const initApplication = () => async (dispatch) => {
  await dispatch(fetchSportEventsAction());
};