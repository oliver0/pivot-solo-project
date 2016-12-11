app.factory("ScoreFactory", ["$http", function($http) {

  console.log("ScoreFactory up and running");

  var gameId;
  var correct = 0;
  var incorrect = 0;

  function setGameId(id){
    gameId = id;
    return;
  }

  function addCorrect(){
    correct++;
    console.log("Correct", correct);
    return;
  }

  function addInCorrect(){
    incorrect++;
    console.log("Incorrect:", incorrect);
    return;
  }

  function resetGameData(){
    console.log("GAME RESET!");
    correct = 0;
    incorrect = 0;
    return;
  }

  var scoreData = {
    setGameId: function(id) {
      return setGameId(id);
    },
    correct: function() {
      return correct;
    },
    incorrect: function() {
      return incorrect;
    },
    addCorrect: function() {
      return addCorrect();
    },
    addIncorrect: function() {
      return addInCorrect();
    },
    resetGameData: function() {
      return resetGameData();
    }


  }

  return scoreData;
}]);
