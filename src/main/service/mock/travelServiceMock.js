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
    travelID = global.incrementID(travelID);
    var aTravel = new travelModel.Travel(travelID, driverSearchDTO.from, driverSearchDTO.to)
    aTravel.distance = haversine(driverSearchDTO.from, driverSearchDTO.to);
    aTravel.time = aTravel / process.env.TIME_PER_KM;
    aTravel.price = aTravel.distance * process.env.PRICE_PER_KM;
    if (!travels.has(travelID)) {
        travels.set(travelID, aTravel);
    }
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

exports.confirmTravel = function confirmTravel(travelID) {
    // logica de mandar el emit al chofer
    var aTravel = findTravelByTravelID(travelID);
    var driverConfirmatedStatus = travelModel.getAllStatus().get(3);
    aTravel.status.set(3, driverConfirmatedStatus);
    return aTravel;
}