const express = require("express");
const PORT = 3000;
require ('custom-env').env('pmm');
var partyResource = require("./resource/partyResource"),
    travelResource = require("./resource/travelResource"),
    scoreResource = require("./resource/scoreResource"),
    traceResource = require("./resource/traceResource"),
    connectionModel = require("./model/connection"),
    bodyParser = require("body-parser");
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/home", (req,res) => {
    console.log("response " + req.url);
    res.send("hello !!!");
});
// parse application/json
app.use(bodyParser.json())
// Routing to other responsable to handle request
app.use("/pmm", partyResource);
app.use("/pmm", travelResource);
app.use("/pmm", scoreResource);
app.use("/pmm", traceResource);
app.use(express.static("public"));

var server = app.listen(process.env.PORT || PORT, ()=> {
    console.log("Listen at port : " + process.env.PORT);
})

io = require('socket.io').listen(server);

var connectionsUsers = new Map();
var connectionsDrivers = new Map();
var connectionDelete = new Map();

var socketDriver;

exports.users = connectionsUsers;
exports.drivers = connectionsDrivers;

io.on('connection', (socket) => {
    console.log("one  connected :" + socket.id);
    socket.on('ROL', function(rol) {
        var connection = new connectionModel.ConnectionInfo(socket.id, rol, socket);
        if (rol == "USER") {
            console.log("Se conecto un Usuario");
            connectionsUsers.set(socket.id,connection);
        } else {
            console.log("Se conecto un Chofer");
            connectionsDrivers.set(socket.id,connection);
            socketDriver = socket;
            exports.socketDriver = socketDriver;
        }
    });

    socket.on('disconnect', () => {
        console.log( 'user has left : ' + socket.id);
            connectionsUsers.delete(socket.id);
            connectionsDrivers.delete(socket.id);
    });
    socket.emit("message", {
        id:1,
        text: "i'm a message",
        author: "app-server"
    });

});


process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;