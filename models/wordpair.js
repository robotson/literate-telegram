"use strict";
let mongoose = require('mongoose');

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

mongoose.model("WordPair", WordPairSchema);





