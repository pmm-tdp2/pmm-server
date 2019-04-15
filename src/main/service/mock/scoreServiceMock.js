var scoreModel = require("../../model/score");
parser = require("body-parser"),

exports.findScoreById = function findScoreById(id) {
    console.log("scoreServiceMock: findScoreById");
    var json = {"points" : 5, "description": "great driver"};
    var score = new scoreModel.Score(JSON.stringify(json));
    return score;
};
exports.saveScore = function saveScore(score) {
    console.log("scoreServiceMock: saveScore");
    return "ok";
}