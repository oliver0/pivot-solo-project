var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pivot';

router.post('/', function(req, res) {
  var scoreInfo = req.body;
  console.log(scoreInfo);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO scores (user_id, correct, incorrect, verb_id, game_id) ' +
      'VALUES ($1, $2, $3, $4, $5)',
      [scoreInfo.user_id, scoreInfo.author, scoreInfo.incorrect, scoreInfo.verb_id, scoreInfo.game_id],
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