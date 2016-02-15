"use strict";
let path = require('path');
let fs = require('fs');

  fs.readFile(path.join(__dirname + "/cmudict_syl.txt"), 'utf8', function (err, file) {
    if (err) {
      console.log(err);
      return err;
    }
  
    let lineQueue = file.split('\n');
    var lines = lineQueue.reverse();
    var result = [];

    lines.map(function(item){

      let words = item.split('  ');
      let key = words[0].toLowerCase();
      let pronunciationString = words[1];
      let syllableCount = pronunciationString.split(' - ').length;

      let key2 = key.replace(/^\W|^\d/, '');
      if(key == key2) {
        //there are no special characters in front of the string
        let key4 = key.replace(/\d*$/, '');
        if(key4 == key){
          //there are no digits at the end of the string
          
          //determine if key is an alternate spelling:
          let key3 = key.replace(/\(\d\)$/, '');
          let alternate = (key == key3) ? false : true;

          let pronunciation = {
              key: key3, 
              phones: pronunciationString, 
              syllable_count: syllableCount,
              alternate: alternate
          };

          result.push(pronunciation);
        }
      }
    })

    fs.writeFile("cmudict_syl_reversed.json", JSON.stringify(result), 'utf8', function(){
      console.log("write complete!");
    })

  })//fs.readfile
