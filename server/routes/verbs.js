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

    // could use if statements here based on the game id to determine which queries should
    // be made.

    client.query('SELECT * FROM phrasal_verbs',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      //console.log(result.rows);
      data.verbs = result.rows;
    });
    client.query('SElECT sentence, phrasal_verb, id, base, preposition ' +
                 'FROM phrasal_verbs ' +
                 'JOIN sentences ON phrasal_verbs.id = sentences.verb_id ' +
                 'GROUP BY sentence, phrasal_verb, id, base, preposition;',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      //console.log(result.rows);
      data.sentences = result.rows;
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
