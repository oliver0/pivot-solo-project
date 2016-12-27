var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pivot';

router.get('/', function(req, res) {
  var data = {};
  // get verbs from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SElECT id, phrasal_verb, base, preposition, definition, sentence ' +
                'FROM phrasal_verbs ' +
                'JOIN sentences ON phrasal_verbs.id = sentences.verb_id;',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      //console.log(result.rows);
      data.verbs = result.rows;
    });
    client.query('SELECT phrasal_verb FROM phrasal_verbs GROUP BY phrasal_verb',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      //console.log(result.rows);
      data.uniquePhrasalVerbs  = result.rows;
      res.send(data);
    });
  });
});

module.exports = router;
