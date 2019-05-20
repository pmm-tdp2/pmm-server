require("console-info");
require("console-error");
var Driver = require("../domain/driver").Driver;
var Party = require("../domain/party").Party;

exports.create = async function create(driver) {
    console.info("DriverRepository: create");
    return await new Promise(function(resolve, reject) {
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

exports.find = async function find(id) {
    console.info("DriverRepository: find :" + id);
    return await new Promise(function(resolve, reject) {
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

exports.findAll = async function findAll() {
    console.info("DriverRepository: findAll");
    return await new Promise(function(resolve, reject) {
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