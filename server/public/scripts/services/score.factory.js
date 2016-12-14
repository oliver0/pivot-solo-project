app.factory("ScoreFactory", ["$http", "AuthFactory", "$location", function($http, AuthFactory, $location) {

  console.log("ScoreFactory up and running");

  var gameId;
  var correct = 0;
  var incorrect = 0;
  var currentUserId = 2;
  var scoreInfo = {};
  var verb_id;
  var authFactory = AuthFactory;

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
    scoreInfo.correct = correct;
    scoreInfo.incorrect = incorrect;
    scoreInfo.verb_id = verb_id;
    scoreInfo.game_id = gameId;
    scoreInfo.date = new Date();
    console.log('DIFFERENT!');
    currentUser = AuthFactory.getCurrentUser();
    console.log('CURRENT USER:', currentUser);
    if(currentUser) {
      currentUser.getToken().then(function(idToken){
        console.log('USER:', idToken);
        return $http({
          method: 'POST',
          url: '/scores',
          data: scoreInfo,
          headers: {
            id_token: idToken
          }
        });
  });
  }
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

  function currentGameView(){

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
