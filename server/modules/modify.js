var random = require('../modules/random');

function modifyVerbList(verbs) {
  var gameVerbs = [];
  gameVerbs.push(verbs[random(0, 1)]);
  // for (var i = 0; i < verbs.length; i++) {
  //   gameVerbs.push(verbs[i].percentage);
  // }

  return gameVerbs;
}

module.exports = modifyVerbList;
