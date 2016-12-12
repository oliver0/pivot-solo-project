var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pivot';

router.get('/', function(req, res) {
  console.log('ARRIVED IN PROGRESS GET!');
  var progressData = {};
  // get verbs from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT date, SUM(correct) AS correct, SUM(incorrect) AS incorrect, (SUM(correct) / (SUM(correct) + SUM(incorrect)))*100 AS percentage ' +
                 'FROM scores ' +
                 'JOIN phrasal_verbs ON scores.verb_id = phrasal_verbs.id ' +
                 'GROUP BY date;',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      progressData.progress = result.rows
      console.log(progressData);
      res.send(progressData);
    });

  });
});

module.exports = router;
