require("console-info");
require("console-error");
var db = require("../main");
var UserCredentials = require('../domain/userCredentials');
const statusCreatedID = 1;

exports.findUserCredentials = function findUserCredentials(id) {
    console.info("userCredentialsRepository: findUserCredentials");

    return new Promise(function(resolve, reject) {
        console.log("id: " + id);
        var query = "SELECT * FROM USER_CREDENTIALS WHERE id = '" + id + "';";
        db.clientDB.query(query, function(err, result) {
            if (err) {
                console.info("user not exist");
                reject(err);
            } else {
                console.info("user exist");
                data = result.rows;
                resolve(data);
            }
        });
    });
};

exports.create = function create(partyCredentialsRequestDTO) {
    console.info("userCredentialsRepository: create");
    return new Promise(function(resolve, reject) {
        try {
            UserCredentials.create({ user_credentials_id: partyCredentialsRequestDTO.partyID, user_state_id: statusCreatedID, party_id: partyCredentialsRequestDTO.partyID })
                .then(us => resolve(us))
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
};

exports.find = function find(id) {
    console.info("userCredentialsRepository: find :" + id);
    return new Promise(function(resolve, reject) {
        try {
            UserCredentials.findByPk(id)
                .then(us => resolve(us))
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