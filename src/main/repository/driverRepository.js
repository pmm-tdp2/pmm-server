require("console-info");
require("console-error");
var Driver = require("../domain/driver");
var Party = require("../domain/party");

exports.create = function create(driver) {
    console.info("DriverRepository: create");
    return new Promise(function(resolve, reject) {
        try {
            Party.create({ party_id: driver.partyID })
                .then(p => {
                    Driver.create({ party_id: p.party_id })
                        .then(u => resolve(u))
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        });
                })
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
    console.info("DriverRepository: find :" + id);
    return new Promise(function(resolve, reject) {
        try {
            Driver.findByPk(id)
                .then(u => resolve(u))
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
    console.info("DriverRepository: findAll");
    return new Promise(function(resolve, reject) {
        try {
            Driver.findAll()
                .then(u => resolve(u))
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