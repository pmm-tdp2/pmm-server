require("console-info");
require("console-error");
var repository = require("../repository/fileDocumentsRepository");

exports.findAll = function findAll() {
    console.info("fileDocumentsService : findAll");
    return repository.findAll();
}

exports.create = function create(fileDocument) {
    console.info("fileDocumentsService : create");
    return repository.create(fileDocument);
}