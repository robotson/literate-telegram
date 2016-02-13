"use strict";
let fs = require('fs');

module.exports = function sortBigramText(textFile, name){

  fs.readFile(textFile, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      return err;
    }
  
    let bigrams = data.split('\r');
    var dictionary = {};
    
    bigrams.map(function(item){
      let words = item.split('\t');
      
      let first = words[1].toLowerCase();
      let next = words[2].toLowerCase();

      if(dictionary[first] === undefined){
        dictionary[first] = [next];
      }
      else{
        if(dictionary[first].indexOf(next) === -1){
          dictionary[first].push(next);
        }
      }
    })
    fs.writeFile(name, JSON.stringify(dictionary), 'utf8', function(){
      console.log("write complete!");
    })
  });
}