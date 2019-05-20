require("console-info");
require("console-error");
var db = require("../main");
var FileDocuments = require("../domain/fileDocuments");

exports.findAll = function findAll() {
    console.info("fileDocumentsRepository: findAll");
    return new Promise(function(resolve, reject) {
        try {
            FileDocuments.findAll()
                .then(data => resolve(data))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
};

exports.create = function create(fileDocument) {
    console.info("fileDocumentsRepository: create");
    return new Promise(function(resolve, reject) {
        try {
            FileDocuments.create({ name: fileDocument.name })
                .then(us => resolve(us))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
};