var travel = require("../../model/travel"),
    party = require("../../model/party.js"),
    partyService = require("../mock/partyServiceMock");

exports.findDriver = function findDriver(initialGeographicCoordenate, finalGeographicCoordenate) {
    console.log("travelServiceMock: findDriver");
    var driver = partyService.findAllDrivers().pop(); 
    return driver;
}