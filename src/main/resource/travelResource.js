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
app.get("/travel/:id", function(req, res) {
    console.info("TravelResource :" + req.url+ ". Param : " + req.params.id);
    try {
        var aTravel = travelService.findTravelById(parseInt(req.params.id));
        if (aTravel == null) {
            res.status(204).send(aTravel);
        } else {
            res.status(200).send(aTravel);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


app.put("/travel/", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));

});

app.post("/travel/cotization", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));
    var driverSearchDTO = new partyDTOModel.DriverSearchDTO(req.body);
    try {
        var aTravel = travelService.createATravel(driverSearchDTO);
        var aTravelCotizationDTO = new travelDTOModel.TravelCotizationDTO();
        aTravelCotizationDTO.travelID = aTravel.travelID;
        aTravelCotizationDTO.price = Math.round(aTravel.price *100) / 100;
        res.status(200).send(aTravelCotizationDTO);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/travel/confirmation", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));
    var aTravelConfirmationRequestDTO = new travelDTOModel.TravelConfirmationRequestDTO(req.body);
    var connectionUsers = allSockets.connectionUsers;
    var connectionDrivers = allSockets.connectionDrivers;
    var aConnectionDriver = null;
    if (aTravelConfirmationRequestDTO.rol == "USER") {
        try {
            if (connectionDrivers != undefined) {
                //aConnectionDriver = connectionDrivers.values().next().value;
                var aTravel = travelService.findTravelByTravelID(aTravelConfirmationRequestDTO.travelID);
                aConnectionDriver = travelService.findBetterDriver(aTravel);
            }
        } catch (err) {
            console.error(err);
        }
        if (aConnectionDriver == null || aConnectionDriver == undefined) {
            console.error("There are not Drivers");
            res.status(204).send({status:204, message:"There are not Drivers"});
        } else {
            console.info("Available Driver");
            // logica de mandar el emit al chofer
            var aTravel = travelService.findTravelByTravelID(aTravelConfirmationRequestDTO.travelID);
            
            var aTravelNotificationDTO = new travelDTOModel.TravelNotificationDTO();
            aTravelNotificationDTO.travelID = aTravel.travelID;
            aTravelNotificationDTO.from = aTravel.from;
            aTravelNotificationDTO.to = aTravel.to;
            aTravelNotificationDTO.petAmountSmall = aTravel.petAmountSmall;
            aTravelNotificationDTO.petAmountMedium = aTravel.petAmountMedium;
            aTravelNotificationDTO.petAmountLarge = aTravel.petAmountLarge;
            aTravelNotificationDTO.hasACompanion = aTravel.hasACompanion;

            aConnectionDriver.socket.emit("NOTIFICATION_OF_TRAVEL", aTravelNotificationDTO);

            var aTravelConfirmationResponseDTO = new travelDTOModel.TravelConfirmationResponseDTO();
            aTravelConfirmationResponseDTO.travelID = aTravel.travelID;
            aTravelConfirmationResponseDTO.driver = travelService.findDriver(aConnectionDriver.id);
            aTravelConfirmationResponseDTO.time = Math.round(aTravel.time);
    
            res.status(200).send(aTravelConfirmationResponseDTO);
        }        
    }
    var aConnectionUser = null;
    if (aTravelConfirmationRequestDTO.rol == "DRIVER") {

        //evaluate if user is connected

        //find drivers

        //notify to driver
        /**
         * TODO: se dede establecer un tiempo maximo para la respuesta
         * 
         */








        
        try {
            if (connectionUsers != undefined) {
                aConnectionUser = connectionUsers.values().next().value; 
            }
        } catch (err) {
            console.error(err);
        }
        if (aConnectionUser == null || aConnectionUser == undefined) {
            console.error("There are no Users");
            res.status(204).send({status:204, message:"There are not Users"});
        } else {
            console.info("Available User");
            // logica de mandar el emit al chofer
            var aTravel = travelService.findTravelByTravelID(aTravelConfirmationRequestDTO.travelID);
            try {
                var aTravel = travelService.confirmTravel(aTravelConfirmationRequestDTO.travelID);
                aTravel.driverID = aTravelConfirmationRequestDTO.id;
                var aTravelConfirmationResponseDTO = new travelDTOModel.TravelConfirmationResponseDTO();
                aTravelConfirmationResponseDTO.travelID = aTravel.travelID;
                aTravelConfirmationResponseDTO.time = Math.round(aTravel.time);
                aTravelConfirmationResponseDTO.driver = travelService.findDriver(aTravel.driverID)
                aConnectionUser.socket.emit("NOTIFICATION_OF_TRAVEL", aTravelConfirmationResponseDTO);

                aTravelConfirmationResponseDTO.driver = null;
                aTravelConfirmationResponseDTO.user = travelService.findUser(aTravel.userID)
                res.status(200).send(aTravelConfirmationResponseDTO);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }
});

app.post("/travel/finalize", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));
    var aTravelFinalizeRequestDTO = new travelDTOModel.TravelFinalizeRequesDTO(req.body);
    var connectionUsers = allSockets.connectionUsers;
    var connectionDrivers = allSockets.connectionDrivers;
    var aConnectionUser = null;
    try {
        try {
            if (connectionUsers != undefined) {
                aConnectionUser = connectionUsers.values().next().value; 
            }
        } catch (err) {
            console.error(err);
        }
        if (aConnectionUser == null || aConnectionUser == undefined) {
            console.error("There are no Users");
            res.status(204).send({status:204, message:"There are not Users"});
        } else {
            console.info("Available User");
            var aTravel = travelService.finalizeTravel(aTravelFinalizeRequestDTO.travelID);
            aConnectionUser.socket.emit("NOTIFICATION_FINALIZED_OF_TRAVEL", {message:"Finalized ok"});
            res.status(200).send({status:200, message:"Finalized ok"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = app;
