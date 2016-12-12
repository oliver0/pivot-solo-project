app.controller("HomeController", ["$http", "AuthFactory", function($http, AuthFactory){

  console.log("HomeControler running");

  var currentUser;


  self.logIn = function(){
    AuthFactory.logIn();
    currentUser = AuthFactory.currentUser();
    console.log(currentUser);
  }

  self.logOut = function(){
    AuthFactory.logOut();
  }

  function getCurrentUser(){
    currentUser = AuthFactory.currentUser();
  }

  }]);
