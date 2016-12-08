app.factory('GameFactory', ["$http", function($http) {
  console.log('Game Factory running');
  var databaseVerbs = undefined;
  var uniquePhrasalVerbs = undefined;

  function getVerbs() {
    return $http.get('/verbs')
    .then(function(response) {
      databaseVerbs = response.data.verbs;
      uniquePhrasalVerbs  = response.data.uniquePhrasalVerbs ;
      //console.log("GF database verbs:", databaseVerbs);
      //console.log("GF uniqueVerbs verbs:", uniquePhrasalVerbs );
    });
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
    }
  }

  return gameData;
}]);
