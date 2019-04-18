require('console-info');
require('console-error');
require('custom-env').env('pmm');

var travelModel = require("../../model/travel"),
    partyService = require("../mock/partyServiceMock"),
    global = require('../../util/util'),
    haversine = require('haversine');

var travels = new Map();
var travelID = 0;
    
exports.findDriver = function findDriver(driverSearchDTO) {
    console.info("travelServiceMock: findDriver");
    var driver = partyService.findAllDrivers().pop(); 
    return driver;
}

exports.findTravel = function findTravel(driverSearchDTO) {
    console.info("travelServiceMock: findTravel");
    // var driver = partyService.findAllDrivers().pop();
    travelID = global.incrementID(travelID);
    var travel = new travelModel.Travel(travelID, driverSearchDTO.from, driverSearchDTO.to)
    travel.price = haversine(driverSearchDTO.from, driverSearchDTO.to) * process.env.PRIZE_PER_KM;
    // travel.driverID = driver.id;
    travels.set(travelID, travel);
    return travel;
}