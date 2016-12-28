var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var users = require('./routes/users.js');
var verbs = require('./routes/verbs.js');
var scores = require('./routes/scores.js');
var verbTable = require('./routes/verb_table.js');
var progress = require('./routes/progress.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serve static files
app.use(express.static(path.resolve('./server/public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.use(decoder.token);
//my routes
app.use('/users', users);
app.use('/verbs', verbs);
app.use('/scores', scores);
app.use('/verb_table', verbTable);
app.use('/progress', progress);


// server index file


app.listen(3000, function() {
  console.log("server running, check localhost:3000");
});
