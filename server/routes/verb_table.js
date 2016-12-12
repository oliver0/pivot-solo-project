var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pivot';

router.get('/', function(req, res) {
  var verbTableData = {};
  // get verbs from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT phrasal_verb, verb_id, definition, SUM(correct) / (SUM(correct) + SUM(incorrect)) AS percentage ' +
                 'FROM scores ' +
                 'JOIN phrasal_verbs ON scores.verb_id = phrasal_verbs.id ' +
                 'GROUP BY phrasal_verb, verb_id, definition;',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      //console.log(result.rows);
      verbTableData.phrasal_verbs = result.rows;
    });

  });
});

module.exports = router;
