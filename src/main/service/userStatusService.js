require("console-info");
require("console-error");
var repository = require("../repository/userStatusRepository");

exports.findAllUserStatus = function findAllUserStatus() {
    console.info("userStatusService : findAllUserStatus");
    return repository.searchAllUserStatus();
}

exports.findAll = function findAll() {
    console.info("userStatusService : findAll");
    return repository.findAll();
}

exports.create = function create(userStatus) {
    console.info("userStatusService : create");
    return repository.create(userStatus);
}