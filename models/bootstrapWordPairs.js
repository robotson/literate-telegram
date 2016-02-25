"use strict";
// require the fs module for loading model files
// require path for getting the models path
let fs = require('fs');
let path = require('path');

//model code for pronunciations

// require mongoose
let mongoose = require('mongoose');
// connect to mongoose!
mongoose.connect("mongodb://localhost/literate_telegram");

require(path.join(__dirname) + '/' + "wordpair.js");

let WordPair = mongoose.model("WordPair");

//parse CMUdict:
var queue = require('./../tools/bigrams/sortByCount/bigramCount.json')
insert(queue.pop())

function insert(item){

  WordPair.create(item, function(err, word){
    if(queue.length){
      insert(queue.pop())
    }
    else{
      mongoose.disconnect(console.log("bootstrap complete"));
    }
  })

}

