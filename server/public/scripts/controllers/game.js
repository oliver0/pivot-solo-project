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
  self.correctAnswer = "";
  self.guessOptions = [];
  self.uniqueGuessFillers = [];
  self.correct = 0;
  self.incorrect = 0;
  self.flag = true;
  self.startClicked = false;


  self.changeView = function(){
    $location.path("score");
  }

  self.countdown = function() {
    stopped = $timeout(function() {
      self.countdown();
      self.counter--;
      self.timeRunningOut = self.counter <= 3;
    }, 1000);
  };

  self.stopVisibleTimer = function(){
    $timeout.cancel(stopped);
  }

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

  self.stop = function(){
    $interval.cancel(promise);
  };

  var destroy = $rootScope.$on('$locationChangeSuccess', function(){
    $timeout.cancel(stopped);
    $interval.cancel(promise);
    destroy();
  });

  getVerbs();

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
      self.correctAnswer = currentVerbObject.correctAnswer;
      assignGuessOptions();
    }
  };


  function getVerbs() {
    //console.log("GAMEFACTORY:", GameFactory.getVerbs());
    GameFactory.getVerbs().then(function(response) {
      self.uniqueGuessFillers = GameFactory.uniqueGuessFillers();
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
  self.isCorrect = function(guessOptionPicked, guessOptionElement){
    if(self.flag){
      self.flag = false;

      if(this.correctAnswer == guessOptionPicked){
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
    }, 1000)
  }

}]);
