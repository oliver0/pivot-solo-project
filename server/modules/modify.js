var random = require('../modules/random');

function modifyVerbList(verbs, numVerbs) {
  var verb;
  var gameVerbs = [];
  var oneOfWOrstTwo = verbs.splice(random(0, 1), 1);
  gameVerbs.push(oneOfWOrstTwo[0]);

  var lowPercentNumber = Math.round(numVerbs/2);
  for (var i = 0; i < numVerbs - 1; i++) {
    var lowPercent = Math.round(verbs.length / 2);
    if (i < lowPercentNumber+1) {
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
