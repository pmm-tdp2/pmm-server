var travel = require('../model/travel');
var express = require('express');
var app = express();

app.post("/travels", function(req, res) {
    console.log('finding a driver for you');
    res.status(200).json('finding a driver for you');
})

module.exports = app;