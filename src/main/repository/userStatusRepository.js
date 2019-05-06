require('console-info');
require('console-error');
var db = require('../main')

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



