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

  function getVerbAndDefinition(){
    var currentVerbObject = gameVerbs.pop();
    currentVerb = currentVerbObject.phrasal_verb;
    currentVerbDefinition = currentVerbObject.definition;
    console.log("factory current verb object", currentVerbObject);
    return {currentVerb:currentVerb, currentVerbDefinition:currentVerbDefinition}
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
    currentVerb: function(){
      return currentVerb;
    },
    currentVerbDefinition: function(){
      return currentVerbDefinition;
    },
    getVerbAndDefinition: function(){
      return getVerbAndDefinition();
    }


  }

  return gameData;
}]);
