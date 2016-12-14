app.controller("VerbsController", ["$http", "AuthFactory", function($http, AuthFactory){

  console.log("VerbsControler running");

  var self = this;

  getVerbTableData();

  function getCurrentUserId(){
    console.log('HELLO!');
    return AuthFactory.currentUserId();
  }

  function getVerbTableData() {
    console.log('getVerbTableData() ');
    //var user_id = getCurrentUserId()
    //console.log(user_id);;
    $http.get('/verb_table')
    .then(function(verbTableData) {
      self.tableData = verbTableData.data.verbData;
      console.log(self.tableData);


    });
  }
  }]);
