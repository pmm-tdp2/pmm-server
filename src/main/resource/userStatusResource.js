require('console-info');
require('console-error');
var userStatusModel = require('../model/userStatus')

var express = require("express"),
    app = express(),
    userStatusService = require("../service/userStatusService"),
    parser = require("body-parser");

app.get("/userStatus", function(req, res) {
    console.info("userStatusResource :" + req.url);
    try {
        userStatusService.findAll()
            .then(function(result) { res.status(200).send(result) })
            .catch(function(err) { res.status(500).send(err) });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/userStatus", function(req, res) {
    console.info("userStatusResource :" + req.url + ". Body : " + JSON.stringify(req.body));
    var us = new userStatusModel.UserStatus(req.body);
    try {
        userStatusService.create(us)
            .then(function(result) { res.status(200).send(result) })
            .catch(function(err) { res.status(500).send(err) });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = app;