require("console-info");
require("console-error");
var db = require("../main");
const statusCreatedID = 1;

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

exports.createUserCredentials = async function createUserCredentials(
  userCredentialsRequestDTO,
  partyID
) {
  console.info("userCredentialsRepository: createUserCredentials");
  return new Promise(function(resolve, reject) {
    var query =
      "INSERT INTO USER_CREDENTIALS (ID, NAME, USER_STATUS_ID, PARTY_ID) VALUES ('" +
      userCredentialsRequestDTO.id +
      "','" +
      userCredentialsRequestDTO.firstName +
      "', " +
      statusCreatedID +
      ", " +
      partyID +
      ");";
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
