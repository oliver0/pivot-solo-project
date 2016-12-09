app.controller("DefinitionController", ["$http", "GameFactory", "$location", "$interval", function($http, GameFactory, $location, $interval){

  var self = this;


  var TIME_INTERVAL = 10000; // in milliseconds
  var GUESS_OPTIONS = 4;
  self.databaseVerbs = [];
  self.gameVerbs = [];
  self.currentVerbDefinition = "";
  self.currentVerb = "";
  self.guessOptions = [];
  self.uniquePhrasalVerbs = [];
  self.correct = 0;
  self.incorrect = 0;

  self.changeView = function(){
    $location.path("score");
  }


    //startTimer();
    getVerbs();


    $interval(function(){
      self.getCurrentVerb();
      console.log('something');
    }, TIME_INTERVAL);


    function getVerbs() {
    // does the factory have data?
    if(GameFactory.databaseVerbs() === undefined) {
      // get the verb data from GameFactory
      GameFactory.getVerbs().then(function(response) {
        self.databaseVerbs = GameFactory.databaseVerbs();
        self.uniquePhrasalVerbs = GameFactory.uniquePhrasalVerbs();
        self.gameVerbs = GameFactory.gameVerbs(); //get array of verb objects to be used in game.
        self.getCurrentVerb();
      });
    }
  }

    // if there are no more verbs in game array, switch to score view. otherwise, take verb object from game array,
    // seperate out definition and correct verb, call assignGuessOptions()
    self.getCurrentVerb = function(){
      if(self.gameVerbs.length ==0){
        self.changeView();
      } else {
          var verbAndDefinition = GameFactory.getVerbAndDefinition(); // {currentVerb:currentVerb, currentVerbDefinition:currentVerbDefinition}

          self.currentVerbDefinition = verbAndDefinition.currentVerbDefinition;
          self.currentVerb = verbAndDefinition.currentVerb;
          console.log(self.currentVerbDefinition, self.currentVerb);
          assignGuessOptions();
      }
    };

    function assignGuessOptions(){
      self.guessOptions = GameFactory.assignGuessOptions();
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
