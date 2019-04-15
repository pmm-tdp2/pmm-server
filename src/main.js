require('console-info');
require('console-error');
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
    console.info("response " + req.url);
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
    console.info("Listen at port : " + process.env.PORT);
})

io = require('socket.io').listen(server);
io.set('transports', ['websocket']);

var connectionsUsers = new Map();
var connectionsDrivers = new Map();
var connectionDelete = new Map();

var socketDriver;

exports.users = connectionsUsers;
exports.drivers = connectionsDrivers;

io.on('connection', (socket) => {
    socket.on('ROL', function(rol) {
        var connection = new connectionModel.ConnectionInfo(socket.id, rol, socket);
        if (rol == "USER") {
            console.info("User is connected " + socket.id);
            connectionsUsers.set(socket.id,connection);
        } else {
            console.info("Driver is connected  " + socket.id);
            connectionsDrivers.set(socket.id,connection);
            socketDriver = socket;
            exports.socketDriver = socketDriver;
        }
    });

    socket.on('disconnect', () => {
        if (connectionsUsers.has(socket.id)) {
            console.info( 'user has left : ' + socket.id);
            connectionsUsers.delete(socket.id);
        }
        if (connectionsDrivers.has(socket.id)) {
            console.info( 'driver has left : ' + socket.id);
            connectionsDrivers.delete(socket.id);
        }
        socket.disconnect(true);
    });
    socket.emit("message", {
        id:1,
        text: "i'm a message",
        author: "app-server"
    });

});


process.on('uncaughtException', (err) => {
    console.error("========Uncaught exception========");
    console.error(err);
});

module.exports = app;