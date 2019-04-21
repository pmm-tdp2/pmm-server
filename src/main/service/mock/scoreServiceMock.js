require('console-info');
require('console-error');
var scoreModel = require("../../model/score");
parser = require("body-parser"),

exports.findScoreById = function findScoreById(id) {
    console.info("scoreServiceMock: findScoreById");
    var map = new Map([["travelID", id], ["rol", "USER"], ["points", 5], ["description", "great driver"]]);
    var score = new scoreModel.Score(map);
    return score;
};
exports.saveScore = function saveScore(score) {
    console.info("scoreServiceMock: saveScore");
    return "ok";
}