app.controller("ProgressController", "AuthFactory" ["$http", function($http, AuthFactory){

  console.log("ProgressControler running");

  var self = this;

  //self.tableData;


  getProgressTableData();

  function getCurrentUserId(){
    return AuthFactory.currentUserId();
  }

  function getProgressTableData() {

    //var user_id = getCurrentUserId();
    $http.get('/progress')
    .then(function(progressData) {
      self.tableData = progressData.data.progress;
    });
  }
  }]);
