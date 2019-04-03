var express = require("express"),
    app = express(),
    score = require("../model/score"),
    scoreService = require("../service/scoreServiceMock");

app.get("/scores/:id", function(req, res) {
    var score = scoreService.findScoreById(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(score);
})

module.exports = app;