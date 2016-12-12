app.factory("ScoreFactory", ["$http", function($http) {

  console.log("ScoreFactory up and running");

  var gameId;
  var correct = 0;
  var incorrect = 0;
  var currentUserId = 1;
  var scoreInfo = {};
  var verb_id;

  function setGameId(id){
    gameId = id;
    return;
  }

  function setVerbId(id){
    verb_id  = id;
    return;
  }

  function getGameId(){
    return gameId;
  }

  function addScore(correct, incorrect) {
    scoreInfo.user_id = currentUserId;
    scoreInfo.correct = correct;
    scoreInfo.incorrect = incorrect;
    scoreInfo.verb_id = verb_id;
    scoreInfo.game_id = gameId;
    console.log('SCORE INFO:', scoreInfo);
    return $http.post('/scores', scoreInfo)
    .then(function(response) {
      console.log('POST SUCCESSFUL');
    });
  }

  function addCorrect(){
    correct++;
    addScore(1, 0);
    //console.log("Correct", correct);
    return;
  }

  function addInCorrect(verb_id){
    incorrect++;
    addScore(0, 1);
    //console.log("Incorrect:", incorrect);
    return;
  }

  function resetGameData(){
    //console.log("GAME RESET!");
    correct = 0;
    incorrect = 0;
    return;
  }

  var scoreData = {
    setGameId: function(id) {
      return setGameId(id);
    },
    setVerbId: function(id) {
      return setVerbId(id);
    },
    getGameId: function() {
      return getGameId();
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
