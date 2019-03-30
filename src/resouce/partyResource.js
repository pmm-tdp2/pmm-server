var party = require('../../src/model/party.js');

var express = require("express");
var app = express();

app.get("/drivers", function(req, res) {
    var driver1 = new party.Driver("Michael", "Schumacher", "999999991");
    var driver2 = new party.Driver("Juan Manuel", "Fangio", "999999992");
    var driver3 = new party.Driver("lewis", "Hamilton", "999999993");
    console.log(driver1);
    console.log(driver2);
    console.log(driver3);
    var drivers = [];
    drivers.push(driver1);
    drivers.push(driver2);
    drivers.push(driver3)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(drivers);
})

module.exports = app;