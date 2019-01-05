import {createSelector} from 'reselect';

export const selectPoll = (state) => state.poll;

export const selectEvents = createSelector(
    selectPoll,
    (poll) => poll.events,
);