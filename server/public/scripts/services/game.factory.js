app.factory('GameFactory', ["$http", function($http) {
  console.log('Game Factory running');

  var GAME_VERBS = 10;
  var GUESS_OPTIONS = 4;
  var databaseVerbs = undefined;
  var uniquePhrasalVerbs = undefined;
  var gameVerbs = [];
  var guessOptions = [];


  function getVerbs() {
    return $http.get('/verbs')
    .then(function(response) {
      console.log('SENTENCE DATA', response.data.sentences);
      databaseVerbs = response.data.verbs;
      uniquePhrasalVerbs  = response.data.uniquePhrasalVerbs ;
      addVerbsToGame();
    });
  }

  // add verbs to game array, currently 10 but can be changed.
  function addVerbsToGame(){
    for (var i = 0; i < GAME_VERBS ; i++) {
      var verb = databaseVerbs[randomNumber(0, databaseVerbs.length-1)];
      gameVerbs.push(verb);
    }
  }
  // get verb and definition from object returned from gameVerbs.pop(). return both in an object
  function getVerbAndDefinition(){
    var currentVerbObject = gameVerbs.pop();
    currentVerb = currentVerbObject.phrasal_verb;
    currentVerbDefinition = currentVerbObject.definition;
    console.log("factory current verb object", currentVerbObject);
    return {currentVerb:currentVerb, currentVerbDefinition:currentVerbDefinition}
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
    uniquePhrasalVerbs: function() {
      return uniquePhrasalVerbs;
    },
    getVerbs: function() {
      return getVerbs();
    },
    gameVerbs: function(){
      return gameVerbs;
    },
    getVerbAndDefinition: function(){
      return getVerbAndDefinition();
    },
    assignGuessOptions: function() {
      return assignGuessOptions();
    }

  }

  return gameData;
}]);
