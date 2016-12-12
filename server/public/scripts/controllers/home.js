app.controller("HomeController", ["$http", "AuthFactory", function($http, AuthFactory){

  console.log("HomeControler running");

  var currentUser;

  self.logIn = function(){
    AuthFactory.logIn();
  }

  self.logOut = function(){
    AuthFactory.logOut();
  }

  }]);
