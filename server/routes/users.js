var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pivot';

router.get('/', function(req, res) {
  console.log('ARRIVED IN USERS GET!');
  var userEmail = req.decodedToken.email;
  console.log('USER EMAIL:', userEmail);
  // get verbs from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT * FROM scores',
    //client.query('SELECT * FROM scores',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      res.send(result.rows);
    });

  });
});

module.exports = router;
