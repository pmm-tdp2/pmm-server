require('console-info');
require('console-error');
var party = require("../../model/dto/partyDTO");

var drivers = null;
var users = null;

exports.findAllDrivers = function findAllDrivers(){
    console.info("partyServiceMock: findAllDrivers");
    if (drivers == null) {
        var driver1 = new party.DriverDTO();
        driver1.id = 1;
        driver1.name = "Michael";
        driver1.lastName = "Schumacher";
        driver1.license = "999999991";
        var driver2 = new party.DriverDTO();
        driver2.id = 2;
        driver2.name = "Juan Manuel";
        driver2.lastName = "Fangio";
        driver2.license = "999999992";
        var driver3 = new party.DriverDTO();
        driver3.id = 3;
        driver3.name = "Lewis";
        driver3.lastName = "Hamilton";
        driver3.license = "999999993";
        var drivers = [];
        drivers.push(driver1);
        drivers.push(driver2);
        drivers.push(driver3);
    }
    return drivers;
};

exports.findAllUsers = function findAllUsers(){
    console.info("partyServiceMock: findAllUsers");
    if (users == null) {
        var user1 = new party.UserDTO();
        user1.id = 1;
        user1.name = "Pepe";
        user1.lastName = "Ape";
        var user2 = new party.UserDTO();
        user2.id = 2;
        user2.name = "Mengano";
        user2.lastName = "Ape";
        var user3 = new party.UserDTO();
        user3.id = 3;
        user3.name = "Fulano";
        user3.lastName = "Ape";
        var users = [];
        users.push(user1);
        users.push(user2);
        users.push(user3);
    }
    return users;
};