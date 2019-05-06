var repository = require("../repository/userCredentialsRepository");

exports.login = function login(id) {
  console.info("userCredentialsService: login");
  return repository.findUserCredentials(id);
};
