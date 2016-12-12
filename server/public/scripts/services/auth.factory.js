app.factory('AuthFactory', ["$http", function($http, $firebaseAuth) {

  var auth = $firebaseAuth();
  var self = this;
  var currentUser;
  
  // This code runs whenever the user logs in
  function logIn(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      currentUser = firebaseUser;
      console.log(currentUser);
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  //
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    if(firebaseUser) {
      console.log(firebaseUser);
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
    }
  }

}]);
