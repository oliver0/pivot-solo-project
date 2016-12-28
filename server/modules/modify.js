var random = require('../modules/random');

// function randomize(gameVerbs) {
//   var length = gameVerbs.length;
//   var randomized = [];
//   for (var i = 0; i < length; i++) {
//     verb = gameVerbs.splice(random(0, gameVerbs.length - 1), 1);
//     randomized.push(verb[0]);
//   }
//   return randomized;
// }

function modifyVerbList(verbs) {
  var verb;
  var gameVerbs = [];
  var oneOfWOrstTwo = verbs.splice(random(0, 1), 1);
  gameVerbs.push(oneOfWOrstTwo[0]);


  for (var i = 0; i < 9; i++) {
    var lowPercent = Math.round(verbs.length / 2);
    if (i < 5) {
      verb = verbs.splice(random(0, lowPercent - 1), 1);
      gameVerbs.push(verb[0]);
    } else {
      verb = verbs.splice(random(lowPercent, verbs.length - 1), 1);
      gameVerbs.push(verb[0]);
    }
  }
  // console.log("GAME VERBS IN MODIFY:",randomize(gameVerbs));
  return gameVerbs;
}

module.exports = modifyVerbList;
