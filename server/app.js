require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var users = require('./routes/users.js');
var verbsNoAuth = require('./routes/verbsNoAuth');
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

app.use('/verbsNoAuth', verbsNoAuth);

app.use(decoder.token);
//my routes
app.use('/users', users);
app.use('/verbs', verbs);
app.use('/scores', scores);
app.use('/verb_table', verbTable);
app.use('/progress', progress);


// server index file


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
