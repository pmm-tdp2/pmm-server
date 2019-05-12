require("console-info");
require("console-error");
var express = require("express"),
  app = express(),
  userCredentialsService = require("../service/userCredentialsService"),
  partyDTOModel = require("../model/dto/partyDTO"),
  parser = require("body-parser");

app.post("/userCredentials/login", function(req, res) {
  console.info("userCredentialsResource :" + "Verb : " + req.url+ ". Body : " + JSON.stringify(req.body));
  try {

    console.info(req.body);
    userCredentialsService
      .login(req.body.id)
      .then(function(result) {
        if (result != null && result.length == 1) {
          console.info("login successfuly");
          res
            .status(200)
            .send(JSON.stringify({ status: 200, message: "login successfuly" }));
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
  console.info("userCredentialsResource :" + req.url);
  try {
    var userCredentialsRequestDTO = new partyDTOModel.UserCredentialsRequestDTO(
      req.body
    );
    userCredentialsService
      .register(userCredentialsRequestDTO)
      .then(function(result) {
        if (result != null && result.length == 1) {
          res
            .status(200)
            .send(
              JSON.stringify({ status: 200, message: "register successfuly" })
            );
        } else {
          res
            .status(203)
            .send(
              JSON.stringify({ status: 203, message: "preconditions error" })
            );
        }
      })
      .catch(function(err) {
        res
          .status(500)
          .send(JSON.stringify({ status: 500, message: "unexpected error" }));
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(JSON.stringify({ status: 500, message: "unexpected error" }));
  }
});

module.exports = app;
