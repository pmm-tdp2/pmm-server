require('console-info');
require('console-error');
var express = require("express"),
    app = express(),
    scoreModel = require("../model/score"),
    scoreService = require("../service/mock/scoreServiceMock"),
    parser = require("body-parser");

app.get("/score/:id", function(req, res) {
    console.info("ScoreResource :" + req.url+ ". Param : " + req.params.id);
    try {
        var score = scoreService.findScoreById(req.params.id);
        if (score == null) {
            res.status(204).send(score);
        } else {
            res.status(200).send(score);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/score", function(req, res) {
    console.info("ScoreResource :" + req.url+ ". Body : " + JSON.stringify(req.body));
    try {
        var score = new scoreModel.Score(req.body);
        var message = scoreService.saveScore(score);
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
    
})
module.exports = app;