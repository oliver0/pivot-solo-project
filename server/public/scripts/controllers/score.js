app.controller("ScoreController", ["$http", "ScoreFactory", "$rootScope", "$location", function($http, ScoreFactory, $rootScope, $location){

  console.log("ScoreController running");

  var self = this;
  var currentGame;
  // reset score on view change -
  var destroy = $rootScope.$on('$locationChangeSuccess', function(){
    ScoreFactory.resetGameData();
    destroy();
  });

  self.correct = ScoreFactory.correct();
  self.incorrect = ScoreFactory.incorrect();
  self.percentage = (self.correct / (self.correct + self.incorrect))*100;

  self.changeView = function(){
    $location.path("definition");
  }

  getCurrentGame();

  function getCurrentGame(){
    var gameId = ScoreFactory.getGameId();
    if(gameId === 1){
      currentGame = "definition";
    }
    if(gameId ===2){
      currentGame = "blank";
    }
  }

  }]);
