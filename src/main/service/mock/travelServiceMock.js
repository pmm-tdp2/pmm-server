require('console-info');
require('console-error');
require('custom-env').env('pmm');

var travelModel = require("../../model/travel"),
    partyService = require("../mock/partyServiceMock"),
    global = require('../../util/util'),
    haversine = require('haversine');

var travels = new Map();
var travelID = 0;
    
exports.findDriver = function findDriver(travelID) {
    console.info("travelServiceMock: findDriver");
    var driver = partyService.findAllDrivers().pop(); 
    return driver;
}

exports.findDriver = function findDriver(travelID) {
    console.info("travelServiceMock: findDriver");
    var user = partyService.findAllUsers().pop(); 
    return user;
}

exports.createATravel = function createATravel(driverSearchDTO) {
    console.info("travelServiceMock: createATravel");
    // var driver = partyService.findAllDrivers().pop();
    travelID = global.incrementID(travelID);
    var aTravel = new travelModel.Travel(travelID, driverSearchDTO.from, driverSearchDTO.to)
    aTravel.price = haversine(driverSearchDTO.from, driverSearchDTO.to) * process.env.PRIZE_PER_KM;
    // aTravel.driverID = driver.id;
    travels.set(travelID, aTravel);
    return aTravel;
}

exports.findTravelByTravelID = function findTravelByTravelID(travelID) {
    console.info("travelServiceMock: findTravelByTravelID");
    var aTravel = null;
    if (travels.has(travelID)) {
        aTravel = travels.get(travelID);
    }
    return aTravel;
}