require('console-info');
require('console-error');


var express = require("express"),
    app = express(),
    PartyDTO = require("../model/dto/partyDTO").PartyDTO,
    partyService = require("../service/partyService");
/*
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
*/

/*
 * party endopints
 */
app.get("/parties", function(req, res) {
    console.info("userStatusResource :" + req.url);
    try {
        partyService.findAll()
            .then(data => res.status(200).send(data))
            .catch(function(err) { res.status(500).send(err) });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/party", function(req, res) {
    console.info("userStatusResource :" + req.url + ". Body : " + JSON.stringify(req.body));
    var party = new PartyDTO();
    party.partyID = req.body.partyID;
    try {
        partyService.create(party)
            .then(p => res.status(200).send(p))
            .catch(err => res.status(500).send(err));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


module.exports = app;