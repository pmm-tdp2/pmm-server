require('console-info');
require('console-error');
var travel = require("../../model/travel"),
    party = require("../../model/party.js"),
    partyDTOModel = require("../../model/dto/partyDTO"),
    partyService = require("../mock/partyServiceMock");
var travels = new Map();

exports.findDriver = function findDriver(driverSearchDTO) {
    console.info("travelServiceMock: findDriver");
    var driver = partyService.findAllDrivers().pop(); 
    return driver;
}