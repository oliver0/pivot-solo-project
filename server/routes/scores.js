var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
    // running locally, use our local database instead
    connectionString = 'postgres://localhost:5432/pivot';
}
router.post('/', function(req, res) {
  console.log('ARRIVED IN SCORES POST');
  var scoreInfo = req.body;
  var userId = req.userId;
  console.log('POST SUCCESSFUL. USER ID:', userId);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

      client.query(
        'INSERT INTO scores (user_id, correct, incorrect, verb_id, game_id, date) ' +
        'VALUES ($1, $2, $3, $4, $5, $6)',
        [userId, scoreInfo.correct, scoreInfo.incorrect, scoreInfo.verb_id, scoreInfo.game_id, scoreInfo.date],
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
