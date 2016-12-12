app.controller("ProgressController", ["$http", function($http){

  console.log("ProgressControler running");

  var self = this;

  self.tableData;

  getVerbTableData();

  function getVerbTableData() {
    $http.get('/verb_table')
    .then(function(response) {
      console.log(response.verbTableData);
      //console.log('TABLE DATA:', self.tableData);

    });
  }
  }]);
