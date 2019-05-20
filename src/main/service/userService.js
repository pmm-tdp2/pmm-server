var repository = require("../repository/userRepository");


exports.findAllDrivers = function findAllDrivers() {
    // all implementation
    return "";
}

exports.findByPK = function findByPK(id) {
    console.info("UserService: findByPK");
    return repository.find(id);
}

exports.findAll = function findAll() {
    console.info("UserService: findAll");
    return repository.findAll();
}

exports.create = function create(user) {
    console.info("UserService: create");
    return repository.create(user);
}