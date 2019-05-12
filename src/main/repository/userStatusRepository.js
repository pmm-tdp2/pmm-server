require("console-info");
require("console-error");
var db = require("../main"),
  UserStatus = require("../model/userStatus");

exports.searchAllUserStatus = async function searchAllUserStatus() {
    console.info('userStatusRepository: searchAllUserStatus');
    console.log('WTF');
    return new Promise(function (resolve, reject) {
        db.clientDB.query('SELECT * FROM USER_STATUS', function (err, result) {
            if (err) {
                console.log("ERROR");
                reject(err);
            }
            else {
                console.log("Response");
                console.info(result.rows);
                data = result.rows;
                resolve(data);
            }
        });
    });
};

exports.findAll = async function findAll() {
  console.info("userStatusRepository: findAll");
  UserStatus.findAll()
    .then(function(userStatus) {
      console.log(userStatus);
      res.setHeader("Content-Type", "application/json");
      return categories;
    })
    .catch(function(err) {
      console.error(err);
      return null;
    });
};
