require("console-info");
require("console-error");
var db = require("../main");

exports.findUserCredentials = async function findUserCredentials(id) {
  console.info("userCredentialsRepository: findUserCredentials");

  return new Promise(function(resolve, reject) {
    console.log("id: "+id);
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
