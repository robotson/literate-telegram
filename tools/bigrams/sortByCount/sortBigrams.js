"use strict";
let fs = require('fs');
let path = require('path');
let CMU = require('./../cmudict_syl.json');
let ShortList = require('./../letterpress.json');
let dictionary = {};


(function(textFile, name){

    function flatten(a, b){
       return a.concat(b); 
    }

    function predicate(item){
      let words = item.split('\t');
      let first = words[1].toLowerCase();
      let next = words[2].toLowerCase();

      if( CMU[first] !== undefined && CMU[next] !== undefined && 
        (ShortList[first] !== undefined || first.length < 2) &&
        (ShortList[next] !== undefined || next.length < 2)
      ){

        if(dictionary[first] === undefined){
          dictionary[first] = [next];
          return true;
        }
        else{
          if(dictionary[first].indexOf(next) === -1){
            dictionary[first].push(next);
            return true;
          }
          else{
            return false;
          }
        }
      }
      else {
        return false;
      }
      
    }

    function bigramCount(a, b){
      let aWord = a.split('\t'),
          bWord = b.split('\t'),
          aCount = aWord[0],
          bCount = bWord[0];

         let aKey = aWord.slice(1);
         let bKey = bWord.slice(1);

      if(aCount - bCount !== 0){
        return aCount - bCount;
      }
      else{

        let arr = [aKey, bKey].sort();

        if(arr[1] == aKey){
          return -1
        }
        else{
          return 1
        }
      }




    }

   fs.readFile(path.join(__dirname + textFile), 'utf8', function (err, file) {
    if (err) {
      console.log(err);
      return err;
    }
  
    let sortedFile = file.split('\r').filter(predicate).sort(bigramCount);

    let results = [];

    sortedFile.map(function(item){
      let words = item.split('\t');
      let occurances = parseInt(words[0]);
      let aKey = words[1].toLowerCase();
      let bKey = words[2].toLowerCase();
      let cKey = [aKey, bKey].join(' ')
      let aPhones = CMU[aKey];
      let bPhones = CMU[bKey];
      let cPhones = [aPhones, bPhones].join(" - ");
      let aCount = aPhones.split(' - ').length;
      let bCount = bPhones.split(' - ').length;
      let cCount = cPhones.split(' - ').length;

      var pair = {

        aKey: aKey,
        bKey: bKey,
        cKey: cKey,

        aPhones: aPhones,
        bPhones: bPhones,
        cPhones: cPhones,

        aCount: aCount,
        bCount: bCount,
        cCount: cCount,

        occurances: occurances,
        
      }

      results.push(pair);
    })


    fs.writeFile(name, JSON.stringify(results), 'utf8', function(){
      console.log("write complete!");
    })
  });
})("./../bigrams.txt", "bigramCount.json");