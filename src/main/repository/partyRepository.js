require("console-info");
require("console-error");
var Party = require('../domain/party').Party;

exports.create = async function create(party) {
    console.info("PartyRepository: create");
    return await new Promise(function(resolve, reject) {
        try {
            Party.create({ party_id: party.partyID })
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

exports.find = async function find(id) {
    console.info("PartyRepository: find :" + id);
    return await new Promise(function(resolve, reject) {
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

exports.findAll = async function findAll() {
    console.info("PartyRepository: findAll");
    return await new Promise(function(resolve, reject) {
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