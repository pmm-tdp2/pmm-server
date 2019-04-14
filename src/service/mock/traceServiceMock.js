var scoreModel = require("../../model/trace");
parser = require("body-parser"),

exports.saveTrace = function saveTrace(trace) {
    console.log("traceServiceMock: saveTrace");
    return "{\"message\" : \"ok\"}";
}