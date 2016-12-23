app.controller("HomeController", ["$http", "AuthFactory", function($http, AuthFactory, $firebaseAuth){

  console.log("HomeControler running");
  var self = this;

  var currentUser;
  self.loggedIn = function(){
    return AuthFactory.isLoggedIn();
}
  // self.inOut = self.loggedIn ? "In" : "Out"; // if self.loggedIn is true, the user sees Log Out, otherwise, Log In

  self.logInOut = function(){
    var isLoggedIn = self.loggedIn();
    if(isLoggedIn){
      logOut();
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
