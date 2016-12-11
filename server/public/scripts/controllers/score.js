app.controller("ScoreController", ["$http", "ScoreFactory", "$rootScope", function($http, ScoreFactory, $rootScope){

  console.log("ScoreController running");

  var self = this;

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
