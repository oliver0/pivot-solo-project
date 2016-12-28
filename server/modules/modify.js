function modifyVerbList(verbs){
  var percentages = [];
  for (var i = 0; i < verbs.length; i++) {
    percentages.push(verbs[i].percentage);
  }
  return percentages;
}

module.exports = modifyVerbList;
