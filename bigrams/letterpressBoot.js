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
      dictionary[item] = true;
    })
    fs.writeFile(name, JSON.stringify(dictionary), 'utf8', function(){
      console.log("write complete!");
    })
  });
})("/letterpress.txt", "letterpress.json");