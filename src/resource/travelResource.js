var travel = require("../model/travel"),
    express = require("express"),
    app = express(),
    parser = require("body-parser"),
    travelService = require("../service/mock/travelServiceMock");
var allSockets = require("../main");

app.use(parser.json());

app.post("/travels", function (req, res) {
    console.log("TravelResource :" + req.url+ ". Body : " + JSON.stringify(req.body));
    
    var from = new travel.GeographicCoordenate(req.body.initialPosition);
    var to = new travel.GeographicCoordenate(req.body.finalPosition);

    if (allSockets.socketDriver == undefined) {
        console.log("no hay nada");
        res.status(500).send("NO HAY CHOFERES");
    } else {
        console.log("hay algo");
        // logica de mandar el emit al chofer
        allSockets.socketDriver.emit("NOTIFICATION_OF_TRAVEL", "tenes un viaje....");
        res.status(200).send(travelService.findDriver(from, to));
    }
})

module.exports = app;
