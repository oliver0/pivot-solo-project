app.controller("VerbsController", ["$http", function($http){

  console.log("VerbsControler running");

  var self = this;

  self.tableData;

  getVerbTableData();

  function getVerbTableData() {
    $http.get('/verb_table')
    .then(function(verbTableData) {
      self.tableData = verbTableData.data.verbData;
      console.log(self.tableData);


    });
  }
  }]);
