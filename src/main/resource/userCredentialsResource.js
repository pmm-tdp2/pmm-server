require("console-info");
require("console-error");
var express = require("express"),
    app = express(),
    userCredentialsService = require("../service/userCredentialsService"),
    userService = require("../service/userService"),
    driverService = require("../service/driverService"),
    partyDTOModel = require("../model/dto/partyDTO");

app.get("/userCredentials/:id", function(req, res) {
    console.info(
        "userCredentialsResource :" + req.url + ". Param : " + req.params.id
    );
    try {
        console.info(req.body);
        var promise = userCredentialsService.findByPK(req.params.id);
        promise
            .then(uc => {
                if (uc != null) {
                    res.status(200).send(uc);
                } else {
                    res.status(203).send({ status: 203, message: "user not exists" });
                }
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/userCredentials/login", function(req, res) {
    console.info(
        "userCredentialsResource :" +
        "Verb : " +
        req.url +
        ". Body : " +
        JSON.stringify(req.body)
    );
    try {
        userCredentialsService
            .login(req.body.id)
            .then(uc => {
                if (uc != null) {
                    console.info("login successfuly");
                    res.status(200)
                        .send(
                            JSON.stringify({ status: 200, message: "login successfuly" })
                        );
                } else {
                    console.info("login error");
                    res
                        .status(203)
                        .send(JSON.stringify({ status: 203, message: "user not exists" }));
                }
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/userCredentials/register", function(req, res) {
    console.info("userCredentialsResource :" + "Verb : " + req.url + ". Body : " + JSON.stringify(req.body));
    try {
        var partyCredentialsRequestDTO = new partyDTOModel.PartyCredentialsRequestDTO(req.body);
        userCredentialsService
            .findByPK(partyCredentialsRequestDTO.partyID)
            .then(uc => {
                if (uc != null) {
                    res.status(203).send({ status: 203, message: "User already exists" });
                } else {
                    if (partyCredentialsRequestDTO.rol == "USER") {
                        console.info("Registring a user");
                        userService.create(partyCredentialsRequestDTO)
                            .then(u => {
                                userCredentialsService
                                    .register(partyCredentialsRequestDTO)
                                    .then(function(result) {
                                        if (result != null) {
                                            res.status(200).send(JSON.stringify({ status: 200, message: "User register successfuly" }));
                                        }
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        res.status(500).send(JSON.stringify({ status: 500, message: "unexpected error" }));
                                    });
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).send(JSON.stringify({ status: 500, message: "unexpected error" }));
                            });
                    } else if (partyCredentialsRequestDTO.rol == "DRIVER") {
                        console.info("Registring a driver");
                        driverService.create(partyCredentialsRequestDTO)
                            .then(d => {
                                userCredentialsService
                                    .register(partyCredentialsRequestDTO)
                                    .then(function(result) {
                                        if (result != null) {
                                            res.status(200).send(JSON.stringify({ status: 200, message: "Driver register successfuly" }));
                                        }
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        res.status(500).send(JSON.stringify({ status: 500, message: "unexpected error" }));
                                    });
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).send(JSON.stringify({ status: 500, message: "unexpected error" }));
                            });
                    } else {
                        res.status(500).send(JSON.stringify({ status: 500, message: "rol incorrect" }));
                    }
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(JSON.stringify({ status: 500, message: "unexpected error" }));
            });
    } catch (err) {
        console.error(err);
        res.status(500).send(JSON.stringify({ status: 500, message: "unexpected error" }));
    }
});

module.exports = app;