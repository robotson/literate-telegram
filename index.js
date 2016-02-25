"use strict";
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var randomPoem = require('./tools/poemBuilder1.js')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static("client"))
app.use(bodyParser.json());

app.get("/poem", function(req, res) {
  res.render('index', {data: randomPoem()});
})


/////???????////?////????//?

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/literate_telegram");
let WordPairSchema = new mongoose.Schema({

  aKey: String,
  bKey: String,
  cKey: String,

  aPhones: String,
  bPhones: String,
  cPhones: String,

  aCount: Number,
  bCount: Number,
  cCount: Number,

  occurances: Number,

});
let PronunciationSchema = new mongoose.Schema({
  key: String,
  phones: String,
  syllable_count: Number,
  alternate: Boolean
});

var Pronunciation = mongoose.model("Pronunciation", PronunciationSchema);
var WordPair = mongoose.model("WordPair", WordPairSchema);


app.post("/pronunciation", function(req, res){
  console.log(req.body);
  // Pronunciation.findOne({key: req.body.key}, function(err, word){
  //   if(err) res.status(404).json(err)
  //   else res.json(word);
  // })
})

app.get("/word-pairs/random", function(req, res){
  WordPair.aggregate([{$sample: {size: 1}},{$project: {_id: false, aKey:true, bKey:true}}], function(err, words){
    res.json(words[0]);
  });
})

app.post("/word-pairs/next", function(req, res){
  // console.log(req.body)
  WordPair.aggregate([{$match: {aKey: req.body.bKey}}, {$sample: {size: 1}}, {$project: {_id: false, aKey:true, bKey:true}}], function(err, pairs){
    // console.log(pairs);
    res.json(pairs);
  })
})




app.listen(1337, function(){
  console.log('l33t rhymes')
});