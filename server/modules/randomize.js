var random = require('../modules/random');

function randomize(gameVerbs) {
  var length = gameVerbs.length;
  var randomized = [];
  for (var i = 0; i < length; i++) {
    verb = gameVerbs.splice(random(0, gameVerbs.length - 1), 1);
    randomized.push(verb[0]);
  }
  return randomized;
}

module.exports = randomize;
