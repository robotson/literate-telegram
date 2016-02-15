"use strict";
let mongoose = require('mongoose');

let PronunciationSchema = new mongoose.Schema({
  key: String,
  phones: String,
  syllable_count: Number,
  alternate: Boolean
});

mongoose.model("Pronunciation", PronunciationSchema);





