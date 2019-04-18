require('console-info');
require('console-error');
var travelModel = require("../model/travel"),
    partyDTOModel = require("../model/dto/partyDTO"),
    express = require("express"),
    app = express(),
    parser = require("body-parser"),
    travelService = require("../service/mock/travelServiceMock");
var allSockets = require("../main");

app.use(parser.json());
app.put("/travels/", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));

});

app.post("/travels", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));
    var driverSearchDTO = new partyDTOModel.DriverSearchDTO(req.body);
    var connectionUsers = allSockets.connectionUsers;
    var connectionDrives = allSockets.connectionDrivers;
    var aConnectionDriver = null;
    try {
        if (connectionDrives != undefined) {
            aConnectionDriver = connectionDrives.values().next().value; 
        }
    } catch (err) {
        console.error(err);
    }
    if (aConnectionDriver == null || aConnectionDriver == undefined) {
        console.error("no hay nada");
        res.status(204).send({status:204, message:"no data"});
    } else {
        console.info("hay algo");
        // logica de mandar el emit al chofer
        var aDriver = travelService.findDriver(driverSearchDTO);
        var aTravel = new travelModel.Travel(driverSearchDTO.from, driverSearchDTO.to);

        aConnectionDriver.socket.emit("NOTIFICATION_OF_TRAVEL", "tenes un viaje....");
        res.status(200).send(aDriver);
    }
})

module.exports = app;
