app.factory('GameFactory', ["$http", "ScoreFactory", function($http, ScoreFactory) {
  console.log('Game Factory running');

  var GAME_VERBS = 10;
  var GUESS_OPTIONS = 4;
  var databaseVerbs = undefined;
  var uniquePhrasalVerbs = undefined;
  var sentences = undefined;
  var gameVerbs = [];
  var guessOptions = [];
  var currentVerb;
  var currentVerbObject;
  var currentGameId;


  function getVerbs() {
    currentGameId = ScoreFactory.getGameId();
    return $http.get('/verbs')
    .then(function(response) {
      sentences = response.data.sentences;
      databaseVerbs = response.data.verbs;
      uniquePhrasalVerbs  = response.data.uniquePhrasalVerbs ;
      //console.log('CURRENT GAME ID:', currentGameId);
      addVerbsToGame(currentGameId);
    });
  }

  // add verbs to game array, currently 10 but can be changed.
  function addVerbsToGame(gameId){
    //console.log('GAME ID:', gameId);
    var verbList;
    if(gameId === 1){
      verbList = databaseVerbs;
    }
    if(gameId === 2){
      verbList = sentences;
    }
    for (var i = 0; i < GAME_VERBS ; i++) {
      var verb = verbList[randomNumber(0, verbList.length-1)];
      gameVerbs.push(verb);
    }
  }
  // get verb and definition from object returned from gameVerbs.pop(). return both in an object
  function getCurrentVerbObject(){
    currentVerbObject = gameVerbs.pop();
    //console.log('CURRENT VERB OBJECT:', currentVerbObject);
    //console.log('currentVerbObject ID:', currentVerbObject.id );
    ScoreFactory.setVerbId(currentVerbObject.id);
    currentVerb = currentVerbObject.phrasal_verb;
    //console.log('CURRENT VERB OBJECT', currentVerbObject);
    return currentVerbObject;
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
    var correctAnswerPosition = randomNumber(0, GUESS_OPTIONS-1);
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
    databaseVerbs: function() {
      return databaseVerbs;
    },
    sentences: function() {
      return sentences;
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
