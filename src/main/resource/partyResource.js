require('console-info');
require('console-error');
var express = require("express"),
    app = express(),
    party = require("../model/party"),
    partyService = require("../service/mock/partyServiceMock");

app.get("/drivers", function(req, res) {
    console.info("PartyResource " + req.url)
    var drivers = partyService.findAllDrivers();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(drivers);
})

module.exports = app;