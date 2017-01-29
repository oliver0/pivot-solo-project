//----------------------------------------------------------------------------//
var express = require('express');
var random = require('../modules/random');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// get verbs for the games, these are not specific to the user ---------------//
router.get('/:numVerbs', function (req, res) {

  console.log('ARRIVED IN VERBS GET!');
  var data = {};
  var numVerbs = req.params.numVerbs;
  console.log('NUMBER OF VERBS:', numVerbs);

  // get verbs from DB
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SElECT id, phrasal_verb, base, preposition, definition, sentence ' +
                 'FROM phrasal_verbs ' +
                 'JOIN sentences ON phrasal_verbs.id = sentences.verb_id;',
    function (err, result) {
      done(); // close the connection.

      if (err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }

      var verbs = result.rows;
      var gameVerbs = [];
      for (var i = 0; i < numVerbs; i++) {
        verb = verbs.splice(random(0, verbs.length - 1), 1);
        gameVerbs.push(verb[0]);
      }

      data.verbs = gameVerbs;
    });

    client.query('SELECT preposition FROM phrasal_verbs GROUP BY preposition;',
    function (err, result) {
      done(); // close the connection.

      if (err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log(result.rows);
      data.uniquePrepositions  = result.rows;
    });

    client.query('SELECT phrasal_verb FROM phrasal_verbs GROUP BY phrasal_verb',
    function (err, result) {
      done(); // close the connection.

      if (err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      //console.log(result.rows);
      data.uniquePhrasalVerbs  = result.rows;
      res.send(data);
    });
  });
});

//----------------------------------------------------------------------------//


module.exports = router;
