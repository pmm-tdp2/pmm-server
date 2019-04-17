require('console-info');
require('console-error');
var scoreModel = require("../../model/score");
parser = require("body-parser"),

exports.findScoreById = function findScoreById(id) {
    console.info("scoreServiceMock: findScoreById");
    var json = {"points" : 5, "description": "great driver"};
    var score = new scoreModel.Score(JSON.stringify(json));
    return score;
};
exports.saveScore = function saveScore(score) {
    console.info("scoreServiceMock: saveScore");
    return "ok";
}