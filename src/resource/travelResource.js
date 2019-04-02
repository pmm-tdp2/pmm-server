var travel = require('../model/travel'),
    express = require('express'),
    app = express(),
    parser = require("body-parser");

app.use(parser.json());

app.post("/travels", function(req, res) {
    var argmap = new Map();
    argmap.set('json', req.body);
    var geographicCoordenate = new travel.GeographicCoordenate(argmap);
    console.log(geographicCoordenate);
    res.status(200).json(req.body);
})

module.exports = app;