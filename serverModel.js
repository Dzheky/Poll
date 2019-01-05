const dataUtils = require('./utils/data');
const got = require('got');

const SPORTS_URL = 'https://s3-eu-west-1.amazonaws.com/test-assignment/test-assignment.json';
const defaultOptions = {
  homeWin: {
    votes: 0,
    description: 'Home Win',
  },
  draw: {
    votes: 0,
    description: 'Draw',
  },
  awayWin: {
    votes: 0,
    description: 'Away Win',
  },
};

module.exports = {
  serverInit: function (db) {
    if (!db.get('sportEvents').value()) {
      got(SPORTS_URL, {json: true}).then((data) => {
        db.set('sports', dataUtils.unique(data.body.map(event => event.sport))).write();
        db.set('sportEvents', data.body.map((event) => {
          if (event.country === 'ENGLAND') {
            return {...event, country: 'UNITED KINGDOM', voteOptions: dataUtils.deepClone(defaultOptions)};
          }

          return {...event, voteOptions: dataUtils.deepClone(defaultOptions)};
        })).write();
        if (!db.get('currentSport').value()) {
          db.set('currentSport', db.get('sports').value()[0]).write();
        }
      }).catch(err => {
        console.error('Error', err);
      });
    }
  },
};