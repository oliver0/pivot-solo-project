app.controller("DefinitionController", ["$http", function($http){

  var self = this;
  var GAME_VERBS_NUMBER = 10;
  self.databaseVerbs = [];
  self.gameVerbs = [];
  self.currentVerb = {};

    getVerbs();

    function getVerbs() {
      $http.get('/verbs')
        .then(function(response) {
          self.databaseVerbs = response.data;
          addVerbsToGame();
        });
    }

    self.getCurrentVerb = function(){
      self.currentVerb = self.gameVerbs.pop();
      console.log(self.currentVerb);
    };

    function addVerbsToGame(){
      for (var i = 0; i < GAME_VERBS_NUMBER ; i++) {
        var verb = self.databaseVerbs[randomNumber(0, self.databaseVerbs.length-1)];
        //console.log(verb.phrasal_verb, "=", verb.definition);
        self.gameVerbs.push(verb);
        console.log(self.gameVerbs);
      }
    }



  }]);



  function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}
