app.controller("HomeController", ["$http", "AuthFactory", function($http, AuthFactory, $firebaseAuth){

  console.log("HomeControler running");
  var self = this;

  var currentUser;
  self.loggedIn;

  self.logInOut = function(){
    self.loggedIn = AuthFactory.isLoggedIn();
    if(self.loggedIn){
      logOut();
      self.loggedIn = AuthFactory.isLoggedIn();
      console.log('User is logged in', self.loggedIn );
    } else{
      logIn();
      self.loggedIn = AuthFactory.isLoggedIn();
      console.log('User is logged in', self.loggedIn );
    }
  }


  function logIn(){
    console.log('ANYTHING!');
    AuthFactory.logIn();
    };

  //currentUser = AuthFactory.currentUser();  }

  function logOut(){
    console.log('ANYTHING!');
    AuthFactory.logOut();
  }

  function getCurrentUser(){
    currentUser = AuthFactory.currentUser();
  }

  }]);
