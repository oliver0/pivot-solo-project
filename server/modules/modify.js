var random = require('../modules/random');

function modifyVerbList(verbs) {
  var verb;
  var gameVerbs = [];
  var oneOfWOrstTwo = verbs.splice(random(0, 1), 1);
  gameVerbs.push(oneOfWOrstTwo);


  for (var i = 0; i < 9; i++) {
    var lowPercent = Math.round(verbs.length / 2);
    if (i < 5) {
      verb = verbs.splice(random(0, lowPercent - 1), 1);
      gameVerbs.push(verb);
    } else {
      verb = verbs.splice(random(lowPercent, verbs.length - 1), 1);
      gameVerbs.push(verb);
    }
  }
  return gameVerbs;
}

module.exports = modifyVerbList;
