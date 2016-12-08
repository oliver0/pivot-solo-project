app.controller("DefinitionController", ["$http", "$location", function($http, $location){

  var self = this;
  var GAME_VERBS = 10;
  var GUESS_OPTIONS = 4;
  self.databaseVerbs = [];
  self.gameVerbs = [];
  self.currentVerbDefinition = "";
  self.currentVerb = "";
  self.guessOptions = [];
  self.uniquePhrasalVerbs = ['bring up', 'give in', 'stay up', 'go out', 'look into', 'turn up', 'take off', 'put off'];
  self.correct = 0;
  self.incorrect = 0;

  self.changeView = function(){
    $location.path("score");
  }

    getVerbs();

    // get data from phrasal_verb table. id, phrasal_verb, base, preposition, definition
    function getVerbs() {
      $http.get('/verbs')
        .then(function(response) {
          self.databaseVerbs = response.data;
          addVerbsToGame();
        });
    }

    // add verbs to game array, currently 10 but can be changed.

    function addVerbsToGame(){
      for (var i = 0; i < GAME_VERBS ; i++) {
        var verb = self.databaseVerbs[randomNumber(0, self.databaseVerbs.length-1)];
        //console.log(verb.phrasal_verb, "=", verb.definition);
        self.gameVerbs.push(verb);
        //console.log(self.gameVerbs);
      }
    }

    // if there are no more verbs in game array, switch to score view. otherwise, take verb object from game array,
    // seperate out definition and correct verb, call assignGuessOptions()
    self.getCurrentVerb = function(){
      if(self.gameVerbs.length ==0){
        self.changeView();
      } else {
        var currentVerbObject = self.gameVerbs.pop();
        self.currentVerbDefinition = currentVerbObject.definition;
        self.currentVerb = currentVerbObject.phrasal_verb;
        assignGuessOptions();
      }
    };

    // copy unique phrasal verb array, if correct verb in it remove it. For loop runs as long as number of options,
    // assign correct answer to random position and random wrong answers to other positions
    function assignGuessOptions(){
      self.guessOptions = [];
      var uniqueVerbs = self.uniquePhrasalVerbs.slice(0);
      for (var i = 0; i < uniqueVerbs.length; i++) {
        if(uniqueVerbs[i]==self.currentVerb){
          uniqueVerbs.splice(i,1);
        }
      }
      var correctAnswerPosition = randomNumber(0, GUESS_OPTIONS-1);
      for (var i = 0; i < GUESS_OPTIONS; i++) {
        if(i == correctAnswerPosition){
          self.guessOptions.push(self.currentVerb);
        } else{
          var indexWrongVerb = randomNumber(0, uniqueVerbs.length-1);
          var wrongVerb = uniqueVerbs.splice(indexWrongVerb,1);
          // console.log("wrong verb:", wrongVerb);
          // console.log("uniqueVerbs:", uniqueVerbs);
          self.guessOptions.push(wrongVerb[0]);
        }
      }
      console.log(self.guessOptions);
    }

    // check if answer correct/incorrect. Call getCurrentVerb to move on to next question
    self.isCorrect = function(verbPicked){
      if(this.currentVerb == verbPicked){
        self.correct++;
        self.getCurrentVerb();
      } else {
        self.incorrect++;
        self.getCurrentVerb();
      }
    }



  }]);



  function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}
