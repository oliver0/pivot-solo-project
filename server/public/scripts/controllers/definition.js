app.controller("DefinitionController", ["$http", "GameFactory", "ScoreFactory", "$location", "$interval", "$rootScope", "CountdownTimer", "$timeout",function($http, GameFactory, ScoreFactory, $location, $interval, $rootScope, CountdownTimer, $timeout){

  var self = this;


  var TIME_INTERVAL = 10000; // in milliseconds
  var promise;
  var GUESS_OPTIONS = 4;
  self.counter = 10;
  var stopped;
  self.databaseVerbs = [];
  self.gameVerbs = [];
  self.currentVerbObject = {};
  self.currentVerbDefinition = "";
  self.currentVerb = "";
  self.guessOptions = [];
  self.uniquePhrasalVerbs = [];
  self.correct = 0;
  self.incorrect = 0;


  self.changeView = function(){
    self.stop();
    $location.path("score");
  }

    // self.timer = new CountdownTimer(10000);

    self.countdown = function() {
    stopped = $timeout(function() {
       console.log(self.counter);
     self.countdown();
     self.counter--;
    }, 1000);
    };

  self.stopVisibleTimer = function(){

   $timeout.cancel(stopped);

    }

    getVerbs();

    self.start = function(){
      self.stop();
      self.stopVisibleTimer();

      getCurrentVerb();
      self.countdown();
      promise = $interval(function(){
        ScoreFactory.addIncorrect();
        getCurrentVerb();

      }, TIME_INTERVAL);
    };

    self.stop = function(){
      $interval.cancel(promise);
    };

    var destroy = $rootScope.$on('$locationChangeSuccess', function(){
      $interval.cancel(promise);
      destroy();
    });

    // if there are no more verbs in game array, switch to score view. otherwise, take verb object from game array,
    // seperate out definition and correct verb, call assignGuessOptions()
    function getCurrentVerb(){
      if(self.gameVerbs.length ==0){
        self.stop();
        self.changeView();
      } else {
          self.counter = 10;
          currentVerbObject = GameFactory.getCurrentVerbObject(); // {currentVerb:currentVerb, currentVerbDefinition:currentVerbDefinition}
          self.currentVerbDefinition = currentVerbObject.definition;
          self.currentVerb = currentVerbObject.phrasal_verb;
          //console.log(self.currentVerbDefinition, self.currentVerb);
          assignGuessOptions();
      }
    };


    function getVerbs() {
      //console.log("GAME VERBS!");
      GameFactory.getVerbs().then(function(response) {
        self.databaseVerbs = GameFactory.databaseVerbs();
        self.uniquePhrasalVerbs = GameFactory.uniquePhrasalVerbs();
        self.gameVerbs = GameFactory.gameVerbs(); //get array of verb objects to be used in game.
        self.start(); //start timer
      });
    }

    function assignGuessOptions(){
      self.guessOptions = GameFactory.assignGuessOptions();
      //console.log(self.guessOptions);
    }

    // check if answer correct/incorrect, add to variable in factory.
    // Assign self.correct/incorrect to update variables in factory,
    // reset timer which calls self.getCurrentVerb() to repopulate game
    // with definition and guess options
    self.isCorrect = function(verbPicked){
      if(this.currentVerb == verbPicked){
        ScoreFactory.addCorrect();
        self.correct = ScoreFactory.correct();
        self.start();
      } else {
        ScoreFactory.addIncorrect();
        self.incorrect = ScoreFactory.incorrect();
        self.start();
      }
    }

  }]);
