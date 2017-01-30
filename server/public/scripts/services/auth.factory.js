app.factory('AuthFactory', ["$http", "$firebaseAuth", function($http, $firebaseAuth) {

  var auth = $firebaseAuth();
  var self = this;
  var currentUser;
  var currentUserId = 1;
  var loggedIn = false;
  var displayName;
  //--------------------------------------------------------------------------//

  // This code runs whenever the user logs in --------------------------------//
  function logIn(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      currentUser = firebaseUser;
      displayName = currentUser.user.displayName;
      console.log(firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };
  //--------------------------------------------------------------------------//

  function getCurrentUser(){
    return currentUser;
  }
  //--------------------------------------------------------------------------//

  function getCurrentUserDisplayName(){
    return displayName;
  }
  //--------------------------------------------------------------------------//

  function isLoggedIn(){
    return loggedIn;
  }
  //--------------------------------------------------------------------------//

  // This code runs whenever the user changes authentication states ----------//
  auth.$onAuthStateChanged(function(firebaseUser){
    console.log('User is logged in:', loggedIn);
    // firebaseUser will be null if not logged in
    currentUser = firebaseUser;
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
          if (userExists.data === false){
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
        });
      });
      loggedIn = true;
    } else {
      console.log('Not logged in or not authorized.');
    }
    console.log('User is logged in:', loggedIn);
  });
  //--------------------------------------------------------------------------//

  // This code runs when the user logs out -----------------------------------//
  function logOut (){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
      loggedIn = false;
      displayName = "";
    });
  };
  //--------------------------------------------------------------------------//


  //--------------------------------------------------------------------------//
  var userData = {
    currentUserId: function(){
      return currentUserId;
    },
    isLoggedIn: function(){
      return loggedIn;
    },
    getCurrentUserDisplayName: function(){
      return displayName;
    },
    logIn: function() {
      return logIn();
    },
    logOut: function() {
      return logOut();
    },
    getCurrentUser: function(){
      return getCurrentUser();
    }
  }
  return userData;
}]);
//----------------------------------------------------------------------------//
