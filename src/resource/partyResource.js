var express = require("express"),
    app = express(),
    party = require("../model/party"),
    partyService = require("../service/partyServiceMock");

app.get("/drivers", function(req, res) {
    var drivers = partyService.findAllDrivers();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(drivers);
})

module.exports = app;