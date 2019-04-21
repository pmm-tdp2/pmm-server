require('console-info');
require('console-error');


var express = require("express"),
    app = express(),
    party = require("../model/party"),
    partyService = require("../service/mock/partyServiceMock");

app.get("/drivers", async function(req, res) {
    console.info("PartyResource " + req.url)
    try {
      var drivers = partyService.findAllDrivers();
      res.status(200).send(drivers);
    } catch (error) {
      res.status(500).send(error);
    }
})

app.get("/users", async function(req, res) {
    console.info("PartyResource " + req.url)
    try {
      var drivers = partyService.findAllUsers();
      res.status(200).send(drivers);
    } catch (error) {
      res.status(500).send(error);
    }
})

module.exports = app;