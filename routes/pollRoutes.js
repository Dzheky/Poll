const dataUtils = require('../utils/data');

module.exports = (app, db) => {
  app.get('/getSportEvents', (req, res) => {
    const sport = db.get('currentSport').value();
    db.set('currentSport', dataUtils.random(db.get('sports').value(), sport)).write();
    res.json(db.get('sportEvents').value().filter((event) => event.sport === sport));
  });

  app.get('/voteForSportEvent', (req, res) => {
    const {id, option} = req.query;
    const event = db.get('sportEvents')
        .find({id: parseInt(id)});

    if (event.value() && event.value().voteOptions[option] !== undefined) {
      const selectedOption = event.get(['voteOptions', option]);
      selectedOption.assign({votes: selectedOption.get('votes').value() + 1}).write();

      res.json(event.value());
    } else {
      res.json({type: 'Error', description: 'Wrong vote option'});
    }
  });
};