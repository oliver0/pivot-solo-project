app.controller("HomeController", ["$http", "AuthFactory", function($http, AuthFactory, $firebaseAuth){

  console.log("HomeControler running");
  var self = this;
  var currentUser;

  self.getDisplayName= function(){
    var displayName = AuthFactory.getCurrentUserDisplayName()
    if(displayName){
      return displayName.substring(0, 7) + ("'s'");
    } else {
      return 'your';
    }
  }
  self.loggedIn = function(){
    return AuthFactory.isLoggedIn();
}
  // self.inOut = self.loggedIn ? "In" : "Out"; // if self.loggedIn is true, the user sees Log Out, otherwise, Log In

  self.logInOut = function(){
    var isLoggedIn = self.loggedIn();
    if(isLoggedIn){
      logOut();
      self.getDisplayName();
      // self.inOut = "In";
    } else{
      logIn();
      // self.inOut = "Out";
    }
  }


  function logIn(){
    console.log('ANYTHING!');
    AuthFactory.logIn();
    };

  function logOut(){
    console.log('ANYTHING!');
    AuthFactory.logOut();
  }

  function getCurrentUser(){
    currentUser = AuthFactory.currentUser();
  }

  }]);
