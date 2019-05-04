require('console-info');
require('console-error');
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL_LOCAL,
    ssl: true,
});

client.connect( () => console.info('userStatusRepository: Connected successfuly'));

exports.searchAllUserStatus = function searchAllUserStatus() {
    console.info('userStatusRepository: searchAllUserStatus');
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM USER_STATUS;', function (err, result) {
            if (err) {
                return resolve(err);
            }
            else {
                console.info(result.rows);
                data = result.rows;
                return resolve(data);
            }
        });
    });
};



