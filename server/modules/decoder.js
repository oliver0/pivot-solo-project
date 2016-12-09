var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("./server/firebase-service-account.json"),
  databaseURL: "https://pivot-90277.firebaseio.com"
});

/* pull the id_token off of the request,
verify it against firebase service account private_key.
Then add the decodedToken */
var tokenDecoder = function(req, res, next){
  admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
    // Adding the decodedToken to the request so that downstream processes can use it
    req.decodedToken = decodedToken;
    next();
  })
  .catch(function(error) {
    // If id_token isn't right, return a forbidden error
    console.log('User token could not be verified');
    res.send(403);
  });
}

module.exports = { token: tokenDecoder };
