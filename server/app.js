var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//var decoder = require('./modules/decoder');
//var privateData = require('./routes/private-data');

var verbs = require('./routes/verbs.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serve static files
app.use(express.static(path.resolve('./server/public')));

// routes without authentication
app.use('/verbs', verbs);

//app.use(decoder.token);

// routes with authentication
// app.use("/privateData", privateData);



// server index file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.listen(3000, function() {
  console.log("server running, check localhost:3000");
});
