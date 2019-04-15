require('console-info');
require('console-error');
var travel = require("../model/travel"),
    partyDTOModel = require("../model/dto/partyDTO"),
    express = require("express"),
    app = express(),
    parser = require("body-parser"),
    travelService = require("../service/mock/travelServiceMock");
var allSockets = require("../main");

app.use(parser.json());

app.post("/travels", function (req, res) {
    console.info("TravelResource :" + req.url+ ". Body : " + JSON.stringify(req.body));
    var driverSearchDTO = new partyDTOModel.DriverSearchDTO(req.body);

    if (allSockets.socketDriver == undefined) {
        console.error("no hay nada");
        res.status(203).send({status:203, message:"no data"});
    } else {
        console.info("hay algo");
        // logica de mandar el emit al chofer
        allSockets.socketDriver.emit("NOTIFICATION_OF_TRAVEL", "tenes un viaje....");
        res.status(200).send(travelService.findDriver(driverSearchDTO));
    }
})

module.exports = app;
