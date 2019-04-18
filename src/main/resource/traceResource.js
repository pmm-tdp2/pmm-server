require('console-info');
require('console-error');
var express = require("express"),
    app = express(),
    traceModel = require("../model/trace"),
    traceService = require("../service/mock/traceServiceMock");

app.post("/trace", function(req, res) {
    console.info("traceResource :" + req.url+ ". Body : " + JSON.stringify(req.body));
    var trace = new traceModel.Trace(req.body);
    var message = traceService.saveTrace(trace)
    res.status(200).send(message);
})
module.exports = app;