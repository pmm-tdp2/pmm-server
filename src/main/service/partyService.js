var repository = require("../repository/partyRepository");


exports.findAllDrivers = function findAllDrivers() {
    // all implementation
    return "";
}

exports.findByPK = function findByPK(id) {
    console.info("PartyService: findByPK");
    return repository.find(id);
}

exports.findAll = function findAll() {
    console.info("PartyService: findAll");
    return repository.findAll();
}

exports.create = function create(party) {
    console.info("PartyService: create");
    return repository.create(party);
}