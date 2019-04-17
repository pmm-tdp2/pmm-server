require('console-info');
require('console-error');
var express = require("express"),
    app = express(),
    scoreModel = require("../model/score"),
    scoreService = require("../service/mock/scoreServiceMock"),
    parser = require("body-parser");

app.get("/score/:id", function(req, res) {
    console.info("ScoreResource :" + req.url+ ". Param : " + req.params.id);
    var score = scoreService.findScoreById(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(score);
});
app.post("/score", function(req, res) {
    console.info("ScoreResource :" + req.url+ ". Body : " + JSON.stringify(req.body));
    var scoreMap = new Map;
    scoreMap.set('json', req.body);
    var score = new scoreModel.Score(scoreMap);
    var message = scoreService.saveScore(score);
    res.status(200).send(message);
})
module.exports = app;