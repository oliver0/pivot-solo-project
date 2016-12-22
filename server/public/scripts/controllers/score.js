app.controller("ScoreController", ["$http", "ScoreFactory", "$rootScope", "$location", function($http, ScoreFactory, $rootScope, $location){

  console.log("ScoreController running");

  var self = this;
  // reset score on view change -
  var destroy = $rootScope.$on('$locationChangeSuccess', function(){
    ScoreFactory.resetGameData();
    destroy();
  });

  self.correct = ScoreFactory.correct();
  self.incorrect = ScoreFactory.incorrect();
  self.percentage = (self.correct / (self.correct + self.incorrect))*100;
  self.fiftyPercentAbove = self.percentage >= 50;

  self.changeView = function(){
    $location.path("game");
  }

  }]);
