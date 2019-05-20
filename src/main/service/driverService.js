var repository = require("../repository/driverRepository");


exports.findAllDrivers = function findAllDrivers() {
    // all implementation
    return "";
}

exports.findByPK = function findByPK(id) {
    console.info("DriverService: findByPK");
    return repository.find(id);
}

exports.findAll = function findAll() {
    console.info("DriverService: findAll");
    return repository.findAll();
}

exports.create = function create(user) {
    console.info("DriverService: create");
    return repository.create(user);
}