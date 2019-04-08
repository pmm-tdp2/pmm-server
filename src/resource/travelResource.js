var travel = require("../model/travel"),
    express = require("express"),
    app = express(),
    parser = require("body-parser"),
    travelService = require("../service/travelServiceMock");
var allSockets = require("../main");

app.use(parser.json());

app.post("/travels", function (req, res) {
    console.log("TravelResource :" + req.url+ ". Body : " + JSON.stringify(req.body));
    var initialPositionMap = new Map();
    initialPositionMap.set('json', req.body.initialPosition);
    var initialgeographicCoordenate = new travel.GeographicCoordenate(initialPositionMap);

    var finalPositionMap = new Map();
    finalPositionMap.set('json', req.body.finalPosition);
    var finalgeographicCoordenate = new travel.GeographicCoordenate(finalPositionMap);


    if (allSockets.socketDriver == undefined) {
        console.log("no hay nada");
        res.status(500).send("NO HAY CHOFERES");
    } else {
        console.log("hay algo");
        /*logica de mandar el emit al chofer*/
        allSockets.socketDriver.emit("NOTIFICATION_OF_TRAVEL", "tenes un viaje....");
        res.status(200).json(travelService.findDriver(initialGeographicCoordenate, finalgeographicCoordenate));
    }

})

module.exports = app;
