import {BASE_URL} from './api';

const URLS = {
  FETCH_SPORT_EVENTS: '/getSportEvents',
  VOTE_FOR_SPORT_EVENT: '/voteForSportEvent',
};

export const fetchSportEvents = async () => {
  try {
    const events = await fetch(URLS.FETCH_SPORT_EVENTS);

    return await events.json();
  } catch (e) {
    console.log('fetchSportEvents error', e);

    return false;
  }

};

export const voteForEvent = async (eventId, option) => {
  try {
    if (eventId !== undefined && option !== undefined) {
      const url = new URL(URLS.VOTE_FOR_SPORT_EVENT, BASE_URL);
      const params = {id: eventId, option};
      url.search = new URLSearchParams(params);
      const result = await fetch(url);

      return await result.json();
    } else {
      return false;
    }
  } catch (e) {
    console.log('voteForEvent error', e);

    return false;
  }
};