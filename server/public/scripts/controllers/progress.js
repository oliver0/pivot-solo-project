app.controller("ProgressController", ["$http", function($http){

  console.log("ProgressControler running");

  var self = this;

  //self.tableData;


  getProgressTableData();

  function getProgressTableData() {
    $http.get('/progress')
    .then(function(progressData) {
      self.tableData = progressData.data.progress;

      for (var i = 0; i < self.tableData.length; i++) {
        self.tableData[i].date = self.tableData[i].date.substring(0,10);
      }

    });
  }
  }]);
