require('console-info');
require('console-error');

var express = require("express"),
    app = express(),
    UserDTO = require("../model/dto/partyDTO").UserDTO,
    userService = require("../service/userService");


/*
 * user endopints
 */
app.get("/users", function(req, res) {
    console.info("userStatusResource :" + req.url);
    try {
        userService.findAll()
            .then(data => res.status(200).send(data))
            .catch(function(err) { res.status(500).send(err) });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/user", function(req, res) {
    console.info("userStatusResource :" + req.url + ". Body : " + JSON.stringify(req.body));
    var user = new UserDTO();
    user.partyID = req.body.partyID;
    try {
        userService.create(user)
            .then(us => res.status(200).send(us))
            .catch(err => res.status(500).send(err));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


module.exports = app;