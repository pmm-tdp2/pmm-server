require('console-info');
require('console-error');
var UserStatus = require('../model/userStatus').UserStatus;

var express = require("express"),
    app = express(),
    userStatusService = require("../service/userStatusService");

app.get("/userStatus", function(req, res) {
    console.info("userStatusResource :" + req.url);
    try {
        userStatusService.findAll()
            .then(data => res.status(200).send(data))
            .catch(function(err) { res.status(500).send(err) });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/userStatus", function(req, res) {
    console.info("userStatusResource :" + req.url + ". Body : " + JSON.stringify(req.body));
    var us = new UserStatus(req.body);
    try {
        userStatusService.create(us)
            .then(us => res.status(200).send(us))
            .catch(err => res.status(500).send(err));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = app;