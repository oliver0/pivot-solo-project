app.controller('HomeController', ['$http', 'AuthFactory', function ($http, AuthFactory, $firebaseAuth) {

  console.log('HomeControler running');
  var self = this;
  var currentUser;

  self.getDisplayName= function(onlyFirstName){
    var displayName = AuthFactory.getCurrentUserDisplayName();
    if(onlyFirstName){
      if(displayName){
        return displayName.split(' ')[0] + ("'s");
      }
      else {
        return 'your';
      }
    } else {
      if (self.loggedIn()){
        if(displayName){
          return 'Welcome ' + displayName + '!';
        }
        else{
          return 'Welcome!';
        }
      } else {
        return 'Log in to save scores!';
      }

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
