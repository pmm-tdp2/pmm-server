var scoreModel = require("../model/score");
parser = require("body-parser"),

exports.findScoreById = function findScoreById(id) {
    console.log("scoreServiceMock: findScoreById");
    var json = {"point" : 5, "description": "great driver"};
    var argmap = new Map();
    argmap.set('json', json);
    var score = new scoreModel.Score(argmap);
    return score;
}