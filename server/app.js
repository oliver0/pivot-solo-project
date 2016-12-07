var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var verbs = require('./routes/verbs.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serve static files
app.use(express.static(path.resolve('./server/public')));


//my routes
app.use('/verbs', verbs);

// server index file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.listen(3000, function() {
  console.log("server running, check localhost:3000");
});
