var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pivot';

router.post('/', function(req, res) {

  var scoreInfo = req.body;
  var userEmail = req.decodedToken.email;
  console.log('POST SUCCESSFUL. userEmail:', userEmail);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT id FROM users WHERE email = $1',
    [userEmail],
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      } else {
      console.log('Length of rows:', result.rows.length);
      var userId = result.rows[0].id; // this is the id that corresponds to users email in users table
      console.log('USER ID:', userId);
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
     }

   });

 });
});

module.exports = router;
