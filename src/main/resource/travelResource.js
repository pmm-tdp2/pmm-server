require('console-info');
require('console-error');
var partyDTOModel = require("../model/dto/partyDTO"),
    express = require("express"),
    app = express(),
    parser = require("body-parser"),
    travelService = require("../service/mock/travelServiceMock"),
    allSockets = require("../main"),
    travelDTOModel = require('../model/dto/travelDTO');

    //contain <key,value> <idTravel,Boolean>
    responseOfDriverToTravels = new Map();
    exports.responseOfDriverToTravels = responseOfDriverToTravels;

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
        console.info(JSON.stringify(aTravelCotizationDTO));
        res.status(200).send(aTravelCotizationDTO);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


app.post("/travel/cancel", function (req, res) {

    //TODO: edit DB travel
    
    //TODO: add score the driver with 0

    //find the user associated to travel
    var connectionUsers = allSockets.connectionUsers;
    var aConnectionUser;
    try {
        if (connectionUsers != undefined) {
            aConnectionUser = connectionUsers.values().next().value; 
        }
    } catch (err) {
        console.error(err);
    }

    //notify to user
    if (aConnectionUser == null || aConnectionUser == undefined) {
        console.error("There are no Users");
        res.status(203).send({status:203, message:"There are not Users"});
    } else {
        try {
            aConnectionUser.socket.emit("CANCEL_OF_TRAVEL", "soy un harcodeo");
            console.log("SE MANDA LA CANCELACIÓN AL CHOFER");
            res.status(200).send({status:200, message:"cancelation received successfully"});
            console.log("LUEGO DE MANDAR LA CANCELACION");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
});


managerTravelRequest = require("../service/travelRequestManagerService")

app.post("/travel/confirmation", function (req, res) {
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));
    var aTravelConfirmationRequestDTO = new travelDTOModel.TravelConfirmationRequestDTO(req.body);
    console.log("####message confirmation###: "+JSON.stringify(aTravelConfirmationRequestDTO));
    var connectionUsers = allSockets.connectionUsers;
    var connectionDrivers = allSockets.connectionDrivers;
    var aConnectionDriver = null;
    if (aTravelConfirmationRequestDTO.rol == "USER") {

        console.log("----solicitud de viaje----");

        //res.status(200).send({status:200, message: "su chofer está en camino"});

        // launch thread
        /***
         * Este comentario es sólo para mockear
         */
        managerTravelRequest.manageTravelRequest(aTravelConfirmationRequestDTO.travelID)
        .then((value)=>{
            console.log("respuesta de manager: "+value);
            res.status(200).send({status:200, message: "su chofer está en camino"});
        })
        .catch((value)=>{
            console.log("respuesta de manager: "+value);
            res.status(400).send({status:400, message: "No hay choferes en este momento"});
        })
        
    }
    var aConnectionUser = null;
    if (aTravelConfirmationRequestDTO.rol == "DRIVER") {
        //if travel is rejected
        if(!aTravelConfirmationRequestDTO.accept){
            console.log("&&&&&&&&&&&&&& travel is rejected &&&&&&&&&&&&&&&&&&");
            responseOfDriverToTravels.set(aTravelConfirmationRequestDTO.travelID,false);
            res.status(200).send({status:200, message:"viaje rechazado correctamente"});
        }else{
            //travel is accepted
            responseOfDriverToTravels.set(aTravelConfirmationRequestDTO.travelID,true);
            console.log("&&&&&&&&&&&&&&&&&& travel is accepted &&&&&&&&&&&&&&&&&&");
            
            /**
             * HARCODEOOOOOO
             * para probar desde postman
             */
            //res.status(200).send({status:200, message:"viaje aceptado correctamente"});


            //notify to user
            try {
                if (connectionUsers != undefined) {
                    aConnectionUser = connectionUsers.values().next().value; 
                }
            } catch (err) {
                console.error(err);
                res.status(400).send({status:400, message:"error inesperado"});
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

                    console.log("lo que se va mandar al usuario: "+JSON.stringify(aTravelConfirmationResponseDTO));

                    aConnectionUser.socket.emit("NOTIFICATION_OF_TRAVEL", aTravelConfirmationResponseDTO);
    
                    console.log("Se mandó al usuario ");

                    aTravelConfirmationResponseDTO.driver = null;
                    aTravelConfirmationResponseDTO.user = travelService.findUser(aTravel.userID)
                    aTravelConfirmationResponseDTO
                    res.status(200).send(aTravelConfirmationResponseDTO);
                } catch (error) {
                    res.status(500).send(error);
                }
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

app.post("/travel/cancel", function(req, res){
    console.info("TravelResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));
    var aTravelFinalizeRequesDTO = new travelDTOModel.TravelFinalizeRequesDTO(req.body);
    var connectionUsers = allSockets.connectionUsers;
    var connectionDrives = allSockets.connectionDrivers;
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
            console.info("Cancel Travel");
            var aTravel = travelService.finalizeTravel(aTravelFinalizeRequestDTO.travelID);
            aConnectionUser.socket.emit("NOTIFICATION_CANCELED_OF_TRAVEL", {message:"Canceled"});
            //TODO: puntuar al chofer con 0;
            res.status(200).send({status:200, message:"Canceled ok"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = app;
