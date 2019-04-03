var travel = require("../model/travel.js"),
    party = require("../model/party.js"),
    partyService = require("../service/partyServiceMock");

exports.findDriver = function findDriver(geographicCoordenate) {
    console.log("travelServiceMock: findDriver");
    var driver = partyService.findAllDrivers().pop(); 
    return driver;
}