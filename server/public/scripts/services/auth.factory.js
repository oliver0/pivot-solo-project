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
      console.log(firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });

  };

  function getCurrentUser(){
    return currentUser;
  }

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  //
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    currentUser = firebaseUser;
    console.log('currentUser:',currentUser);
    if(currentUser) {
      firebaseUser.getToken().then(function(idToken){
        //console.log('ID TOKEN:', idToken)
        $http({
          method: 'GET',
          url: '/users',
          headers: {
            id_token: idToken
          }
        })
        .then(function(userExists){
          //console.log("USER RESPONSE:", userExists.data);
          if (userExists.data == false){
            return $http({
              method: 'POST',
              url: '/users',
              headers: {
                id_token: idToken
              }
            })
            .then(function(response) {
              console.log('POST SUCCESSFUL');
            });
          }
          // } else {
          //   console.log(currentUser.user.displayName);
          // }
        });
      });
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
      return logOut();
    },
    getCurrentUser: function(){
      return getCurrentUser();
    },
    currentUserId: function(){
      return currentUserId;
    }
  }

  return userData;

}]);
