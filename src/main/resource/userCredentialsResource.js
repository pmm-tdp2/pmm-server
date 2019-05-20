require("console-info");
require("console-error");
var express = require("express"),
    app = express(),
    userCredentialsService = require("../service/userCredentialsService"),
    partyDTOModel = require("../model/dto/partyDTO"),
    parser = require("body-parser");

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
    console.info(
        "userCredentialsResource :" +
        "Verb : " +
        req.url +
        ". Body : " +
        JSON.stringify(req.body)
    );
    try {
        var userCredentialsRequestDTO = new partyDTOModel.UserCredentialsRequestDTO(
            req.body
        );
        userCredentialsService
            .findByPK(userCredentialsRequestDTO.id)
            .then(uc => {
                if (uc != null) {
                    res.status(203).send({ status: 203, message: "User already exists" });
                } else {
                    userCredentialsService
                        .register(userCredentialsRequestDTO)
                        .then(function(result) {
                            if (result != null) {
                                res
                                    .status(200)
                                    .send(
                                        JSON.stringify({
                                            status: 200,
                                            message: "register successfuly"
                                        })
                                    );
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            res
                                .status(500)
                                .send(
                                    JSON.stringify({ status: 500, message: "unexpected error" })
                                );
                        });
                }
            })
            .catch(err => {
                console.error(err);
                res
                    .status(500)
                    .send(JSON.stringify({ status: 500, message: "unexpected error" }));
            });
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .send(JSON.stringify({ status: 500, message: "unexpected error" }));
    }
});

module.exports = app;