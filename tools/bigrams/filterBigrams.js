"use strict";
let fs = require('fs');
let path = require('path');
let CMU = require('./cmudict_syl.json');
let ShortList = require('./letterpress.json');

(function(textFile, name){

   fs.readFile(path.join(__dirname + textFile), 'utf8', function (err, file) {
    if (err) {
      console.log(err);
      return err;
    }
  
    let bigrams = file.split('\r');
    var dictionary = {};
    
    bigrams.map(function(item){
      let words = item.split('\t');
      
      let first = words[1].toLowerCase();
      let next = words[2].toLowerCase();
      if( CMU[first] !== undefined && CMU[next] !== undefined && 
        (ShortList[first] !== undefined || first.length < 2) &&
        (ShortList[next] !== undefined || next.length < 2)
      ){

        if(dictionary[first] === undefined){
          dictionary[first] = [next];
        }
        else{
          if(dictionary[first].indexOf(next) === -1){
            dictionary[first].push(next);
          }
        }
      }
    })
    fs.writeFile(name, JSON.stringify(dictionary), 'utf8', function(){
      console.log("write complete!");
    })
  });
})("/bigrams.txt", "sayableBigramsShort.json");