app.factory('GameFactory', ["$http", function($http) {
  console.log('Game Factory running');

  var GAME_VERBS = 10;
  var databaseVerbs = undefined;
  var uniquePhrasalVerbs = undefined;
  var gameVerbs = [];

  function getVerbs() {
    return $http.get('/verbs')
    .then(function(response) {
      databaseVerbs = response.data.verbs;
      uniquePhrasalVerbs  = response.data.uniquePhrasalVerbs ;
      addVerbsToGame();
      //console.log("GF database verbs:", databaseVerbs);
      //console.log("GF uniqueVerbs verbs:", uniquePhrasalVerbs );
    });
  }

  // add verbs to game array, currently 10 but can be changed.
  function addVerbsToGame(){
    for (var i = 0; i < GAME_VERBS ; i++) {
      var verb = databaseVerbs[randomNumber(0, databaseVerbs.length-1)];
      gameVerbs.push(verb);
    }
  }

  var gameData = {
    databaseVerbs: function() {
      return databaseVerbs;
    },
    uniquePhrasalVerbs: function() {
      return uniquePhrasalVerbs;
    },
    getVerbs: function() {
      // return our Promise to the Controller!
      return getVerbs();
    },
    gameVerbs: function(){
      return gameVerbs;
    }

  }

  return gameData;
}]);
