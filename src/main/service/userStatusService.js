var repository = require("../repository/userStatusRepository");

exports.findAllUserStatus = function findAllUserStatus() {
    return repository.searchAllUserStatus();
}