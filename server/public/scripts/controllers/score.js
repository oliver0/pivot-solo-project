app.controller("ScoreController", ["$http", "ScoreFactory", "$rootScope", function($http, ScoreFactory, $rootScope){

  console.log("ScoreController running");

  var self = this;

  var currentGame;

  getCurrentGame();

  function getCurrentGame(){
    var gameId = ScoreFactory.getGameId();
    console.log('GAME ID:', gameId);
    if(gameId === 1){
      currentGame = "#definition";
    }
    if(gameId ===2){
      currentGame = "#blank";
    }
    console.log('CURRENT GAME:',currentGame );
  }

  

  self.correct = ScoreFactory.correct();
  self.incorrect = ScoreFactory.incorrect();
  self.percentage = (self.correct / (self.correct + self.incorrect))*100;

  //when home/repeat clicked, ScoreFactory function resetGameData is called.

  // reset score on view change
  var destroy = $rootScope.$on('$locationChangeSuccess', function(){
    ScoreFactory.resetGameData();
    destroy();
  });

  }]);
