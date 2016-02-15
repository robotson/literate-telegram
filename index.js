"use strict";
let express = require('express');
let app = express();
let fs = require('fs');
var randomPoem = require('./tools/poemBuilder1.js')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/", function(req, res) {
  res.render('index', {data: randomPoem()});
})
app.listen(1337);