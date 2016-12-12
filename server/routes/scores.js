var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pivot';

router.post('/', function(req, res) {
  console.log('POST SUCCESSFUL');
  var scoreInfo = req.body;
  console.log(scoreInfo);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO scores (user_id, correct, incorrect, verb_id, game_id, date) ' +
      'VALUES ($1, $2, $3, $4, $5, $6)',
      [scoreInfo.user_id, scoreInfo.correct, scoreInfo.incorrect, scoreInfo.verb_id, scoreInfo.game_id, scoreInfo.date],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });

});

module.exports = router;
