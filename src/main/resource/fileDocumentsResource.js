require('console-info');
require('console-error');

var express = require("express"),
    app = express(),
    fileDocumentsService = require("../service/fileDocumentsService");

app.post("/fileDocuments", function(req, res) {
    console.info("fileDocumentsResource :" + req.url + ". Body : " + JSON.stringify(req.body));
    try {
        fileDocumentsService.create(req.body)
            .then(us => res.status(200).send(us))
            .catch(err => res.status(500).send(err));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = app;