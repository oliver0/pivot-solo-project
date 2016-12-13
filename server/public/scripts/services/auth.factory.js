app.factory('AuthFactory', ["$http", "$firebaseAuth", function($http, $firebaseAuth) {
  console.log('AuthFactory up and running');
  var auth = $firebaseAuth();
  var self = this;
  var currentUser;
  var currentUserId = 2;

  // This code runs whenever the user logs in
  function logIn(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      currentUser = firebaseUser;
      console.log("Firebase Authenticated as: ", currentUser.user);
      return currentUser;
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
    return

  };

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  //
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        //console.log(idToken);
      })

    } else {
      console.log('Not logged in or not authorized.');
    }
  });

  // This code runs when the user logs out
  function logOut (){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };

  var userData = {
    logIn: function() {
      return logIn();
    },
    logOut: function() {
      return logIn();
    },
    currentUser: function(){
      return currentUser;
    },
    currentUserId: function(){
      return currentUserId;
    }
  }

  return userData;

}]);
