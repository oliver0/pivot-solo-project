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
router.get('/', function(req, res) {
  console.log('ARRIVED IN PROGRESS GET!');
  var progressData = {};
  var userId = req.userId;
  console.log('USER ID:', userId);
  //var userId = req.params.id;
  // get verbs from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT date, SUM(correct) AS correct, SUM(incorrect) AS incorrect, (SUM(correct) / (SUM(correct) + SUM(incorrect)))*100 AS percentage ' +
                 'FROM scores ' +
                 'JOIN phrasal_verbs ON scores.verb_id = phrasal_verbs.id ' +
                 'JOIN users ON scores.user_id = users.id ' +
                 'WHERE users.id = ' + userId + ' ' +
                 'GROUP BY date ' +
                 'ORDER BY date DESC;',
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
