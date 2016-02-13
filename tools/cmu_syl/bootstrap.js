"use strict";
var fs = require('fs');
let path = require('path');

(function(textFile, name){

  fs.readFile(path.join(__dirname + textFile), 'utf8', function (err, file) {
    if (err) {
      console.log(err);
      return err;
    }
  
    let lines = file.split('\n');
    var dictionary = {};
    
    // console.log(lines[432], lines[5934]);
    lines.map(function(item){
      let words = item.split('  ');
      
      // console.log(words[0], "---", words[1]);

      let key = words[0].toLowerCase();
      
      let key2 = key.replace(/^\W|^\d/, '');
      if(key == key2) {
        let key3 = key.replace(/\(\d\)$/, '');
        if(key == key3) {
          let key4 = key.replace(/\d*$/, '');
          if(key4 == key){
            if(dictionary[key] === undefined){
              dictionary[key] = words[1];
            }
          }
        }
      }
    })
    fs.writeFile(name, JSON.stringify(dictionary), 'utf8', function(){
      console.log("write complete!");
    })
  });
})("/cmudict_syl.txt", "cmudict_syl.json");