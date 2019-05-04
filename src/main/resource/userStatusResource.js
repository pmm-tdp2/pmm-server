require('console-info');
require('console-error');
var express = require("express"),
    app = express(),
    userStatusService = require("../service/userStatusService"),
    parser = require("body-parser");

app.get("/userStatus", function(req, res) {
    console.info("userStatusResource :" + req.url);
    try {
        userStatusService.findAllUserStatus()
        .then(function(result) {res.status(204).send(result)})
        .catch(function(err) {res.status(500).send(err)});
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = app;