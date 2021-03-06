var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl =  'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var db = null;

var creatorData = require('./creatorData');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res, next){
  res.status(200).render('home');
});

app.get('/about', function (req, res, next){
  var collection = db.collection('creators');
  collection.find({}).toArray(function (err, creators){
    if (err){
      res.status(500).send({
        error: "Error fetching creators from DB"
      });
    }else{
      res.status(200).render('about', {creators: creators});
    }
  });
});

app.get('/workoutPage', function (req, res, next){
  var collection = db.collection('workouts');
  collection.find({}).toArray(function (err, workouts){
    if (err){
      res.status(500).send({
        error: "Error fetching creators from DB"
      });
    }else{
      res.status(200).render('workoutPage', {workouts: workouts});
    }
  });
});

app.post('/workoutPage/addWorkout', function (req, res, next) {
  if (req.body && req.body.name && req.body.routine && req.body.creator) {
    var collection = db.collection('workouts');
    collection.insertOne(
      {name: req.body.name,
      routine: req.body.routine,
      creator: req.body.creator}
    );
  } else {
    res.status(400).send("Request needs a body");
  }
});

app.get('*', function (req, res, next) {
  res.status(404).render('404');
});

MongoClient.connect(mongoUrl, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
