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
        var aTravel = travelService.createATravel(driverSearchDTO);
        var aTravelCotizationDTO = new travelDTOModel.TravelCotizationDTO();
        aTravelCotizationDTO.travelID = aTravel.travelID;
        aTravelCotizationDTO.price = aTravel.price;
        res.status(200).send(aTravelCotizationDTO);
    }
});

app.post("/travel/confirmation", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));
    var request = new travelDTOModel.TravelConfirmationRequestDTO(req.body);
    var connectionUsers = allSockets.connectionUsers;
    var connectionDrives = allSockets.connectionDrivers;
    var aConnectionDriver = null;
    if (request.rol == "USER") {
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
            
            var aTravelNotificationDTO = new travelDTOModel.TravelNotificationDTO();
            aTravelNotificationDTO.travelID = aTravel.travelID;
            aTravelNotificationDTO.from = aTravel.from;
            aTravelNotificationDTO.to = aTravel.to;
            aTravelNotificationDTO.petAmountSmall = aTravel.petAmountSmall;
            aTravelNotificationDTO.petAmountMedium = aTravel.petAmountMedium;
            aTravelNotificationDTO.petAmountLarge = aTravel.petAmountLarge;
            aTravelNotificationDTO.hasACompanion = aTravel.hasACompanion;
            aConnectionDriver.socket.emit("NOTIFICATION_OF_TRAVEL", aTravelNotificationDTO);
            
/*
* ESPERAR A QUE CONFIRME EL CLIENTE
*/


            var aTravelConfirmationResponseDTO = new travelDTOModel.TravelConfirmationResponseDTO();
            aTravelConfirmationResponseDTO.travelID = aTravel.travelID;
            aTravelConfirmationResponseDTO.driver = travelService.findDriver(aTravel.travelID);
            aTravelConfirmationResponseDTO.user = travelService.finUser(aTravel.travelID)
            aTravelConfirmationResponseDTO.time = 5;
    
            res.status(200).send(aTravelConfirmationResponseDTO);
        }        
    } 
    if (request.rol == "DRIVER") {
    
    }
})

module.exports = app;
