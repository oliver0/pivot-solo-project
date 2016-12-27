var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pivot';

router.get('/', function(req, res) {
  console.log('ARRIVED IN VERB_TABLE GET!');
  var verbTableData = {};
  var userId = req.userId;
  console.log('USER ID:', userId);
  // get verbs from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT phrasal_verb, verb_id, definition, (SUM(correct) / (SUM(correct) + SUM(incorrect)))*100 AS percentage, users.id ' +
                 'FROM scores ' +
                 'JOIN phrasal_verbs ON scores.verb_id = phrasal_verbs.id ' +
                 'JOIN users ON scores.user_id = users.id ' +
                 'WHERE users.id = ' + userId + ' ' +
                 'GROUP BY phrasal_verb, verb_id, definition, users.id;',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      verbTableData.verbData = result.rows
      console.log(verbTableData);
      res.send(verbTableData);
    });

  });
});

module.exports = router;
