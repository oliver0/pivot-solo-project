app.controller("GameController", ["$http", "GameFactory", "ScoreFactory",
                "$location", "$interval", "$rootScope", "CountdownTimer",
                "$timeout", function($http, GameFactory, ScoreFactory, $location,
                $interval, $rootScope, CountdownTimer, $timeout){

  var self = this;
  var TIME_INTERVAL = 10000; // in milliseconds
  var BEGIN_TIME_WARNING = 3;
  var GUESS_OPTIONS = 4;
  var promise;
  var stopped;

  self.counter = 10;
  self.gameVerbs = [];
  self.currentVerbObject = {};
  self.currentGameQuestion = "";
  self.correctAnswer = "";
  self.guessOptions = [];
  self.uniqueGuessFillers = [];
  self.correct = 0;
  self.incorrect = 0;
  self.flag = true;
  self.startClicked = false;
  //--------------------------------------------------------------------------//

  self.changeView = function(){
    $location.path("score");
  };
  //--------------------------------------------------------------------------//

  // timer showing seconds ticking down --------------------------------------//
  self.countdown = function() {
    stopped = $timeout(function() {
      self.countdown();
      self.counter--;
      self.timeRunningOut = self.counter <= BEGIN_TIME_WARNING;
    }, 1000);
  };
  //--------------------------------------------------------------------------//

  // stop visual second timer ------------------------------------------------//
  self.stopVisibleTimer = function(){
    $timeout.cancel(stopped);
  };
  //--------------------------------------------------------------------------//

  // timer keeping track of seconds left to guess ----------------------------//
  self.start = function(){
    self.stopVisibleTimer();
    self.stop();
    getCurrentVerb();
    self.countdown();
    promise = $interval(function(){
      console.log('MAIN TIMER');
      ScoreFactory.addIncorrect();
      animationDelay(true, true);
      self.counter = 0;
    }, TIME_INTERVAL);
  };
  //--------------------------------------------------------------------------//

  // stop main game timer ----------------------------------------------------//
  self.stop = function(){
    $interval.cancel(promise);
  };
  //--------------------------------------------------------------------------//


  var destroy = $rootScope.$on('$locationChangeSuccess', function(){
    $timeout.cancel(stopped);
    $interval.cancel(promise);
    destroy();
  });
  //--------------------------------------------------------------------------//


  getVerbs();

  // if no more verbs in game array, switch to score view, otherwise, take verb
  // object from game array, seperate out definition and correct verb, call assignGuessOptions()
  function getCurrentVerb(){
    if (self.gameVerbs.length === 0) {

      self.stop();
      self.stopVisibleTimer();
      self.changeView();
    } else {
      self.counter = 10;
      currentVerbObject = GameFactory.getCurrentVerbObject();
      self.currentGameQuestion = currentVerbObject.gameQuestion;
      self.correctAnswer = currentVerbObject.correctAnswer;
      assignGuessOptions();
    }
  }
  //--------------------------------------------------------------------------//

  function getVerbs() {
    GameFactory.getVerbs().then(function(response) {
      self.uniqueGuessFillers = GameFactory.uniqueGuessFillers();
      //get array of verb objects to be used in game.
      self.gameVerbs = GameFactory.gameVerbs();
      self.start(); //start timer
    });
  }
  //--------------------------------------------------------------------------//


  function assignGuessOptions(){
    self.guessOptions = GameFactory.assignGuessOptions();
  }
  //--------------------------------------------------------------------------//


  // check if guess correct --------------------------------------------------//
  self.isCorrect = function(guessOptionPicked, guessOptionElement){
    // this prevents button mashing after choice made
    if(self.flag){
      self.flag = false;

      if(this.correctAnswer == guessOptionPicked){
        ScoreFactory.addCorrect();
        self.correct = ScoreFactory.correct();
        animationDelay();
      } else {
        ScoreFactory.addIncorrect();
        self.incorrect = ScoreFactory.incorrect();
        animationDelay(guessOptionElement, true);
      }
    }
  };
  //--------------------------------------------------------------------------//

  // visually show if guess correct. Always reveal correct answer ------------//
  function animationDelay(guessOptionElement, incorrect, timeRanOut){
    self.flag = false;
    self.stop();
    self.stopVisibleTimer();
    self.timeRunningOut = false;
    var correctPos = GameFactory.correctAnswerPosition();
    var correctID = "#guessOption"+correctPos;
    var correctElement = angular.element( document.querySelector(correctID ));
    var score = angular.element( document.querySelector('.gameScore'));
    correctElement.addClass('correctGreen');

    if(incorrect){
      score.addClass('redFont');
      if(!timeRanOut){
        var incorrectElement = angular.element( document.querySelector(guessOptionElement));
        incorrectElement.addClass('incorrectRed');
      }
    }
    else {
      score.addClass('scoreAnimation');
      score.addClass('greenFont');
    }
    delay = $timeout(function(){
      self.start();
      correctElement.removeClass('correctGreen');
      if(incorrect){
        incorrectElement.removeClass('incorrectRed');
        score.removeClass('redFont');
      } else {
        score.removeClass('scoreAnimation');
        score.removeClass('greenFont');
      }
      self.flag = true;
    }, 1000);
  }

}]);
//----------------------------------------------------------------------------//
