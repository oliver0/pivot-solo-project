app.controller("ProgressController", ["$http", function($http){

  console.log("ProgressControler running");

  var self = this;

  self.tableData;

  getProgressTableData();

  function getProgressTableData() {
    $http.get('/progress')
    .then(function(progressData) {
      self.tableData = progressData.data.progress;
      console.log(self.tableData);

    });
  }
  }]);
