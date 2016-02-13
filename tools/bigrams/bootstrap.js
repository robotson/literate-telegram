"use strict";
let fs = require('fs');
let dictionary = require('./sayableBigramsShort.json');
let keys = Object.keys(dictionary);
let keyCount = keys.length;
let poemLines = [];
while(poemLines.length < 8){
  var buffer = "";
  var keyIndex = Math.floor(Math.random() * keyCount);
  var pick = keys[keyIndex];
  buffer += pick;
  var nextPick = dictionary[pick][Math.floor(Math.random() * dictionary[pick].length)];
  buffer += " " + nextPick;
  var pickIndex = keys.indexOf(nextPick);
  while(pickIndex > -1 && buffer.length < 60){

    pick = keys[pickIndex];
    nextPick = dictionary[pick][Math.floor(Math.random() * dictionary[pick].length)];
    if(Math.random() < .15) buffer += "\r";
    else buffer += " ";
    buffer += nextPick;
    
    pickIndex = keys.indexOf(nextPick);

  }
  if(buffer.length >= 10 && buffer.length <= 70){
    poemLines.push(buffer);
  }
}
let finshedPoem = poemLines.join('\n');
fs.writeFile('poem1', finshedPoem, 'utf8', function(){
  console.log("Finished!");
})