require('console-info');
require('console-error');
var db = require('../main')

exports.searchAllUserStatus = async function searchAllUserStatus() {
    console.info('userStatusRepository: searchAllUserStatus');
    return new Promise(function (resolve, reject) {
        db.clientDB.query('SELECT * FROM USER_STATUS;', function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                console.info(result.rows);
                data = result.rows;
                resolve(data);
            }
        });
    });
};



