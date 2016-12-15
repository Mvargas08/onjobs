
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect Database MongoDB With Mongoose
mongoose.connect('mongodb://localhost/onJobs', function(err, res) {
  if (err) console.log('ERROR: Conectando con la BD: ' + err);
  else console.log('Conexión con la BD onJobs exitosa');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes/routes')(app);

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api of onJobs!' });   
});

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
