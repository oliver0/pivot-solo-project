app.factory('GameFactory', ["$http", "ScoreFactory", "AuthFactory", function($http, ScoreFactory, AuthFactory) {
  console.log('Game Factory running');

  var GAME_VERBS = 10;
  var GUESS_OPTIONS = 4;
  var uniqueGuessFillers = undefined;
  var gameVerbs = [];
  var guessOptions = [];
  var currentVerb;
  var currentVerbObject;
  var currentGameId;
  var correctAnswerPosition;
  var gameQuestion;


  function resetGame(){
    ScoreFactory.resetGameData();
    gameVerbs = [];
    guessOptions = [];
  }

  function getVerbs() {
    resetGame();
    currentGameId = ScoreFactory.getGameId();
    currentUser = AuthFactory.getCurrentUser();
    if(currentUser) {
      console.log("NUMBER 2");
      return currentUser.getToken().then(function(idToken){
        console.log("NUMBER 3");
        return $http({
          method: 'GET',
          url: '/verbs/' + GAME_VERBS,
          headers: {
            id_token: idToken
          }
        })
        .then(function(response) {
          gameVerbs = response.data.verbs;
          if (currentGameId === 3) {
            uniqueGuessFillers  = response.data.uniquePrepositions;
          } else{
            uniqueGuessFillers  = response.data.uniquePhrasalVerbs;
          }
          console.log(uniqueGuessFillers);
        });
      });
    }
    else{
      console.log('An error has occurred');
    }
  }

  // get verb and definition from object returned from gameVerbs.pop(). return both in an object
  function getCurrentVerbObject(){
    currentVerbObject = gameVerbs.pop();
    console.log("CURRENT VERB OBJECT PERCENT:", currentVerbObject.percentage);
    if(currentGameId === 1){
      gameQuestion = currentVerbObject.definition;
    }
    if(currentGameId === 2){
      gameQuestion = currentVerbObject.sentence;
    }
    ScoreFactory.setVerbId(currentVerbObject.verb_id);
    currentVerb = currentVerbObject.phrasal_verb;

    return {gameQuestion:gameQuestion, currentVerb:currentVerb};
  }

  // copy unique phrasal verb array, if correct verb in it remove it. For loop runs as long as number of options,
  // assign correct answer to random position and random wrong answers to other positions
  function assignGuessOptions(){
    guessOptions = [];
    var uniqueVerbs = uniquePhrasalVerbs.slice(0); //uniqueVerbs is a list of objects. {phrasal_verb: "get up"}
    for (var i = 0; i < uniqueVerbs.length; i++) {
      if(uniqueVerbs[i].phrasal_verb == currentVerb) { // finds correct verb in uniqueVerbs
        uniqueVerbs.splice(i, 1); // removes it so we don't have duplicate correct answers.
      }
    }
    correctAnswerPosition = randomNumber(0, GUESS_OPTIONS-1);
    for (var i = 0; i < GUESS_OPTIONS; i++) {
      if(i == correctAnswerPosition){
        guessOptions.push(currentVerb);
      } else{
        var indexWrongVerb = randomNumber(0, uniqueVerbs.length-1);
        var wrongVerb = uniqueVerbs.splice(indexWrongVerb,1);

        guessOptions.push(wrongVerb[0].phrasal_verb);
      }
    }
    return guessOptions;
  }

  function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
  }

  var gameData = {
    correctAnswerPosition: function(){
      return correctAnswerPosition;
    },
    uniquePhrasalVerbs: function() {
      return uniquePhrasalVerbs;
    },
    getVerbs: function() {
      return getVerbs();
    },
    gameVerbs: function(){
      return gameVerbs;
    },
    getCurrentVerbObject: function(){
      return getCurrentVerbObject();
    },
    assignGuessOptions: function() {
      return assignGuessOptions();
    }
  }

  return gameData;
}]);
