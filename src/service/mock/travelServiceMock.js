var travel = require("../../model/travel"),
    party = require("../../model/party.js"),
    partyDTOModel = require("../../model/dto/partyDTO"),
    partyService = require("../mock/partyServiceMock");

exports.findDriver = function findDriver(driverSearchDTO) {
    console.log("travelServiceMock: findDriver");
    var driver = partyService.findAllDrivers().pop(); 
    return driver;
}