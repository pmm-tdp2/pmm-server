require("console-info");
require("console-error");
var User = require("../domain/user");
var Party = require("../domain/party");

exports.create = function create(user) {
    console.info("UserRepository: create");
    return new Promise(function(resolve, reject) {
        try {
            Party.create({ party_id: user.partyID })
                .then(p => {
                    User.create({ party_id: p.party_id })
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
    console.info("UserRepository: find :" + id);
    return new Promise(function(resolve, reject) {
        try {
            User.findByPk(id)
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
    console.info("UserRepository: findAll");
    return new Promise(function(resolve, reject) {
        try {
            User.findAll()
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