app.controller("GameController", ["$http", "GameFactory", "ScoreFactory", "$location", "$interval", "$rootScope", "CountdownTimer", "$timeout",function($http, GameFactory, ScoreFactory, $location, $interval, $rootScope, CountdownTimer, $timeout){

  var self = this;

  var TIME_INTERVAL = 10000; // in milliseconds
  var promise;
  var GUESS_OPTIONS = 4;
  self.counter = 10;
  var stopped;
  self.gameVerbs = [];
  self.currentVerbObject = {};
  self.currentGameQuestion = "";
  self.currentVerb = "";
  self.guessOptions = [];
  self.uniquePhrasalVerbs = [];
  self.correct = 0;
  self.incorrect = 0;
  self.flag = true;

  self.changeView = function(){
    $location.path("score");
  }

  self.countdown = function() {
    stopped = $timeout(function() {
     self.countdown();
     self.counter--;
     self.timeRunningOut = self.counter <= 3;
     console.log('SECOND TIMER');
    }, 1000);
  };

  self.stopVisibleTimer = function(){
   $timeout.cancel(stopped);
 }

    getVerbs();

    self.start = function(){
      self.stopVisibleTimer();
      self.stop();

      getCurrentVerb();
      self.countdown();
      promise = $interval(function(){
        console.log('MAIN TIMER');
        ScoreFactory.addIncorrect();
        getCurrentVerb();
      }, TIME_INTERVAL);
    };

    self.stop = function(){
      $interval.cancel(promise);
    };

    var destroy = $rootScope.$on('$locationChangeSuccess', function(){
      $timeout.cancel(stopped);
      $interval.cancel(promise);
      destroy();
    });

    // if there are no more verbs in game array, switch to score view. otherwise, take verb object from game array,
    // seperate out definition and correct verb, call assignGuessOptions()
    function getCurrentVerb(){
      if (self.gameVerbs.length === 0) {

        self.stop();
        self.stopVisibleTimer();
        self.changeView();
      } else {
          self.counter = 10;
          currentVerbObject = GameFactory.getCurrentVerbObject(); // {currentVerb:currentVerb, currentVerbDefinition:currentVerbDefinition}
          self.currentGameQuestion = currentVerbObject.gameQuestion;
          self.currentVerb = currentVerbObject.currentVerb;
          assignGuessOptions();
      }
    };


    function getVerbs() {
      GameFactory.getVerbs().then(function(response) {
        self.uniquePhrasalVerbs = GameFactory.uniquePhrasalVerbs();
        self.gameVerbs = GameFactory.gameVerbs(); //get array of verb objects to be used in game.
        self.start(); //start timer
      });
    }

    function assignGuessOptions(){
      self.guessOptions = GameFactory.assignGuessOptions();
    }

    // check if answer correct/incorrect, add to variable in factory.
    // Assign self.correct/incorrect to update variables in factory,
    // reset timer which calls self.getCurrentVerb() to repopulate game
    // with definition and guess options
    self.isCorrect = function(verbPicked, guessOptionElement){
      if(self.flag){
        self.flag = false;
        self.stop();
        self.stopVisibleTimer();
        self.timeRunningOut = false;
        if(this.currentVerb == verbPicked){
          ScoreFactory.addCorrect();
          self.correct = ScoreFactory.correct();
          //console.log(GameFactory.correctAnswerPosition());
          animationDelay();
        } else {
          ScoreFactory.addIncorrect();
          self.incorrect = ScoreFactory.incorrect();
          animationDelay(guessOptionElement, true);
        }
      }


    }

    function animationDelay(guessOptionElement, incorrect){
      var correctPos = GameFactory.correctAnswerPosition();
      var correctID = "#guessOption"+correctPos;
      var correctElement = angular.element( document.querySelector(correctID ));
      var score = angular.element( document.querySelector('.gameScore'));
      correctElement.addClass('green');

      if(incorrect){
        var incorrectElement = angular.element( document.querySelector(guessOptionElement));
        incorrectElement.addClass('red');
        score.addClass('redFont');
      } else {
        score.addClass('scoreAnimation');
        score.addClass('greenFont');
      }
      delay = $timeout(function(){
        self.start();
        correctElement.removeClass('green');
        if(incorrect){
          incorrectElement.removeClass('red');
          score.removeClass('redFont');
        } else {
          score.removeClass('scoreAnimation');
          score.removeClass('greenFont');
        }
        self.flag = true;
      }, 1000)
    }

  }]);
