app.controller("ProgressController", ["$http", "AuthFactory", function($http, AuthFactory){

  var self = this;
  self.sortType = 'date';
  self.sortReverse = true;
  self.search = '';
  //--------------------------------------------------------------------------//

  getProgressTableData();

  function getCurrentUserId(){
    return AuthFactory.currentUserId();
  }
  //--------------------------------------------------------------------------//


  function getProgressTableData() {
    currentUser = AuthFactory.getCurrentUser();
    if(currentUser) {
      currentUser.getToken().then(function(idToken){
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
//----------------------------------------------------------------------------//
