//----------------------------------------------------------------------------//
var express = require('express');
var modify = require('../modules/modify');
var randomize = require('../modules/randomize');
var router = express.Router();
var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
    // running locally, use local database instead
    connectionString = 'postgres://localhost:5432/pivot';
}
//----------------------------------------------------------------------------//

router.get('/:numVerbs', function(req, res) {

  console.log('ARRIVED IN VERBS GET!');
  var data = {};
  var userId = req.userId;
  var numVerbs = req.params.numVerbs;
  console.log('NUMBER OF VERBS:', numVerbs);
  // get verbs from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT s.user_id, pv.id "verb_id", pv.phrasal_verb, pv.base, pv.preposition, pv.definition, ' +
                 'sen.sentence, (SUM(correct) / (SUM(correct) + SUM(incorrect)))*100 AS percentage ' +
                 'FROM scores s ' +
                 'JOIN sentences sen ON sen.verb_id = s.verb_id ' +
                 'JOIN phrasal_verbs pv ON s.verb_id = pv.id ' +
                 'JOIN users u ON s.user_id = u.id ' +
                 'WHERE u.id = ' + userId + ' ' +
                 'GROUP BY s.user_id,pv.id, pv.phrasal_verb, pv.base, pv.preposition, pv.definition, sen.sentence ' +
                 'ORDER BY percentage;',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      // console.log(modify(result.rows));
      data.verbs = randomize(modify(result.rows, numVerbs));
    });
    client.query('SELECT preposition FROM phrasal_verbs GROUP BY preposition;',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log(result.rows);
      data.uniquePrepositions  = result.rows;
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

//----------------------------------------------------------------------------//

module.exports = router;
