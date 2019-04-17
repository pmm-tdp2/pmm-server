require('console-info');
require('console-error');
var party = require("../../model/party");

exports.findAllDrivers = function findAllDrivers(){
    console.info("partyServiceMock: findAllDrivers");
    var driver1 = new party.Driver("Michael", "Schumacher", "999999991");
    var driver2 = new party.Driver("Juan Manuel", "Fangio", "999999992");
    var driver3 = new party.Driver("Lewis", "Hamilton", "999999993");
    var drivers = [];
    drivers.push(driver1);
    drivers.push(driver2);
    drivers.push(driver3);
    return drivers;
};