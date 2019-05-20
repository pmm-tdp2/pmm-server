require("console-info");
require("console-error");
var Party = require('../domain/party');

exports.create = function create(partyCredentialsRequestDTO) {
    console.info("PartyRepository: create");
    return new Promise(function(resolve, reject) {
        try {
            Party.create({ party_id: partyCredentialsRequestDTO.partyID })
                .then(p => resolve(p))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

exports.find = function find(id) {
    console.info("PartyRepository: find :" + id);
    return new Promise(function(resolve, reject) {
        try {
            Party.findByPk(id)
                .then(p => resolve(p))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

exports.findAll = function findAll() {
    console.info("PartyRepository: findAll");
    return new Promise(function(resolve, reject) {
        try {
            Party.findAll()
                .then(p => resolve(p))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};