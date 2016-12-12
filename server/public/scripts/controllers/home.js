app.controller("HomeController", ["$http", "AuthFactory", function($http, AuthFactory, $firebaseAuth){

  console.log("HomeControler running");
  var self = this;

  var currentUser;


  self.logIn = function(){
    console.log('ANYTHING!');
    AuthFactory.logIn();
    };

  //currentUser = AuthFactory.currentUser();  }

  self.logOut = function(){
    console.log('ANYTHING!');
    AuthFactory.logOut();
  }

  function getCurrentUser(){
    currentUser = AuthFactory.currentUser();
  }

  }]);
