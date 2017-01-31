app.controller("ChoiceController", ["$http", "ScoreFactory", function($http, ScoreFactory){

  var self = this;
  //--------------------------------------------------------------------------//

  self.setGameId = function(id){
    console.log("Game ID:", id);
    ScoreFactory.setGameId(id);
  }
  //--------------------------------------------------------------------------//


}]);
//----------------------------------------------------------------------------//
