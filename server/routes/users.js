var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pivot';

router.get('/', function(req, res) {
  console.log('ARRIVED IN USERS GET!');
  var userEmail = req.decodedToken.email;
  var userExists;
  console.log('USER EMAIL:', userEmail);
  // get verbs from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    } else {}
    client.query('SELECT * FROM users WHERE email = $1',
    [userEmail],
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      userExists = result.rows.length > 0;
      res.send(userExists);
    });

  });
});

module.exports = router;
