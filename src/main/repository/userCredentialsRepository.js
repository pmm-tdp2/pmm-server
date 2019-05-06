require("console-info");
require("console-error");
var db = require("../main");

exports.findUserCredentials = async function findUserCredentials(id) {
  console.info("userCredentialsRepository: findUserCredentials");
  return new Promise(function(resolve, reject) {
    var query = "SELECT * FROM USER_CREDENTIALS WHERE id = '" + id + "';";
    db.clientDB.query(query, function(err, result) {
      if (err) {
        reject(err);
      } else {
        data = result.rows;
        resolve(data);
      }
    });
  });
};
