var travel = require("../model/travel"),
    express = require("express"),
    app = express(),
    parser = require("body-parser"),
    travelService = require("../service/travelServiceMock");
var allSockets = require("../main");

app.use(parser.json());

app.post("/travels", function(req, res) {
    var argmap = new Map();
    argmap.set('json', req.body);
    var geographicCoordenate = new travel.GeographicCoordenate(argmap);

    if (allSockets.socketDriver == undefined){
    	console.log("no hay nada");
		res.status(404).send("NO HAY CHOFERES");
    }else{
    	console.log("hay algo");
    	/*logica de mandar el emit al chofer*/
    	allSockets.socketDriver.emit("NOTIFICATION_OF_TRAVEL", "tenes un viaje....");
    	res.status(200).json(travelService.findDriver(geographicCoordenate));
    }

})

module.exports = app;
