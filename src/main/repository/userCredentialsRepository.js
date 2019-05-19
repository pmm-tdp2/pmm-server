require("console-info");
require("console-error");
var db = require("../main");
var UserCredentials = require('../domain/userCredentials').UserCredentials;
const statusCreatedID = 1;

exports.findUserCredentials = async function findUserCredentials(id) {
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

exports.create = async function create(userCredentialsRequestDTO) {
    console.info("userCredentialsRepository: create");
    return new Promise(function(resolve, reject) {
        try {
            UserCredentials.create({ user_credentials_id: userCredentialsRequestDTO.id, user_state_id: statusCreatedID })
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

exports.find = async function find(id) {
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