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
        console.info("travelServiceMock: findDriver " + driverID);
        var driver = partyService.findAllDrivers().find(function(driver) {
            return driver.id == driverID;
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
        var cotizatedStatus = travelModel.getAllStates().get(1);
        aTravel.states.push(cotizatedStatus);
        if (!travels.has(travelID)) {
            travels.set(travelID, aTravel);
        }
        return aTravel;
    },
    
    findTravelByTravelID : function findTravelByTravelID(travelID) {
        console.info("travelServiceMock :" + "findTravelByTravelID. travelID : " + travelID);
        var aTravel = null;
        if (travels.has(travelID)) {
            aTravel = travels.get(travelID);
        }
        return aTravel;
    },
    
    confirmTravel : function confirmTravel(travelID) {
        // logica de mandar el emit al chofer
        console.info("travelServiceMock :" + "confirmTravel. travelID : " + travelID);
        var aTravel = this.findTravelByTravelID(travelID)
        var driverConfirmatedStatus = travelModel.getAllStates().get(3);
        aTravel.states.push(driverConfirmatedStatus);
        return aTravel;
    },

    finalizeTravel : function finalizeTravel(travelID) {
        console.info("travelServiceMock :" + "finalizeTravel. travelID : " + travelID);
        var aTravel = this.findTravelByTravelID(travelID)
        if (aTravel != null) {
            var finalizeStatus = travelModel.getAllStates().get(4);
            aTravel.states.push(finalizeStatus);
        }
        return aTravel;
    },

    /**
     * @param {travelID to obtain point origin of travel} travelID 
     * @param {radius in meters} searchRadius 
     * @param {drivers excluded for this travel} excludedDrivers 
     */
    /*findDriversToTravel : function findDriversToTravel(travelID, searchRadius, excludedDrivers) {
        console.info("travelServiceMock: "+ "findDriversToTravel. travelID: "+ travelID);
        var candidateDrivers = new Array();

        // find optimum driver for user
        // is a map that contain (key,value) -> (travelID, GeographicCoordinate)
        var positionsDrivers = allSockets.positionsDrivers;

        var aTravel = travelService.findTravelById(aTravelConfirmationRequestDTO.travelID);
        var candidateDrivers = new Array();

        positionsDrivers.forEach( (value, key, positionsDrivers) => {
            distance = haversine(value, aTravel.from,{unit: 'meter'});
            if(distance < searchRadius){
                var aDriver = findDriver(key);
                candidateDrivers.push(aDriver);
            }
        });

        if (candidateDrivers.length == 0)
            return null;

        //ordering drivers in descending order
        //atribiute priority is score + pointsCategory
        candidateDrivers.sort( function (a,b){
            return b.priority - a.priority;
        });

        //take out excluded drivers
        if(excludedDrivers != null ){
            excludedDrivers.forEach(driverID => {

                //find index of element
                index = candidateDrivers.findIndex(driver => {
                    return driver.id == driverID;
                })
                //remove element
                candidateDrivers.splice(0,index);
            });
        }    

        //returns less than 4 drivers
        return candidateDrivers.length < 3 ? candidateDrivers :
        candidateDrivers.slice(0,2)
    }*/

}
