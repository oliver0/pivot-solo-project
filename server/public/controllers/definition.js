app.controller("DefinitionController", ["$http", function($http){

  var self = this;
  var GAME_VERBS = 10;
  var GUESS_OPTIONS = 4;
  self.databaseVerbs = [];
  self.gameVerbs = [];
  self.currentVerbDefinition = "";
  self.currentVerb = "";
  self.guessOptions = [];
  self.uniquePhrasalVerbs = ['bring up', 'give in', 'stay up', 'go out', 'look into', 'turn up', 'take off', 'put off'];


    getVerbs();

    function getVerbs() {
      $http.get('/verbs')
        .then(function(response) {
          self.databaseVerbs = response.data;
          addVerbsToGame();
        });
    }

    self.getCurrentVerb = function(){
      var currentVerbObject = self.gameVerbs.pop();
      self.currentVerbDefinition = currentVerbObject.definition;
      self.currentVerb = currentVerbObject.phrasal_verb;
      assignGuessOptions();

    };

    function assignGuessOptions(){
      self.guessOptions = [];
      var correctAnswerPosition = randomNumber(0, GUESS_OPTIONS-1);
      for (var i = 0; i < GUESS_OPTIONS; i++) {
        if(i == correctAnswerPosition){
          self.guessOptions.push(self.currentVerb);
        } else{
          var wrongVerb = self.uniquePhrasalVerbs[randomNumber(0, self.uniquePhrasalVerbs.length-1)];
          self.guessOptions.push(checkForDuplicates(wrongVerb));
        }
      }
      console.log(self.guessOptions);
    }

    function checkForDuplicates(verb){

      while (verb == self.currentVerb ){
        verb = self.uniquePhrasalVerbs[randomNumber(0, self.uniquePhrasalVerbs.length-1)];
      }
      return verb;
    }

    function addVerbsToGame(){
      for (var i = 0; i < GAME_VERBS ; i++) {
        var verb = self.databaseVerbs[randomNumber(0, self.databaseVerbs.length-1)];
        //console.log(verb.phrasal_verb, "=", verb.definition);
        self.gameVerbs.push(verb);
        //console.log(self.gameVerbs);
      }
    }

    self.isCorrect = function(verbPicked){
      if(this.currentVerb == verbPicked){
        console.log('correct');
      } else {
        console.log('incorrect');
      }
    }



  }]);



  function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}
