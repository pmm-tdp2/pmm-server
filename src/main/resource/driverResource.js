require('console-info');
require('console-error');

var express = require("express"),
    app = express(),
    DriverDTO = require("../model/dto/partyDTO").DriverDTO,
    driverService = require("../service/driverService");


/*
 * driver endopints
 */
app.get("/drivers", function(req, res) {
    console.info("driverStatusResource :" + req.url);
    try {
        driverService.findAll()
            .then(data => res.status(200).send(data))
            .catch(function(err) { res.status(500).send(err) });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/driver", function(req, res) {
    console.info("driverStatusResource :" + req.url + ". Body : " + JSON.stringify(req.body));
    var driver = new DriverDTO();
    driver.partyID = req.body.partyID;
    try {
        driverService.create(driver)
            .then(us => res.status(200).send(us))
            .catch(err => res.status(500).send(err));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


module.exports = app;