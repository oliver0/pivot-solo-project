app.controller("ScoreController", ["$http", "ScoreFactory", function($http, ScoreFactory){

  console.log("ScoreController running");

  var self = this;

  self.correct = ScoreFactory.correct();
  self.incorrect = ScoreFactory.incorrect();
  self.percentage = (self.correct / (self.correct + self.incorrect))*100;

  }]);
