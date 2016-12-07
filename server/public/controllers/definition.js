app.controller("DefinitionController", ["$http", function($http){

  var self = this;
    self.verbs = [];

    getVerbs();

    function getVerbs() {
      console.log('hit function getVerbs');
      $http.get('/verbs')
        .then(function(response) {
          console.log(response.data);
          self.verbs = response.data;
        });
    }

  }]);
