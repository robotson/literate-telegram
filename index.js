"use strict";
let express = require('express');
let app = express();
let fs = require('fs');

let dictionary = require('./bigrams/sayableBigramsShort.json');
let keys = Object.keys(dictionary);
let keyCount = keys.length;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/", function(req, res) {
  res.render('index', {data: randomPoem()});
})
app.listen(1337);



function randomPoem() {
  var buffer = "";
  var keyIndex = Math.floor(Math.random() * keyCount);
  var pick = keys[keyIndex];
  buffer += pick;
  var oldBuffer;
  while(true) {
    var nextPickIndex = Math.floor(Math.random() * dictionary[pick].length);
    var nextPick = dictionary[pick][nextPickIndex];
    buffer += " " + nextPick;
    var pickIndex = keys.indexOf(nextPick);
    while(pickIndex > -1) {
      pick = keys[pickIndex];
      nextPickIndex = Math.floor(Math.random() * dictionary[pick].length);
      nextPick = dictionary[pick][nextPickIndex];
      let lookahead = buffer + " " + nextPick ;
      if(lookahead.length > 140) {
        if (buffer.length - oldBuffer.length < 7) buffer = oldBuffer;
        return buffer;
      }
      oldBuffer = buffer;
      buffer += " ";
      buffer += nextPick;
      pickIndex = keys.indexOf(nextPick);
    }
  }
  return buffer;
}