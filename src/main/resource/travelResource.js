require('console-info');
require('console-error');
var partyDTOModel = require("../model/dto/partyDTO"),
    express = require("express"),
    app = express(),
    parser = require("body-parser"),
    travelService = require("../service/mock/travelServiceMock"),
    allSockets = require("../main"),
    travelDTOModel = require('../model/dto/travelDTO');

app.use(parser.json());
app.put("/travel/", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));

});

app.post("/travel/cotization", function (req, res) {
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
        var aTravel = travelService.findTravel(driverSearchDTO);
        var aTravelDTO = new travelDTOModel.TravelDTO();
        aTravelDTO.travelID = aTravel.travelID;
        aTravelDTO.price = aTravel.price;
        aConnectionDriver.socket.emit("NOTIFICATION_OF_TRAVEL", "tenes un viaje....");
        res.status(200).send(aTravelDTO);
    }
});

app.post("/travel/confirmation", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));
    /* 
* INPUT: travelID
		* NOTIFICACION al chofer: {travelId, from, to, petAmountSmall, petAmountMedium, petAmountLarge, isCompanion}
	*OUTPUT: {200, "message: esperar notificacion confirmar"}
*/

    var travelID = req.body.travelID;
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
        var aTravel = travelService.findTravelByTravelID(travelID);

        var aTravelDTO = new travelDTOModel.TravelDTO();
        aTravelDTO.travelID = aTravel.travelID;
        aTravelDTO.price = aTravel.price;
        aConnectionDriver.socket.emit("NOTIFICATION_OF_TRAVEL", "tenes un viaje....");
        res.status(200).send(aTravelDTO);
    }
})

module.exports = app;
