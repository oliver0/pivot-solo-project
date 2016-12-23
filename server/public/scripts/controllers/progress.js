app.controller("ProgressController", ["$http", "AuthFactory", function($http, AuthFactory){

  console.log("ProgressControler running");

  var self = this;
  self.sortType = 'date';
  self.sortReverse = true;
  self.search = '';


  getProgressTableData();

  function getCurrentUserId(){
    return AuthFactory.currentUserId();
  }

  function getProgressTableData() {

    //var user_id = getCurrentUserId();
    currentUser = AuthFactory.getCurrentUser();
    //console.log('CURRENT USER:', currentUser);
    if(currentUser) {
      currentUser.getToken().then(function(idToken){
        //console.log('USER:', idToken);
        return $http({
          method: 'GET',
          url: '/progress',
          headers: {
            id_token: idToken
          }
        })
        .then(function(progressData) {
          self.tableData = progressData.data.progress;
        });
      });
    }
  }
}]);
