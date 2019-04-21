require('console-info');
require('console-error');
require('custom-env').env('pmm');

var travelModel = require("../../model/travel"),
    partyService = require("../mock/partyServiceMock"),
    global = require('../../util/util'),
    haversine = require('haversine');

var travels = new Map();
var travelID = 0;

module.exports = {
    findTravelById : function findTravelById(id) {
        console.info("travelServiceMock: findTravelById");
        var aTravel = null;
        if (travels.has(id)) {
            aTravel = travels.get(id);
        }
        return aTravel;
    },
    
    findDriver : function findDriver(driverID) {
        console.info("travelServiceMock: findDriver");
        var driver = partyService.findAllDrivers().find(function(driver) {
            return driver.id = driverID;
        }); 
        return driver;
    },
    
    findUser : function findUser(userID) {
        console.info("travelServiceMock: findUser");
        var user = partyService.findAllUsers().find(function(user) {
            return user.id == userID;
        }); 
        return user;
    },
    
    createATravel : function createATravel(driverSearchDTO) {
        console.info("travelServiceMock: createATravel");
        travelID = global.incrementID(travelID);
        var aTravel = new travelModel.Travel(travelID, driverSearchDTO.from, driverSearchDTO.to)
        aTravel.userID = driverSearchDTO.userID;
        aTravel.distance = haversine(driverSearchDTO.from, driverSearchDTO.to);
        aTravel.time = aTravel.distance / process.env.TIME_PER_KM;
        aTravel.price = aTravel.distance * process.env.PRICE_PER_KM;
        if (!travels.has(travelID)) {
            travels.set(travelID, aTravel);
        }
        return aTravel;
    },
    
    findTravelByTravelID : function findTravelByTravelID(travelID) {
        console.info("travelServiceMock: findTravelByTravelID");
        var aTravel = null;
        if (travels.has(travelID)) {
            aTravel = travels.get(travelID);
        }
        return aTravel;
    },
    
    confirmTravel : function confirmTravel(travelID) {
        // logica de mandar el emit al chofer
        var aTravel = this.findTravelByTravelID(travelID)
        var driverConfirmatedStatus = travelModel.getAllStates().get(3);
        aTravel.states.push(driverConfirmatedStatus);
        return aTravel;
    }
}
