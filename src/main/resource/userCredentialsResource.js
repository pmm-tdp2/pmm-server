require("console-info");
require("console-error");
var express = require("express"),
  app = express(),
  userCredentialsService = require("../service/userCredentialsService"),
  parser = require("body-parser");

app.post("/userCredentials/login", function(req, res) {
  console.info("userCredentialsResource :" + req.url);
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

module.exports = app;
