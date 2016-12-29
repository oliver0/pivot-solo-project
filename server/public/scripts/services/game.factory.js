app.factory('GameFactory', ["$http", "ScoreFactory", "AuthFactory", function($http, ScoreFactory, AuthFactory) {
  console.log('Game Factory running');

  var GAME_VERBS = 10;
  var GUESS_OPTIONS = 4;
  var uniqueGuessFillers = undefined;
  var gameVerbs = [];
  var guessOptions = [];
  var correctAnswer;
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
        .then(function (response) {
          gameVerbs = response.data.verbs;
          if (currentGameId === 3) {
            uniqueGuessFillers  = response.data.uniquePrepositions;
          } else {
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
  function getCurrentVerbObject() {
    currentVerbObject = gameVerbs.pop();
    console.log('CURRENT VERB OBJECT PERCENT:', currentVerbObject.percentage);
    ScoreFactory.setVerbId(currentVerbObject.verb_id);

    if (currentGameId === 1 || currentGameId === 2) {
      correctAnswer = currentVerbObject.phrasal_verb;
      if (currentGameId === 1) {gameQuestion = currentVerbObject.definition;}
    }

    if (currentGameId === 2 || currentGameId === 3) {
      gameQuestion = currentVerbObject.sentence;
      if (currentGameId === 3) {
        correctAnswer = currentVerbObject.preposition;
      }
    }
    return { gameQuestion: gameQuestion, correctAnswer: correctAnswer };
  }

  // copy unique phrasal verb array, if correct verb in it remove it. For loop runs as long as number of options,
  // assign correct answer to random position and random wrong answers to other positions
  function assignGuessOptions() {
    guessOptions = [];
    var unique = removeCorrectAnswer();
    console.log(unique);
    correctAnswerPosition = randomNumber(0, GUESS_OPTIONS - 1);

    for (var i = 0; i < GUESS_OPTIONS; i++) {
      if (i === correctAnswerPosition) {
        guessOptions.push(correctAnswer);
      } else {
        var indexWrongAnswer = randomNumber(0, unique.length - 1);
        var wrongAnswer = unique.splice(indexWrongAnswer, 1);
        if(currentGameId === 1 || currentGameId === 2){ guessOptions.push(wrongAnswer[0].phrasal_verb);}
        if(currentGameId === 3){guessOptions.push(wrongAnswer[0].preposition);}
      }
    }
    return guessOptions;
  }

  function removeCorrectAnswer() {
    var unique = uniqueGuessFillers.slice(0); //unique is a list of objects. {phrasal_verb: "get up"}
    for (var i = 0; i < unique.length; i++) {
      if (unique[i].phrasal_verb === correctAnswer || unique[i].preposition === correctAnswer) { // finds correct verb in unique
        unique.splice(i, 1); // removes it so we don't have duplicate correct answers.
      }
    }
    return unique;
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
  }

  var gameData = {
    correctAnswerPosition: function () {
      return correctAnswerPosition;
    },
    uniqueGuessFillers: function () {
      return uniqueGuessFillers;
    },
    getVerbs: function () {
      return getVerbs();
    },
    gameVerbs: function () {
      return gameVerbs;
    },
    getCurrentVerbObject: function () {
      return getCurrentVerbObject();
    },
    assignGuessOptions: function() {
      return assignGuessOptions();
    }
  }

  return gameData;
}]);
