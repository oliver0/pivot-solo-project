var admin = require("firebase-admin");
var express = require('express');
var pg = require('pg');
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
    // running locally, use local database instead
    connectionString = 'postgres://localhost:5432/pivot';
}

admin.initializeApp({
  credential: admin.credential.cert("./server/firebase-service-account.json"),
  databaseURL: "https://pivot-90277.firebaseio.com" // replace this line with your URL
});

/* This is where the magic happens. We pull the id_token off of the request,
verify it against our firebase service account private_key.
Then we add the decodedToken */
var tokenDecoder = function(req, res, next){
  //console.log("ID TOKEN",req.headers.id_token);

  if(req.headers.id_token){
    console.log('TOKEN DECODER');
    admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
      // Adding the decodedToken to the request so that downstream processes can use it
      req.decodedToken = decodedToken;
      // req.userId = 17;
      console.log('GOT DECODED TOKEN');

      userIdQuery(decodedToken.email, req, next);
    })
    .catch(function(error) {
      // If the id_token isn't right, you end up in this callback function
      // Here we are returning a forbidden error
      console.log('User token could not be verified');
      res.send(403);
    });

  } else {
    console.log('NO ID TOKEN');
    res.send(403);
  }
}

function userIdQuery(userEmail, req, next){
  return pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT id FROM users WHERE email = $1',
    [userEmail],
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      } else {
        console.log('Length of ROWS:', result.rows.length);
        if(result.rows.length === 1){
          var userId = result.rows[0].id;
          req.userId = userId; // this is the id that corresponds to users email in users table
          console.log('USER ID DECODER:', userId);
        }

        next();

      }

    });

  })
}

module.exports = { token: tokenDecoder };
