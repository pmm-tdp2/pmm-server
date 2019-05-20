require("console-info");
require("console-error");
var db = require("../main");
var UserState = require("../domain/userState");

exports.searchAllUserStatus = function searchAllUserStatus() {
    console.info('userStatusRepository: searchAllUserStatus');
    console.log('WTF');
    return new Promise(function(resolve, reject) {
        db.clientDB.query('SELECT * FROM USER_STATUS', function(err, result) {
            if (err) {
                console.log("ERROR");
                reject(err);
            } else {
                console.log("Response");
                console.info(result.rows);
                data = result.rows;
                resolve(data);
            }
        });
    });
};

exports.findAll = function findAll() {
    console.info("userStatusRepository: findAll");
    return new Promise(function(resolve, reject) {
        try {
            UserState.findAll()
                .then(data => resolve(data))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
};

exports.create = function create(userStatus) {
    console.info("userStatusRepository: create");
    return new Promise(function(resolve, reject) {
        try {
            UserState.create({ description: userStatus.description })
                .then(us => resolve(us))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
};