require('console-info');
require('console-error');
var express = require("express"),
    app = express(),
    traceModel = require("../model/trace"),
    traceService = require("../service/mock/traceServiceMock");
    allSockets = require("../main"),

app.post("/trace", function(req, res) {
    console.info("traceResource :" + req.url+ ". Body : " + JSON.stringify(req.body));
    var trace = new traceModel.Trace(req.body);
    var message = traceService.saveTrace(trace)

    //mock send data to user
	//Hernan, you have fix this
    //var travelID = req.body.travelID;
    var connectionUsers = allSockets.connectionUsers;
    var aConnectionUser = null;
    try {
        if (connectionUsers != undefined) {
            aConnectionUser = connectionUsers.values().next().value; 
        }
    } catch (err) {
        console.error(err);
    }
    if (aConnectionUser == null || aConnectionUser == undefined) {
        console.error("no hay usuario a quien mandar la posición");
        //res.status(204).send({status:204, message:"no data"});
    } else {
        console.info("hay suuario a quien mandar la posición");
        // mandar posición
        aConnectionUser.socket.emit("POSITION_DRIVER",
        	{"latitude":trace.geograficCoordenate.latitude,
        	 "longitude":trace.geograficCoordenate.longitude});
    }

    res.status(200).send(message);
})
module.exports = app;